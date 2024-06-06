import { useNavigate } from "react-router-dom"
import { ProfileCard } from "./ProfileCard";
import { PublishCard } from "./PublishCard";
import { useEffect, useState } from "react";

export const AppBar2 = ({content, tagsInput, prevId, imageUrl, title}: {content: string , tagsInput: string[], prevId: string, imageUrl: string, title: string}) => {
    const navigate = useNavigate();
    const [flag, setFlag] = useState(title==="" && content===""); 
    useEffect(() => {
        if(title!=="" && content!==""){
            setFlag(true)
        }else{
            setFlag(false);
        }
    },[title, content])
    return (
        <div className="flex justify-around border-b border-slate-200  py-2 text-sm">
            <div className="flex">
                <div className="flex cursor-pointer font-semibold">
                    <img onClick={() => navigate('/')} className="w-14" src="https://miro.medium.com/v2/resize:fit:1400/1*psYl0y9DUzZWtHzFJLIvTw.png" alt="" />
                </div>
                <div className=" flex justify-center flex-col ml-2">
                    Draft in Rishi Shaw
                </div>
            </div>
            
            <div className=" flex">
                <div className=" flex justify-center flex-col mr-14">
                    {flag? <button className=" bg-green-700 text-sm font-medium text-white rounded-full   hover:bg-green-800">
                        <PublishCard prevId={prevId} tagsInput={tagsInput} imageUrl={imageUrl}  title={title} content={content} />
                    </button> : <button className=" bg-green-400 px-4 py-1 text-sm font-medium text-white rounded-full">
                        Publish
                    </button>}
                    
                </div>
                <div className=" flex justify-center flex-col">
                    <ProfileCard/>
                </div>
            </div>
        </div>
    )
}


