import { urlAtom } from "@/atoms";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

interface props{
    title: string,
    content: string,
    id: string
}

export const SmallBlogCard = ({blog}:{blog: props}) => {

    const setUrl = useSetRecoilState(urlAtom);

    function onClickHandle(){
        setUrl(`${blog.id}`)
        navigate(`/blog/${blog.id}`)
    }

    const navigate = useNavigate();
    return (
        <div onClick={onClickHandle} className="border-b border-slate-200 pt-2 pb-1 hover:bg-gray-200 px-2 cursor-pointer">
            <div className="font-bold text-lg">{blog.title}</div>
            <div>{blog.content.length>80?blog.content.slice(0, 80)+"...":blog.content}</div>
        </div>
    )    
}