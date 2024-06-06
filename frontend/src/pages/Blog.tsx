import { useEffect, useState } from "react"
import { AppBar } from "../components/AppBar"
import { UserAvatar } from "../components/UserAvatar"
import { Bookmark } from "../icons/BookmarkIcon"
import { LikeIcon } from "@/icons/LikeIcon"
import axios from "axios"
import { useRecoilState, useRecoilValue} from "recoil"
import { bookmarkAtom, likeAtom, urlAtom } from "@/atoms"
import { BACKEND_URL } from "@/config"
import moment from "moment"
import { SingleBlogSkeleton } from "@/components/SingleBlogSkeleton"
import { ClipboardPopover } from "@/components/ClipboardPopover"

interface blogType {
    draft: boolean,
    title: string,
    content: string,
    id: string,
    likes: number,
    published: string,
    image: string,
    tags: string[],
    author: {name: string, avatar: string, bio: string}
}

export const Blog = () => {
    const[mark, setMark] = useState(false);
    const[blog,setBlog] = useState<blogType|null>(null);
    const[url, setUrl] = useRecoilState(urlAtom);
    const bookmarkedBlogs = useRecoilValue(bookmarkAtom);
    const [likeValue, setLikeValue] = useRecoilState(likeAtom);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const p = window.location.href.split("/")[4];
        setUrl(p);
    },[])
    
    useEffect(() => {
        async function get(){
            if(url!=""){
                axios.get(`${BACKEND_URL}/api/v1/blog/`+url, {
                headers: {
                    "Authorization" : localStorage.getItem("token")
                }
                }).then(async(response) => {
                    const x = moment(response.data.blog.published).format("MMMM DD, YYYY");
                    response.data.blog.published = x
                    setBlog(response.data.blog);
                    setLikeValue(response.data.blog.likes);
                    await new Promise<void>((resolve) => {
                        setTimeout(() => {
                            resolve();
                        }, 7000);
                    })
                    setLoading(false);
                })
                mark;
            }
        }
        get();
    }, [url])
    
    if(loading || !blog){
        return (
            <div>
                <AppBar/>
                <SingleBlogSkeleton/>
            </div>
        )
    }
    if(blog.draft){
        return(
            <div></div>
        )
    }

    return (
        <div>
            <AppBar/>
            <div className="flex justify-center" >
                <div className=" w-[55dvw]">
                    <div className=" mt-16 font-bold text-3xl">{blog.title}</div>
                    <div className="flex mt-8">
                        <UserAvatar avatar={blog.author.avatar}/>
                        <div className=" ml-6 font-extralight">
                            <div className=" text-2xl">{blog.author.name}</div>
                            <div className="grid grid-cols-2">
                                <div>
                                    {Math.ceil(blog.content.length/1250)} min(s) read
                                </div>
                                <div>
                                    Posted on {blog.published}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Bar blogId={blog.id} likeValue={likeValue} setLikeValue={setLikeValue}  mark={bookmarkedBlogs.includes(blog.id)} setMark={setMark}/>
                    <div className="flex justify-centre flex-col">
                        <img src={blog.image} alt="" />
                    </div>
                    <div className="my-6 leading-loose text-xl text-gray-700">{blog.content}</div>  
                    <div className="flex my-6">
                        {blog.tags.map((tag) => (
                            <div className="bg-gray-200 mr-3 rounded-full py-1 px-4 text-black">{tag}</div>
                        ))}
                    </div>
                    <Bar blogId={blog.id} likeValue={likeValue}  setLikeValue={setLikeValue} mark={bookmarkedBlogs.includes(blog.id)} setMark={setMark}/>
                    <div className="bg-slate-100 p-4 mb-4 rounded-xl">
                        <UserAvatar avatar={blog.author.avatar}/>
                        <div className=" mt-2 text-2xl font-semibold">
                            Written by: {blog.author.name}
                        </div>
                        <div className="mt-2">
                            {blog.author.bio}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface props{
    mark: boolean,
    setMark: any,
    blogId: string,
    likeValue: number,
    setLikeValue: (value: number) => void
}

function Bar({ blogId,likeValue, setLikeValue, mark, setMark}: props) {
    async function onClickHandle(){
        setLikeValue(likeValue+1);
        await axios.put(`${BACKEND_URL}/api/v1/blog/like`,{
            id: blogId
        },
        {
            headers: {
                "Authorization" : localStorage.getItem("token")
            }
        })
    }
    return (
        <div className=" border-y border-gray-200 text-gray-400 py-2 my-5 grid grid-cols-6">
            <div className="flex col-span-5 text-xl" >
                <div className="hover:text-black cursor-pointer justify-center flex-col max-w-7 flex" onClick={onClickHandle}>
                    <LikeIcon/>
                </div>
                <div className="ml-2">
                    {likeValue}
                </div>
            </div>
            <div className="flex col-span-1 justify-between">
                <div>
                    <ClipboardPopover blogId={blogId}/>
                </div>
                <div>
                    <Bookmark blogId={blogId} mark={mark} setMark={setMark}/>
                </div>
            </div>
        </div>
    )
}