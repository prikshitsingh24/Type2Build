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
import codeStatus from '@/app/state/codeStatus';
import { useRecoilState } from 'recoil';
import promptStatus from '@/app/state/promptStatus';
import selectedElementsState from '@/app/state/selectedElementsState';

export default function Dashboard({params}:any) {
  const { data, status } = useSession();
  const router = useRouter();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [theme, setTheme] = useState('light');
  const [loading,setLoading]=useState(false)
  const [projectName,setProjectName]=useState("");
  const [projectDescription,setProjectDescription]=useState("");
  const [projects,setProject]=useState<any[]>()
  const [frontendCode, setFrontendCode] = useState("");
  const [code, setCode] = useRecoilState(codeStatus.frontendCodeState);
  const [newDraft,setNewDraft]=useRecoilState(promptStatus.newDraftState);
  const [changesInDraft,setChangesInDraft]=useRecoilState(promptStatus.changesInDraftState);
  const [selectedElement,setSelectedElement]=useRecoilState(selectedElementsState.selectedElementState);
  const [toolkit,setToolkit]=useRecoilState(selectedElementsState.toolkitStatus)
  const [overlayStyles, setOverlayStyles] = useRecoilState(selectedElementsState.overlayStatus)
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

  const handleCardClick=async (id: string)=>{
    console.log("sdasdasdaxdgafsdagsd")
    router.push(`/builder/${id}`)
  }

  useEffect(()=>{
    setCode("")
    setSelectedElement([])
    setOverlayStyles([])
    setToolkit(false)
    setChangesInDraft(false);
    setNewDraft(true)
    const getProjects=async ()=>{
      const userId = params.dashboardId;
    const response=await fetch("/api/project/get",{
      method: 'POST',
      body: JSON.stringify({userId}),
    })
    if(response.ok){
      const data= await response.json()
      setProject(data.projects?.projects)
    }
    }
    getProjects();
  },[])

  return (
    <div>
      <div className="h-0">
        <NavBar />
      </div>
      
      <div
        className={`pt-20 h-screen w-full grid grid-cols-[1fr_4fr] ${theme === 'dark' ? 'bg-black' : 'bg-[#E2E4F0]'}`}
        style={{ background: 'var(--background)' }} // For light/dark mode
      >
        {/* Sidebar */}
        <aside
          className="border ml-4 rounded-xl mb-5 p-4 flex flex-col text-lg items-center"
          style={{ background: 'var(--subcontainer-background)' }} // Use the subcontainer background variable
        >
          <div className='mb-5 hover:cursor-pointer'>Settings</div>
          <div className='mb-5 hover:cursor-pointer'>Account Settings</div>
          <div className="mt-auto">
            <Button color="primary" size="lg" variant="light" startContent={<LogoutIcon/>} onClick={handleLogoutClick} >
              Logout
            </Button>
          </div>
        </aside>
        
        {/* Main Content */}
        <main
          className="grid grid-rows-[auto_1fr] p-4 text-2xl border rounded-xl mb-5 ml-4 mr-4 overflow-hidden custom-scrollbar"
          style={{ background: 'var(--subcontainer-background)' }} // Use the subcontainer background variable
        >
          <div className="flex flex-row items-center p-2 border-b">
            <div className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
              Projects
            </div>
            <div className="flex flex-1 justify-end">
              <Button color="primary" size="sm" variant="solid" onPress={toggleTheme}>
                Create new project
              </Button>
            </div>
          </div>
          <div className='row-span-1 overflow-y-scroll custom-scrollbar pr-2 pb-2'> {/*adding this later style={{background: '#E2E4F0'}}*/}
            {projects?.length==0?(
              <div className='h-full w-full flex items-center justify-center'>
                <Spinner size="lg" />
              </div>
            ):(
            <div className='grid grid-cols-5 gap-5 mt-5 hover:cursor-pointer'>
            {projects?.map((project) => (
              <div onClick={() => {
                console.log("Card was clicked!");
                handleCardClick(project.id);}}>
                  <Card className='mx-auto  rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-lg'>
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
              </div>    
              ))}
            </div>
            )}
          </div>
        </main>
        
        {/* Modal code can remain the same */}
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
