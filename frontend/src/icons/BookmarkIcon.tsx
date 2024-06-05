import { bookmarkAtom } from "@/atoms"
import { BACKEND_URL } from "@/config"
import axios from "axios"
import { useSetRecoilState } from "recoil"
import { Spinner } from "./Spinner";
import { useState } from "react";

export function Bookmark({blogId, mark, setMark}: {blogId: string, mark: boolean, setMark: (mark: boolean) => void}) {
    const setBookmark = useSetRecoilState(bookmarkAtom);
    const [loading, setLoading] = useState(false);
    if(loading){
        return <Spinner/>
    }
    if(mark){

        async function deleteBookmark(){
            setLoading(true);
            const response = await axios.delete(`${BACKEND_URL}/api/v1/bookmark/${blogId}`,{
                headers: {
                    "Authorization" : localStorage.getItem("token")
                }
            })
            if(response.status === 200){
                setMark(false)
                const response2 = await axios.get(`${BACKEND_URL}/api/v1/bookmark`, {
                    headers: {
                        "Authorization" : localStorage.getItem("token")
                    },
                })
                setBookmark(response2.data.bookmarks.map((bookmark:any) => bookmark.blogId));
            }
            setLoading(false)
        }

        return (
            <div onClick={deleteBookmark}>
                <svg className="size-6 cursor-pointer hover:text-black" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 6.5C23 3.46243 20.5376 1 17.5 1C14.4624 1 12 3.46243 12 6.5C12 9.53757 14.4624 12 17.5 12C20.5376 12 23 9.53757 23 6.5ZM18.0006 7.00001L18.0011 9.50352C18.0011 9.77966 17.7773 10.0035 17.5011 10.0035C17.225 10.0035 17.0011 9.77966 17.0011 9.50352L17.0006 7.00001H14.4956C14.2197 7.00001 13.9961 6.77615 13.9961 6.50001C13.9961 6.22387 14.2197 6.00001 14.4956 6.00001H17.0005L17 3.49927C17 3.22313 17.2239 2.99927 17.5 2.99927C17.7761 2.99927 18 3.22313 18 3.49927L18.0005 6.00001H20.4966C20.7725 6.00001 20.9961 6.22387 20.9961 6.50001C20.9961 6.77615 20.7725 7.00001 20.4966 7.00001H18.0006ZM17.5 13C18.0166 13 18.5191 12.9397 19.0008 12.8259V21.2451C19.0008 21.8563 18.309 22.2108 17.8128 21.8539L12.0016 17.6729L6.19045 21.8539C5.69432 22.2108 5.00244 21.8563 5.00244 21.2451V6.24915C5.00244 4.45422 6.45752 2.99915 8.25244 2.99915H12.0224C11.3752 4.00962 11 5.21099 11 6.5C11 10.0899 13.9101 13 17.5 13Z"/>
                </svg>
            </div>
        )
    }

    async function addBookmark(){
        setLoading(true);
        const response = await axios.post(`${BACKEND_URL}/api/v1/bookmark`,{
            blogId
        }, {
            headers: {
                "Authorization" : localStorage.getItem("token")
            }
        })
        if(response.status === 200){
            setMark(true)
            const response2 = await axios.get(`${BACKEND_URL}/api/v1/bookmark`, {
                headers: {
                    "Authorization" : localStorage.getItem("token")
                },
            })
            setBookmark(response2.data.bookmarks.map((bookmark:any) => bookmark.blogId));
        }
        setLoading(false)
    }

    return (
        <div onClick={addBookmark}>
            <svg className="size-6 cursor-pointer hover:text-black" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 6.5C23 3.46243 20.5376 1 17.5 1C14.4624 1 12 3.46243 12 6.5C12 9.53757 14.4624 12 17.5 12C20.5376 12 23 9.53757 23 6.5ZM18.0006 7.00001L18.0011 9.50352C18.0011 9.77966 17.7773 10.0035 17.5011 10.0035C17.225 10.0035 17.0011 9.77966 17.0011 9.50352L17.0006 7.00001H14.4956C14.2197 7.00001 13.9961 6.77615 13.9961 6.50001C13.9961 6.22387 14.2197 6.00001 14.4956 6.00001H17.0005L17 3.49927C17 3.22313 17.2239 2.99927 17.5 2.99927C17.7761 2.99927 18 3.22313 18 3.49927L18.0005 6.00001H20.4966C20.7725 6.00001 20.9961 6.22387 20.9961 6.50001C20.9961 6.77615 20.7725 7.00001 20.4966 7.00001H18.0006ZM17.5008 19.7815V13C18.0171 12.9999 18.5193 12.9397 19.0008 12.8259V21.2451C19.0008 21.8563 18.309 22.2108 17.8128 21.8539L12.0016 17.6729L6.19045 21.8539C5.69432 22.2108 5.00244 21.8563 5.00244 21.2451V6.24915C5.00244 4.45422 6.45752 2.99915 8.25244 2.99915H12.0224C11.7257 3.46235 11.4862 3.96566 11.3138 4.49915H8.25244C7.28594 4.49915 6.50244 5.28265 6.50244 6.24915V19.7815L11.5636 16.1402C11.8253 15.9519 12.178 15.9519 12.4397 16.1402L17.5008 19.7815Z"/>
            </svg>
        </div>
    )
}