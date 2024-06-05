import { allBlogAtom, deleteBlogAtom } from "@/atoms";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { Trash2 } from "lucide-react";
import moment from "moment";
import { useRecoilState, useSetRecoilState } from "recoil";

export function AlertCard() {
  const [blog,setBlog] = useRecoilState(deleteBlogAtom);
  // @ts-ignore
  const setAllBLogs = useSetRecoilState(allBlogAtom);
  async function onClickHandle(){
    const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${blog}`, {
      headers: {
        "Authorization" : localStorage.getItem("token")
      }
    })
    if(response.status === 200){
      setBlog("")
      setAllBLogs(response.data.blogs.map((blog:any) => {
        const x = moment(blog.published).format("MMMM DD, YYYY");
        return {...blog, published: x}
      }));
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="flex min-w-52 py-1.5">
          <Trash2 className="mr-2 mt-0.5 ml-2 h-4 w-4" />
          <div className="text-sm">Delete</div>
        </AlertDialogTrigger>
        <AlertDialogContent className=" bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your blog.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="text-white px-6 bg-black hover:bg-black" onClick={onClickHandle}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
