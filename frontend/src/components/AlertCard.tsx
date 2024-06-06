import { allBlogAtom, deleteBlogAtom } from "@/atoms";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BACKEND_URL } from "@/config";
import { Spinner } from "@/icons/Spinner";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import axios from "axios";
import { Trash2 } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

export function AlertCard() {
  const [blog,setBlog] = useRecoilState(deleteBlogAtom);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  // @ts-ignore
  const setAllBLogs = useSetRecoilState(allBlogAtom);
  async function onClickHandle(){
    setFlag(true);
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
    navigate("/profile");

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
            <AlertDialogCancel className="hover:bg-slate-200 py-2 px-4 rounded">Cancel</AlertDialogCancel>
            <button className="text-white py-2 px-4 rounded bg-black" onClick={onClickHandle}>
              <div className="flex">
                {flag && <Spinner/>}Delete
              </div>
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
