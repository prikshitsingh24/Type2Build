'use client';

import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardBody, CardHeader, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spacer, useDisclosure } from '@nextui-org/react';
import { LogoutIcon } from './logout';
import { redirect } from 'next/navigation';
import { AddIcon } from './add';
import darkModeLogo from "../../images/darkMode.png"
import lightModeLogo from "../../images/lightMode.png"
import Image from "next/image";
import nextJsLogo from "../../images/nextjs.png"

export default function Dashboard({params}:any) {
  const { data, status } = useSession();
  const router = useRouter();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [theme, setTheme] = useState('light');
  const [loading,setLoading]=useState(false)
  const [projectName,setProjectName]=useState("");
  const [projectDescription,setProjectDescription]=useState("");
  const [projects,setProject]=useState<any[]>()

  const handleLogoutClick=async ()=>{
    await signOut({ redirect: false }); // Disable automatic redirection
    router.push('/');
  }
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

  const handleCreateProject=async ()=>{
    setLoading(true);
    const ownerId = params.dashboardId;
    const response = await fetch("/api/project/add",{
      method: 'POST',
      body: JSON.stringify({ projectName,projectDescription,ownerId}),
    })
    const data= await response.json();
    console.log(data);
    if(response.ok){
      setLoading(false);
      router.push(`/builder/${data.project.id}`)
    }
  }

  useEffect(()=>{
    const getProjects=async ()=>{
      const userId = params.dashboardId;
    const response=await fetch("/api/project/get",{
      method: 'POST',
      body: JSON.stringify({userId}),
    })
    const data= await response.json()
    setProject(data.projects.projects)
    }
    getProjects();
  },[])

  return (
    <div className="w-full h-screen grid grid-rows-[100px_1fr] grid-cols-[1fr_3fr] ">
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
            <Button color="primary" size="sm" variant="bordered" startContent={<AddIcon/>} onPress={onOpen}>Create new project</Button>
        </div>
        </div>
        <div className='overflow-scroll'>
          {projects?.length==0?(
             <div>
              fetching
             </div>
          ):(
           <div className='grid grid-cols-4 gap-5 over mt-10 hover:cursor-pointer'>
           {projects?.map((project) => (
                 <Card>
                 <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <Image src={nextJsLogo} alt={"nextjs"} className="rounded-lg"></Image>
                 </CardHeader>
                 <CardBody className="overflow-visible py-2">
                 <div className='text-md'>{project.projectName}</div>
                   <div className='text-sm'>{project.projectDescription}</div>
                 </CardBody>
               </Card>
            ))}
           </div>
          )}
        </div>
      </main>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">New Project</ModalHeader>
              <ModalBody>
              <Input type="name" variant="flat"label="Name" required onChange={(e)=>setProjectName(e.target.value)}/>
              <Input type="name" variant="flat"label="Description(optional)" onChange={(e)=>setProjectDescription(e.target.value)}/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" isLoading={loading} onPress={handleCreateProject}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
