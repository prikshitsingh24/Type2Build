'use client';

import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { LogoutIcon } from './logout';
import { redirect } from 'next/navigation';
import { AddIcon } from './add';
import darkModeLogo from "../../images/darkMode.png"
import lightModeLogo from "../../images/lightMode.png"
import Image from "next/image";

export default function Dashboard() {
  const { data, status } = useSession();
  const router = useRouter();
  const [theme, setTheme] = useState('light');
  const handleLogoutClick=async ()=>{
    await signOut({ redirect: false }); // Disable automatic redirection
    router.push('/');
  }
  const handleCreateNewProjectClick=()=>{
    router.push('/builder')
  }
  useEffect(() => {
    // Get the stored theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('prefers-color-scheme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Save the theme to localStorage
  };
  return (
    <div className="w-full h-screen grid grid-rows-[100px_1fr] grid-cols-[1fr_3fr]">
      {/* Header */}
      <div className="row-span-1 col-span-2 ">
       <div className='text-4xl p-5'>
       Welcome, {data?.user?.name}
       </div>
        <div className="fixed right-7 top-3 w-14 rounded-full hover:cursor-pointer " onClick={toggleTheme}>
          <Image className="object-cover" src={theme==="dark"?lightModeLogo:darkModeLogo} alt="profile"></Image>
        </div>
      </div>
      {/* Sidebar */}
      <aside className="border ml-4 rounded-xl p-4 mb-5 flex flex-col text-lg">
        <div className='mb-5 border-b hover:cursor-pointer'>Settings</div>
        <div className='mb-5 border-b hover:cursor-pointer'>Account Settings</div>
        <div className="mt-auto">
          <Button color="primary" size="lg" variant="bordered" startContent={<LogoutIcon/>} onClick={handleLogoutClick} >Logout</Button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="row-span-1 col-span-1 p-4 text-2xl border rounded-xl mb-5 ml-4 mr-4">
        <div className='flex flex-row'>
        <div>
        Projects
        </div>
        <div className='flex flex-1 justify-end'>
            <Button color="primary" size="sm" variant="bordered" startContent={<AddIcon/>} onClick={handleCreateNewProjectClick}>Create new project</Button>
        </div>
        </div>
      </main>
    </div>
  );
}
