'use client'
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import profileIcon from "./images/profile.png";
import { useRouter } from 'next/navigation'
import { SessionProvider, useSession } from "next-auth/react"
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import AuthBox from "./component/authBox/authBox";
import { Button, Input } from "@nextui-org/react";
import { useRecoilState } from "recoil";
import authBoxState from "./state/authBoxState";
import SignUpBox from "./component/signUpBox/signUpBox";
import darkModeLogo from "./images/darkMode.png"
import lightModeLogo from "./images/lightMode.png"

export default function Home(session:Session) {
  const router = useRouter()
  const { data, status } = useSession()
  const [authBox,setAuthBox]=useRecoilState(authBoxState.authBoxState)
  const [signUpBox,setSignUpBox]=useRecoilState(authBoxState.signUpBoxState)
  const [mode,setMode]=useState(false);
  const handleBuildClick=()=>{
    if(status =="authenticated"){
      router.push(`/dashboard/${data?.user?.id}`)
    }else{
      setAuthBox(true)
    }
    
  }
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Get the stored theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Save the theme to localStorage
  };

  if(status=="authenticated"){
    router.push(`/dashboard/${data?.user?.id}`)
  }

  return (
    <div>
      {authBox&&(
         <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
         <AuthBox></AuthBox>
       </div>
      )}
        {signUpBox&&(
         <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
         <SignUpBox></SignUpBox>
       </div>
      )}
      <div className="flex flex-row justify-end pt-7 mb-3">
        <div className="mr-10 pt-4 w-14 rounded-full hover:cursor-pointer " onClick={toggleTheme}>
          <Image className="object-cover" src={theme==="dark"?lightModeLogo:darkModeLogo} alt="profile"></Image>
        </div>
        </div>
      <div className="grid grid-rows-[1fr_1fr_1fr] justify-items-center min-h-screen md:p-8 p-5 pb-20 md:gap-y-56  sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="grid grid-rows-[1fr_1fr] justify-items-center ">
      <div className="md:text-7xl text-2xl">
      <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Type2Build',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Your Website, Just a Type Away',
        1000,
        'Type. Build. Launch.',
        1000,
        'Type2Build',
        1000,
      ]}
      speed={50}
    />
      </div>
      <div>
        <Button color="primary" size="lg" variant="bordered" onClick={handleBuildClick}>Start building</Button>
      </div>
      </div>
     <div className="w-full">
      <div className="md:text-4xl text-xl text-center mb-10">
      Using our builder build frontend and
      backend simultenously
      </div>
     <div className="grid md:grid-cols-2 gap-2">
      <div className="md:mb-0 mb-10">
        <div className="text-center">
        Frontend
        </div>
        <div className="w-full border  h-full rounded-sm p-3">
        `I'd love to have a beautiful landing page for my startup. I want it to feature a big, eye-catching headline with a brief description underneath. Below that, I’d like a prominent call-to-action button that stands out. It would be great if the hero section could have a nice background image that fits the theme of innovation and technology. Finally, include a small section for customer testimonials with quotes and names.`
        </div>
      </div>
      <div>
      <div className="text-center">
        Backend
        </div>
        <div className="w-full border h-full rounded-sm p-3">
        <div>
        `I need a simple backend setup for my website. I’d like it to handle user sign-ups and logins with basic authentication. It should also include an endpoint to fetch user data and another to update user profiles. Can you set this up with some basic error handling and use a database to store user information?`
        </div>
        </div>
      </div>
     </div>
     </div>
      <div>

      </div>
    </div>
    </div>
  );
}
