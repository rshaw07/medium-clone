import { useState } from "react"
import { Bookmark } from "../icons/BookmarkIcon";
import { Clipboard } from "../icons/ClipboardIcon";
import { useNavigate } from "react-router-dom";
import { UserAvatar } from "./UserAvatar";
import { ImageCard } from "./ImageCard";

interface BlogCardType {
    id: string,
    author: {
        avatar: string, 
        name: string
    },
    published: string,
    title: string,
    content: string,
    image: string,
    tags: string[]
}

export const BlogCard = ({blog, flag}: {blog: BlogCardType, flag: boolean}) =>{
    const[mark, setMark] = useState(flag);
    const navigate = useNavigate();

    return (
      <div className=" p-4 border-b grid grid-cols-9 border-slate-200">
        <div className="max-w-2xl col-span-7">
          <div className="flex pt-4 pb-2">
            <div className="flex justify-center flex-col">
              <UserAvatar avatar={blog.author.avatar} />
            </div>
            <div className="pl-2 flex justify-center flex-col text-lg">
              {blog.author.name}
            </div>
            <div className="px-2 font-thin flex justify-center flex-col text-xs text-slate-400">
              •
            </div>
            <div className=" font-thin flex justify-center flex-col text-slate-500">
              {blog.published}
            </div>
          </div>
          <div
            onClick={() => navigate(`/blog/${blog.id}`)}
            className="cursor-pointer"
          >
            <div className="font-bold text-xl py-1">{blog.title}</div>
            <div className="pt-1 text-lg text-slate-600">
              {blog.content.slice(0, 165)}...
            </div>
          </div>
          <div className="grid grid-cols-6">
            <div className=" col-span-4 flex py-4 text-sm text-slate-500">
              {blog.tags.slice(0, 2).map((tag, index) => (
                <div
                  key={index}
                  className="bg-slate-200 mr-3 rounded-full py-1 px-3 text-black"
                >
                  {tag}
                </div>
              ))}
              {blog.tags.length > 2 && (
                <div className="bg-slate-200 rounded-full py-1 px-3 text-black">
                  ...
                </div>
              )}

              <div className="flex justify-center ml-2 flex-col">
                {Math.ceil(blog.content.length / 1250)} min(s) read
              </div>
            </div>
            <div className="col-span-1 text-slate-400 flex justify-evenly">
              <div className="flex justify-center flex-col">
                <Clipboard blogId={blog.id} />
              </div>
              <div className=" flex justify-center flex-col">
                <Bookmark blogId={blog.id} mark={mark} setMark={setMark} />
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => navigate(`/blog/${blog.id}`)}
          className=" cursor-pointer flex col-span-2 justify-center flex-col"
        >
          <ImageCard image={blog.image} />
        </div>
      </div>
    );
}

