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
        <button className="md:mt-20 bg-gray-600 rounded-md p-3">Start building</button>
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
        <div className="w-full border border-white h-full rounded-sm p-3">
        <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        `I'd love to have a beautiful landing page for my startup. I want it to feature a big, eye-catching headline with a brief description underneath. Below that, I’d like a prominent call-to-action button that stands out. It would be great if the hero section could have a nice background image that fits the theme of innovation and technology. Finally, include a small section for customer testimonials with quotes and names.`
      ]}
      speed={99}
    />
        </div>
      </div>
      <div>
      <div className="text-center">
        Backend
        </div>
        <div className="w-full border border-white h-full rounded-sm p-3">
        <div>
        <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        `I need a simple backend setup for my website. I’d like it to handle user sign-ups and logins with basic authentication. It should also include an endpoint to fetch user data and another to update user profiles. Can you set this up with some basic error handling and use a database to store user information?`
      ]}
      speed={99}
    />
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
