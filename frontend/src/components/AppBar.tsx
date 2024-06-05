import { useNavigate } from "react-router-dom"
import { SearchIcon } from "../icons/SearchIcon"
import { WriteIcon } from "../icons/WriteIcon"
import SearchDialog from "./SearchCard"
import { ProfileCard } from "./ProfileCard"

export const AppBar = () => {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between border-b border-slate-200 pl-20 pr-8 py-2">
            <div className="flex">
                <div className="flex font-semibold cursor-pointer">
                    <img onClick={() => navigate('/')} className="w-14" src="../../public/images/logo-medium.svg" alt="" />
                </div>
                <div className=" flex justify-center flex-col ml-6 ">
                    <SearchDialog/>
                </div>
            </div>
            
            <div className=" flex">
                <div className=" flex justify-center flex-col mr-14">
                    <Write/>
                </div>
                <div className=" flex justify-center flex-col">
                    <ProfileCard/>
                </div>
            </div>
        </div>
    )
}

function Write(){
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate('/createBlog')} className=" cursor-pointer flex justify-center text-slate-500 rounded-full mr-7 hover:text-black">
            <WriteIcon/>
            <div className="ml-1">
                Write
            </div>
        </div>
    )
}

export function Search(){
    return (
            <button type="button" className=" flex justify-between text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-full text-sm text-center items-center px-2.5 py-1.5 min-w-56">
                <div className="flex">
                    <SearchIcon/>
                    <div className="ml-2 mr-10">Search...</div>
                </div>
                <div className="px-2 mr-1 rounded bg-gray-300">ctrl k</div>
            </button>
    )
}