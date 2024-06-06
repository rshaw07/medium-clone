import { urlAtom } from "@/atoms";
import { AppBar2 } from "@/components/AppBar2"
import { Skeleton } from "@/components/ui/skeleton";
import { BACKEND_URL } from "@/config";
import autosize from "autosize";
import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { useRecoilState } from "recoil";

interface Props {
    id: string
    image: string
    content: string
    tags: string[]
    title: string
}

export const Edit = () => {
    const [url, setUrl] = useRecoilState(urlAtom);
    const [blog, setBlog] = useState<Props|null>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const textTitleRef = useRef(null);
    const textContentRef = useRef(null);
    useEffect(() => {
        if (textTitleRef.current) {
          autosize(textTitleRef.current);
        }
        if (textContentRef.current) {
          autosize(textContentRef.current);
        }
      }, []);
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
                <AppBar2 tagsInput={[]} prevId={""} imageUrl={""} content={content} title={title}/>
                <div className=" ml-64 mt-10">
                    <Skeleton className="bg-gray-200 h-12 mb-4 w-full rounded-lg" />
                    <Skeleton className="bg-gray-200 h-48 w-full rounded-lg" />
                </div>
            </div>
        )
    }
    // console.log(blog.tags);
    return (
        <div>
            <div>
                <AppBar2 content={content} prevId={blog.id} imageUrl={blog.image} tagsInput={blog.tags} title={title}/>
                <div className="">
                    <div className="ml-64 mt-8 font-serif">
                        <textarea ref={textTitleRef} defaultValue={title} placeholder="Title" className="resize-none w-full p-4 text-gray-900 text-5xl font-thin rounded-lg focus:outline-none" onChange={(e) => setTitle(e.target.value)}/>
                        <textarea ref={textContentRef} defaultValue={content} placeholder="Tell your story..." className="w-full  resize-none  focus:outline-none text-xl" onChange={(e) => setContent(e.target.value)}/>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}