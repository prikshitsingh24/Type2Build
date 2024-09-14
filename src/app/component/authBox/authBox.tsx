import crossLogo from "../../images/crossLogo.png"
import Image from "next/image";
import {Input} from "@nextui-org/input";
import { Button, Link } from "@nextui-org/react";
import { useRecoilState } from "recoil";
import authBoxState from "@/app/state/authBoxState";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function AuthBox(){
    const [authBox,setAuthBox]=useRecoilState(authBoxState.authBoxState)
    const [signUpBox,setSignUpBox]=useRecoilState(authBoxState.signUpBoxState)
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const [loading,setLoading]=useState(false);
    const handleCrossClick=()=>{
        setAuthBox(false)
    }
    const handleSignUpClick=()=>{
        setAuthBox(false)
        setSignUpBox(true);
    }

    const handleSignInClick=async ()=>{
        setLoading(true);
        const response=await signIn('credentials',{
            email:email,
            password:password,
            redirect:false
        })
       if(response?.ok){
        setLoading(false);
        setAuthBox(false);
       }
       
    }
    return(
        <div className="bg-black w-[400px] h-[600px] rounded-lg">
            <div className="flex flex-col">
                <div className="w-full flex flex-row justify-end pr-4 pt-2" onClick={handleCrossClick}><Image src={crossLogo} alt="cross" className="w-7"></Image></div>
                <div className="w-full text-center text-3xl">
                    Welcome back
                </div>
                <div className="mr-10 ml-10 mt-7">
                <Input type="email" variant="flat" label="Email" onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="mr-10 ml-10 mt-7">
                <Input type="password" variant="flat" label="Password" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className="w-full mt-7 flex flex-row justify-center">
                    <Button onClick={handleSignInClick}> Sign In</Button>
                </div>
                <div className="w-full mt-7 flex flex-row justify-center"><span>Dont have an account? <Link className="hover:cursor-pointer" onClick={handleSignUpClick}>Sign Up</Link></span> </div>
                <div>
                   <hr className="ml-10 mr-10 mt-5" /> 
                </div>
                
            </div>
        </div>
    )
}