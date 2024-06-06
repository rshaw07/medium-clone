import { AppBar } from "@/components/AppBar"
import { UserAvatar } from "@/components/UserAvatar";
import { EditProfile } from "@/components/EditProfile";
import { MeidumBlogCard } from "@/components/MeidumBlogCard";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { bookmarkAtom, bookmarkedBlogsSelector, profileHomeBlogSelector, userAtom } from "@/atoms";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { ProfilePageSkeleton } from "@/components/ProfilePageSkeleton";

export const  Profile = () => {
    const [focus, setFocus] = useState("Home");
    const navigate = useNavigate();
    const homeBLogs = useRecoilValue(profileHomeBlogSelector);
    const [user,setUser] = useRecoilState(userAtom);
    const bookmarkedBlogs = useRecoilValue(bookmarkAtom);
    const [flag, setFlag] = useState(false);
    
    const listBLogs = useRecoilValue(bookmarkedBlogsSelector);

    useEffect(() => {
        async function get(){
            const response = await axios.put(`${BACKEND_URL}/api/v1/user`,{}, {
                headers: {
                    "Authorization" : localStorage.getItem("token")
                }
            })
                setUser(response.data.user);
                setFlag(true);
        }
        get();
    },[userAtom])

    if(!flag){
        return <ProfilePageSkeleton/>
    }            

    return (
        <div>
            <AppBar/>
            <div className="grid grid-cols-8">
                <div className="col-span-1"></div>
                <div className="col-span-4">
                    <div className="text-4xl font-semibold pt-10 pb-6">
                        {user.name}
                    </div>
                    <div className="flex border-b border-slate-200 text-gray-500">
                        <div className={`${focus === "Home" ? "text-black border-b border-black" : ""} cursor-pointer`} onClick={() => setFocus("Home")}>Home</div>
                        <div className={`ml-10 ${focus === "Lists" ? "text-black border-b border-black" : ""} cursor-pointer`} onClick={() => setFocus("Lists")}>Lists</div>
                    </div>
                    <div className={`${focus === "Home" && homeBLogs.length > 0 ? "py-1" : "py-10"}`}>
                        
                        {focus === "Home" ?
                         homeBLogs.length > 0 ?
                         <div>
                            <div className="flex justify-center">
                                <div className=" flex justify-center flex-col m-1 text-green-500 text-3xl">•</div>
                                <div className=" flex justify-center flex-col text-gray-500 m-1 ">Published</div>
                                <div className=" flex justify-center flex-col m-1 text-red-500 text-3xl">•</div>
                                <div className=" flex justify-center flex-col m-1 text-gray-500">Draft</div>
                            </div>
                            {homeBLogs.map((blog:any) => <MeidumBlogCard blog={blog} flag={bookmarkedBlogs.includes(blog.id)} draft={blog.draft} type="Home"/>) }
                         </div> :<div className=" cursor-pointer mx-10 border-dashed border border-slate-400 flex justify-center flex-col min-h-24" onClick={() => navigate("/createBlog")}>
                            <div className="flex justify-center">
                                <div className="flex justify-center flex-col mr-0.5"><PlusIcon/></div>It looks empty here. Start your blogging journey by creating your first blog post now.
                            </div>
                         </div> : 

                         listBLogs.length > 0 ? listBLogs.map((blog:any) => <MeidumBlogCard blog={blog} flag={true} type="List" draft={blog.draft}/>) :
                         <div className=" cursor-pointer mx-10 border-dashed border border-slate-400 min-h-24 flex justify-center flex-col" onClick={() => navigate("/Blogs")}>
                            <div className="flex justify-center">
                                No bookmarks yet! Visit the blogs page to start bookmarking your favorite posts.
                            </div>
                         </div>
                        }
                    </div>
                </div>
                <div className=" col-span-3 border-l min-h-screen border-slate-200 p-10">
                    <UserAvatar avatar={user.avatar}/>
                    <div className="py-5">
                        <div className="font-semibold text-lg">{user.name}</div>
                        <div className="text-slate-500 font-light py-2">{user.bio}</div>
                        <div className="text-green-500 my-3">
                            <EditProfile user={user} setUser={setUser}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PlusIcon(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.3" stroke="currentColor" className="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>

    )
}