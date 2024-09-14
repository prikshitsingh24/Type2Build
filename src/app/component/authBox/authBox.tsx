import crossLogo from "../../images/crossLogo.png"
import Image from "next/image";
import {Input} from "@nextui-org/input";
import { Button, Link } from "@nextui-org/react";
import { useRecoilState } from "recoil";
import authBoxState from "@/app/state/authBoxState";

export default function AuthBox(){
    const [authBox,setAuthBox]=useRecoilState(authBoxState)
    const handleCrossClick=()=>{
        setAuthBox(false)
    }
    return(
        <div className="bg-black w-[400px] h-[500px] rounded-lg">
            <div className="flex flex-col">
                <div className="w-full flex flex-row justify-end pr-4 pt-2" onClick={handleCrossClick}><Image src={crossLogo} alt="cross" className="w-9"></Image></div>
                <div className="w-full text-center text-3xl">
                    Welcome back
                </div>
                <div className="mr-10 ml-10 mt-10">
                <Input type="email" variant="flat" label="Email" />
                </div>
                <div className="mr-10 ml-10 mt-10">
                <Input type="password" variant="flat" label="Password"/>
                </div>
                <div className="w-full mt-10 flex flex-row justify-center">
                    <Button> Sign up</Button>
                </div>
                <div className="w-full mt-10 flex flex-row justify-center"><span>Dont have an account?<Link>Sign Up</Link></span> </div>
            </div>
        </div>
    )
}