import { allBlogAtom, userAtom } from "@/atoms"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BACKEND_URL } from "@/config"
import { storage } from "@/firebase"
import { DialogClose } from "@radix-ui/react-dialog"
import axios from "axios"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import moment from "moment"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState, useSetRecoilState } from "recoil"

export function EditProfile({user, setUser}: {user: any, setUser: any}) {
  const [data, setData] = useState(user);
  const [img,setImg] = useState(null);
  const setBlogs = useSetRecoilState(allBlogAtom);
  const navigate = useNavigate();

  useEffect(() => {
    
  },[])
  function uploadImg() {
    if(img==null){
        handleSubmit(data.url);
        return;
    }
    const imageRef = ref(storage, `images/${data.id}`);
    uploadBytes(imageRef, img).then((response) => {
        getDownloadURL(response.ref).then((url) => {
          handleSubmit(url);
        })
      });
    }
  async function handleSubmit(url: string) {
    if(data===user) return;
    const response = await axios.put(`${BACKEND_URL}/api/v1/user`, {
      id: data.id,
      name: data.name,
      bio: data.bio,
      avatar: url
    }, {
      headers: {
        "Authorization" : localStorage.getItem("token")
      }
    })
    setUser(response.data.user);

    const response2 = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
              "Authorization" : localStorage.getItem("token")
        },
      })
      setBlogs(response2.data.blogs.map((blog:any) => {
        const x = moment(blog.published).format("MMMM DD, YYYY");
        return {...blog, published: x}
    }));
    
    // navigate(`/blogs`);
    // window.location.reload();
    
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
      <span className="cursor-pointer">
            Edit Profile
        </span>
      </DialogTrigger>
      <DialogContent className=" bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={user.name}
              className="col-span-3"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Bio
            </Label>
            <Input
              id="username"
              defaultValue={user.bio}
              placeholder="Your bio"
              className="col-span-3"
              onChange={(e) => setData({ ...data, bio: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Avatar
            </Label>
            <input type="file" onChange={(e) => setImg(e.target.files[0])} className="col-span-3 border p-2 border-black" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit"className="text-white bg-black hover:bg-black-700 rounded-full" onClick={uploadImg}>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
