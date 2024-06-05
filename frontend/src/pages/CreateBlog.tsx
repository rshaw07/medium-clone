import { useState } from "react"
import { AppBar2 } from "../components/AppBar2"

    export const CreateBlog = () => {
        const [content, setContent] = useState("");
        const [title, setTitle] = useState("");
        const tagsInput = ["1","2"];
        tagsInput.length = 0
        return (
            <div>
                <AppBar2 tagsInput={tagsInput} prevId={""} imageUrl={""} content={content} title={title}/>
                <div className="">
                    <div className="ml-64 mt-8 font-serif">
                        <input type="text" defaultValue={title} placeholder="Title" id="large-input" className="block w-full p-4 text-gray-900 text-5xl font-thin rounded-lg focus:outline-none" onChange={(e) => setTitle(e.target.value)}/>
                        <input type="text" defaultValue={content} placeholder="Tell your story..." className="w-full p-4 focus:outline-none text-xl" onChange={(e) => setContent(e.target.value)}/>
                    </div>
                    
                </div>
            </div>
        )
    }