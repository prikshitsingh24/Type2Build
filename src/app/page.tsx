'use client'
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import profileIcon from "./images/profile.png";

export default function Home() {
  return (
    <div>
      <div className="flex flex-row justify-end pt-7 mb-3">
        <div className="mr-10 pt-4 w-14 rounded-full hover:cursor-pointer ">
          <Image className="object-cover" src={profileIcon} alt="profile"></Image>
        </div>
        </div>
      <div className="grid grid-rows-[1fr_1fr_1fr] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="grid grid-rows-[1fr_1fr] justify-items-center ">
      <div className="md:text-7xl text-3xl animate-in fade-in duration-1000">
      <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Type2Build',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Your Website, Just a Type Away',
        1000,
        'Type. Build. Launch.',
        1000,
        'From Typing to a Live Site in Minutes',
        1000
      ]}
      speed={50}
      repeat={Infinity}
    />
      </div>
      <div>
        <button className="mt-10 bg-gray-600 rounded-md p-3">Start building</button>
      </div>
      </div>
     <div>
     
     </div>
      <div>

      </div>
    </div>
    </div>
    
  );
}
