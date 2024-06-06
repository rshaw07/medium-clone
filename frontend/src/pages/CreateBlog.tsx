import { useEffect, useRef, useState } from "react"
import { AppBar2 } from "../components/AppBar2"
import autosize from "autosize";

    export const CreateBlog = () => {
        const [content, setContent] = useState("");
        const [title, setTitle] = useState("");
        const textTitleRef = useRef(null);
        const textContentRef = useRef(null);
        const tagsInput = ["1","2"];
        tagsInput.length = 0;

        useEffect(() => {
            if (textTitleRef.current) {
              autosize(textTitleRef.current);
            }
            if (textContentRef.current) {
              autosize(textContentRef.current);
            }
          }, []);

        return (
            <div>
                <AppBar2 tagsInput={tagsInput} prevId={""} imageUrl={""} content={content} title={title}/>
                <div className="">
                    <div className="ml-64 mt-8 font-serif">
                        <textarea ref={textTitleRef} placeholder="Title" className="resize-none w-full p-4 text-gray-900 text-5xl font-thin rounded-lg focus:outline-none" onChange={(e) => setTitle(e.target.value)}/>
                        <textarea ref={textContentRef} placeholder="Tell your story..." className="w-full  resize-none  focus:outline-none text-xl" onChange={(e) => setContent(e.target.value)}/>
                    </div>
                    
                </div>
            </div>
        )
    }