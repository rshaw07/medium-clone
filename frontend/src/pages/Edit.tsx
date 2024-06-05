import { urlAtom } from "@/atoms";
import { AppBar2 } from "@/components/AppBar2"
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil";

export const Edit = () => {
    const [url, setUrl] = useRecoilState(urlAtom);
    const [blog, setBlog] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    useEffect(() => {
        const p = window.location.href.split("/")[4];
        setUrl(p);
        if(url!=""){
            
            axios.get(`${BACKEND_URL}/api/v1/blog/`+url, {
                headers: {
                    "Authorization" : localStorage.getItem("token")
                }
            }).then(response => {
                setBlog(response.data.blog);
            })
        }

        return () => {
            setUrl("")
        }
    },[url])

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setContent(blog.content);
        }
    }, [blog]);

    if(blog==null){
        return (
            <div>
                loading...
            </div>
        )
    }
    return (
        <div>
            <div>
                <AppBar2 content={content} prevId={blog.id} imageUrl={blog.image} tagsInput={blog.tags} title={title}/>
                <div className="">
                    <div className="ml-64 mt-8 font-serif">
                        <input type="text" defaultValue={title} placeholder="Title" id="large-input" className="block w-full p-4 text-gray-900 text-5xl font-thin rounded-lg focus:outline-none" onChange={(e) => setTitle(e.target.value)}/>
                        <input type="text" defaultValue={content} placeholder="Tell your story..." className="w-full p-4 focus:outline-none text-xl" onChange={(e) => setContent(e.target.value)}/>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}