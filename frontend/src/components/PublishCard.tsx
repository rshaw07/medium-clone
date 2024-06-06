import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserAvatar } from "./UserAvatar"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { allBlogAtom, userAtom } from "@/atoms"
import { TagsInput } from "./TagsInput"
import { useState } from "react"
import { ImageInput } from "./ImageInput"
import moment from "moment"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "@/firebase"
import axios from "axios"
import { BACKEND_URL } from "@/config"
import { useNavigate } from "react-router-dom"
import { Spinner } from "@/icons/Spinner"


export function PublishCard({content, tagsInput, prevId, imageUrl, title}: {content: string, tagsInput: string[], prevId: string, imageUrl: string, title: string}) {

  const [tags, setTags] = useState(tagsInput);
  const today = moment(new Date().toISOString()).format("MMMM DD, YYYY");
  const author = useRecoilValue(userAtom);
  const [img,setImg] = useState(null);
  const setBlogs = useSetRecoilState(allBlogAtom);
  const navigate = useNavigate();
  const[loading, setLoading] = useState("");

  async function onClickHandle({draft}:{draft: boolean}) {
    if(draft){
      setLoading("draft");
    }
    else{
      setLoading("publish");
    }
    if(prevId!==""){
      await axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${prevId}`, {
        headers: {
          "Authorization" : localStorage.getItem("token")
        }
      })
    }
    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
      title: title,
      content: content,
      tags: tags,
      draft: draft
    }, {
      headers: {
        "Authorization" : localStorage.getItem("token")
      }
    })
    const id = response.data.id;
    if(img!=null){
      const imageRef = ref(storage, `images/${id}`);
      uploadBytes(imageRef, img).then((response) => {
        getDownloadURL(response.ref).then(async(url) => {
           const res =  await axios.put(`${BACKEND_URL}/api/v1/blog`, {
              id: id,
              image: url
            },{
              headers: {
                "Authorization" : localStorage.getItem("token")
              }
            })
            axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
              headers: {
                    "Authorization" : localStorage.getItem("token")
              },
            }).then(async(response2) => {
              setBlogs(response2.data.blogs.map((blog:any) => {
                const x = moment(blog.published).format("MMMM DD, YYYY");
                return {...blog, published: x}
              }))
              
      if(draft){
        navigate(`/profile`);
      }
      else{
        navigate(`/blog/${res.data.id}`);
      }

            })
        })
    });
    }
    else if(imageUrl!=""){
      const res = await axios.put(`${BACKEND_URL}/api/v1/blog`, {
        id: id,
        image: imageUrl
      },{
        headers: {
          "Authorization" : localStorage.getItem("token")
        }
      })
      axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
              "Authorization" : localStorage.getItem("token")
        },
      }).then(async(response2) => {
        setBlogs(response2.data.blogs.map((blog:any) => {
          const x = moment(blog.published).format("MMMM DD, YYYY");
          return {...blog, published: x}
        }))
        
      if(draft){
        navigate(`/profile`);
      }
      else{
        navigate(`/blog/${res.data.id}`);
      }
      })
    }
    else{
      axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
                "Authorization" : localStorage.getItem("token")
          },
        }).then(async(response2) => {
          setBlogs(response2.data.blogs.map((blog:any) => {
            const x = moment(blog.published).format("MMMM DD, YYYY");
            return {...blog, published: x}
          }))
          
      if(draft){
        navigate(`/profile`);
      }
      else{
        navigate(`/blog/${id}`);
      }
        })
      }
      
    }

  return (
    <Dialog>
      <DialogTrigger asChild className="border-none rounded-full px-4 ">
        <button className="p-0.5">Publish</button>
      </DialogTrigger>
      <DialogContent className=" bg-white min-w-[100vw]">
        <div className="grid grid-cols-5 px-48 overflow-x-hidden">
          <div className="overflow-y-auto col-span-3 max-h-[92dvh] pr-12">
          <div className="text-slate-400 mt-10">
            Story Preview
          </div>
            <div className="flex justify-center bg-slate-200 p-5 rounded-xl">
              <div className=" max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
                <div className=" mt-4 font-bold text-3xl">{title}</div>
                <div className="flex mt-8">
                  <UserAvatar avatar={author.avatar} />
                  <div className=" ml-6 font-extralight">
                    <div className=" text-2xl">{author.name}</div>
                    <div className="grid grid-cols-2">
                      <div>
                        {Math.ceil(content.length / 1250)} min(s) read
                      </div>
                      <div>Posted on {today}</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-centre flex-col">
                  <ImageInput imageUrl={imageUrl} setImg={setImg}/>
                </div>
                <div className="my-6 leading-loose text-xl text-gray-700">
                  {content}
                </div>
                <div className="flex my-6">
                  {tags.map((tag: string) => (
                    <div className="bg-gray-200 mr-3 rounded-full py-1 px-4 text-black">
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="bg-slate-100 p-4 rounded-xl">
                  <UserAvatar avatar={author.avatar} />
                  <div className=" mt-2 text-2xl font-semibold">
                    Written by: {author.name}
                  </div>
                  <div className="mt-2">{author.bio}</div>
                </div>
              </div>
            </div>
          </div>
          <div className=" p-10 col-span-2 ">
            <div className=" flex text-lg">
              <div className=" text-gray-600">
                Publishing to: 
              </div>
              <div className=" ml-1 font-medium">
                {author.name}
              </div>
            </div>
            <div className=" mt-4">
              Add or change topics (up to 5) so readers know what your story is about
            </div>
            <TagsInput tags={tags} setTags={setTags}/>
              <div className="flex">
                <button type="submit" onClick={() => onClickHandle({draft: false})} className="bg-green-700 flex rounded-full text-sm text-white p-2 px-4">{loading=="publish"? <Spinner/>:null }Publish Now</button>
                <button type="submit" className="bg-red-500 rounded-full flex text-sm text-white p-2 px-4 ml-4"
                onClick={() => onClickHandle({draft: true})}>{loading=="draft"? <Spinner/>:null }Save as Draft</button>
              </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}