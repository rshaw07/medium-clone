import { SignupInput } from "@coder_rishi07/medium-common";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "../config"
import { Spinner } from "@/icons/Spinner";

export const Sign = ({type} : {type: 'signin' | 'signup'}) =>{
    const [flag, setFlag] = useState(false);
    useEffect( () => {

        if(localStorage.getItem("token")){
            navigate("/blogs")
        }

    },[])

    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    async function onClick(){
        setFlag(true)
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`,
            postInputs
            )
            localStorage.setItem("token", "Bearer " + response.data.jwt);
            navigate("/blogs")
        } catch (error) {
            setFlag(false)
            alert(`error while ${type}`)
        }

    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="font-bold text-4xl px-4 mb-2">
                        {type==='signup'? "Create an account" : "Login to your account"}
                    </div>
                    <div className="text-slate-400 mb-5 font-medium flex justify-center">
                        <div>{type==='signup'? "Already have an account?" : "Don't have an account?"}</div>
                        <Link to={type==='signup'?"/signin":"/signup"} className="underline ml-1" >{type==='signup'? "Login" : "Sign up" }</Link>
                    </div>
                    {type==='signup'?<InputBox title="Username" placeholder="Rishi Shaw" onChange={(e)=>{
                        setPostInputs(c => ({
                            ...c,
                            name: e.target.value
                        }));
                    }}/>: null}
                    <InputBox title="Email" placeholder="rishi@gmail.com" onChange={(e)=>{
                        setPostInputs(c => ({
                            ...c,
                            email: e.target.value
                        }));
                    }}/>
                    <InputBox title="Password" placeholder="123456" type="password" onChange={(e)=>{
                        setPostInputs(c => ({
                            ...c,
                            password: e.target.value
                        }));
                    }}/>

                    <button onClick={onClick} type="button" className="text-white bg-gray-900 w-full hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 flex justify-center">{flag?<Spinner/>:null}{type==='signin'?"Login": "Sign up"}</button>
                </div>    
            </div>
        </div>
    )
}

interface InputBoxType {
    title : string;
    placeholder: string;
    onChange: (e:ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function InputBox({title, placeholder, onChange, type}: InputBoxType){
    return (
        <>
          <div>
            <label className="block my-2 text-sm font-semibold text-gray-900">{title}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 mb-4 border font-medium border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder={placeholder} required />
        </div>
        </>
    )
}