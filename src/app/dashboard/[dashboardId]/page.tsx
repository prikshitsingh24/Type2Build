'use client';

import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardBody, CardHeader, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spacer, Spinner, useDisclosure } from '@nextui-org/react';
import { LogoutIcon } from './logout';
import { redirect } from 'next/navigation';
import { AddIcon } from './add';
import darkModeLogo from "../../images/darkMode.png"
import lightModeLogo from "../../images/lightMode.png"
import Image from "next/image";
import nextJsLogo from "../../images/nextjs.png"
import NavBar from './navbar';

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
    <div className='h-screen'>
    <NavBar/>
    <div className="w-full h-[500px] grid grid-cols-[1fr_4fr] overflow-hidden pt-2" style={{ background : '#E2E4F0' }}>
      {/* Sidebar */}
      <aside className="border ml-4 rounded-xl mb-5 p-4 flex flex-col text-lg items-center" style={{ background : '#ffffff' }}>
        <div className='mb-5 hover:cursor-pointer'>Settings</div>
        <div className='mb-5 hover:cursor-pointer'>Account Settings</div>
        <div className="mt-auto">
          <Button color="primary" size="lg" variant="light" startContent={<LogoutIcon/>} onClick={handleLogoutClick} >Logout</Button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="grid grid-rows-[auto_1fr] p-4 text-2xl border rounded-xl mb-5 ml-4 mr-4 overflow-hidden custom-scrollbar" style={{ background: '#ffffff' }}>
        <div className="flex flex-row items-center p-2 border-b">
          <div className="text-2xl font-bold text-gray-800">
            Projects
          </div>
          <div className="flex flex-1 justify-end">
            <Button color="primary" size="sm" variant="solid" startContent={<AddIcon className="text-white" />} onPress={onOpen}>Create new project</Button>
          </div>
        </div>
        <div className='row-span-1 overflow-y-scroll custom-scrollbar pr-2'> {/*adding this later style={{background: '#E2E4F0'}}*/}
          {projects?.length==0?(
             <div className='h-full w-full flex items-center justify-center'>
              <Spinner size="lg" />
             </div>
          ):(
           <div className='grid grid-cols-5 gap-5 mt-5 hover:cursor-pointer'>
           {projects?.map((project) => (
              <Card className='max-w-36 max-h-44 mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-lg'>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <Image
                    src={nextJsLogo}
                    alt={"nextjs"}
                    className="rounded-lg transition-all duration-300 filter grayscale hover:grayscale-0"
                  />
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <div className='text-md font-semibold'>{project.projectName}</div>
                  <div className='text-sm text-gray-600'>{project.projectDescription}</div>
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
    </div>
    
  );
}
