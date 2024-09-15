
import crossLogo from "../../images/crossLogo.png"
import Image from "next/image";
import {Input} from "@nextui-org/input";
import { Button, Link } from "@nextui-org/react";
import { useRecoilState } from "recoil";
import authBoxState from "@/app/state/authBoxState";
import { useState } from "react";
import GoogleButton from "../buttons/googleButton";
import GithubButton from "../buttons/githubButton";

export default function SignUpBox(){
    const [authBox,setAuthBox]=useRecoilState(authBoxState.authBoxState);
    const [signUpBox,setSignUpBox]=useRecoilState(authBoxState.signUpBoxState);
    const [name,setName]=useState("")
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const [loading,setLoading]=useState(false);
    const handleCrossClick=()=>{
        setAuthBox(false)
        setSignUpBox(false)
    }
    const handleSignInClick=()=>{
        setSignUpBox(false);
        setAuthBox(true);
    }

    const handleSignUpClick=async ()=>{
        setLoading(true);
        const response = await fetch(`api/auth/register`, {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
          });
      
          const data = await response.json();
          if(response.ok){
            setLoading(false);
            setSignUpBox(false);
            setAuthBox(true);
          }else{
            setLoading(false);
          }
          console.log(data);
    }

    return(
        <div className="border w-[400px] h-[600px] rounded-lg">
            <div className="flex flex-col">
                <div className="w-full flex flex-row justify-end pr-4 pt-2" onClick={handleCrossClick}><Image src={crossLogo} alt="cross" className="w-7"></Image></div>
                <div className="w-full text-center text-3xl">
                    Create new account
                </div>
                <div className="mr-10 ml-10 mt-5">
                <Input type="name" variant="flat" onChange={(e)=>setName(e.target.value)} label="Name" required/>
                </div>
                <div className="mr-10 ml-10 mt-5">
                <Input type="email" variant="flat" label="Email" onChange={(e)=>setEmail(e.target.value)} required/>
                </div>
                <div className="mr-10 ml-10 mt-5">
                <Input type="password" variant="flat" label="Password" onChange={(e)=>setPassword(e.target.value)} required/>
                </div>
                <div className="w-full mt-5 flex flex-row justify-center">
                    <Button isLoading={loading} onClick={handleSignUpClick}> Sign up</Button>
                </div>
                <div className="w-full mt-5 flex flex-row justify-center"><span>Already have an account? <Link className="hover:cursor-pointer" onClick={handleSignInClick}>Sign In</Link></span> </div>
                <div>
                   <hr className="ml-10 mr-10 mt-5" /> 
                </div>
                <div className="w-full mt-7 flex flex-row justify-center">
                    <GoogleButton></GoogleButton>
                </div>
                <div className="w-full mt-7 flex flex-row justify-center">
                    <GithubButton></GithubButton>
                </div>
            </div>
        </div>
    )
}