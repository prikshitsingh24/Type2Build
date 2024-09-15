import googleLogo from '../../images/googleLogo.png'
import Image from "next/image";
export default function GoogleButton(){
    return(
        <div className="bg-gray-300 mr-10 ml-10 rounded-xl hover:cursor-pointer items-center justify-center w-full flex flex-row">
            <div className='w-7 mr-3 pt-2 pb-2'>
                <Image alt={"google"} src={googleLogo}></Image>
            </div>
            <div className="text-2xl">
                Google
            </div>
        </div>
    )
}