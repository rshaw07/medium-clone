import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { allBlogAtom, bookmarkAtom, homepageBlogSelector, userAtom } from "@/atoms";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import moment from "moment";
import { HomePageSkeleton } from "@/components/HomePageSkeleton";
export const Blogs = () => {
    const bookmarkedBlogs = useRecoilValue(bookmarkAtom);
    const setALLBlogs = useSetRecoilState(allBlogAtom);
    const blogs = useRecoilValue(homepageBlogSelector);
    const [loading, setLoading] = useState(true);
    const user = useSetRecoilState(userAtom); 
    useEffect(() => {
        async function get(){

            const response2 = await axios.put(`${BACKEND_URL}/api/v1/user`,{}, {
                headers: {
                    "Authorization" : localStorage.getItem("token")
                }
            })
                user(response2.data.user);
            
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    "Authorization" : localStorage.getItem("token")
                },
            })

            setALLBlogs(response.data.blogs.map((blog:any) => {
                const x = moment(blog.published).format("MMMM DD, YYYY");
                return {...blog, published: x}
            }))

            setLoading(false);
        }

        get();
    },[allBlogAtom, userAtom])

    if(loading){
        return (
            <div className="">
                <AppBar/>
                <HomePageSkeleton/>
                <HomePageSkeleton/>
                <HomePageSkeleton/>
            </div>
        )
    }

    return (
        <div>
            <AppBar/>
            <div className="flex justify-center min-h-screen">
                <div className=" max-w-5xl">
                    {blogs.map((blog:any) => (
                        <BlogCard blog={blog} flag = {bookmarkedBlogs.includes(blog.id)}/>
                    ))}
                </div>
            </div>
        </div>    
    )
}