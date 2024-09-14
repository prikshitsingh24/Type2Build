import crossLogo from "../../images/crossLogo.png"
import Image from "next/image";
import {Input} from "@nextui-org/input";
import { Button, Link } from "@nextui-org/react";
import { useRecoilState } from "recoil";
import authBoxState from "@/app/state/authBoxState";

export default function AuthBox(){
    const [authBox,setAuthBox]=useRecoilState(authBoxState.authBoxState)
    const [signUpBox,setSignUpBox]=useRecoilState(authBoxState.signUpBoxState)
    const handleCrossClick=()=>{
        setAuthBox(false)
    }
    const handleSignUpClick=()=>{
        setAuthBox(false)
        setSignUpBox(true);
    }
    return(
        <div className="bg-black w-[400px] h-[600px] rounded-lg">
            <div className="flex flex-col">
                <div className="w-full flex flex-row justify-end pr-4 pt-2" onClick={handleCrossClick}><Image src={crossLogo} alt="cross" className="w-7"></Image></div>
                <div className="w-full text-center text-3xl">
                    Welcome back
                </div>
                <div className="mr-10 ml-10 mt-7">
                <Input type="email" variant="flat" label="Email" />
                </div>
                <div className="mr-10 ml-10 mt-7">
                <Input type="password" variant="flat" label="Password"/>
                </div>
                <div className="w-full mt-7 flex flex-row justify-center">
                    <Button> Sign In</Button>
                </div>
                <div className="w-full mt-7 flex flex-row justify-center"><span>Dont have an account? <Link className="hover:cursor-pointer" onClick={handleSignUpClick}>Sign Up</Link></span> </div>
                <div>
                   <hr className="ml-10 mr-10 mt-5" /> 
                </div>
                
            </div>
        </div>
    )
}