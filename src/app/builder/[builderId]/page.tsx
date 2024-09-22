'use client';
import { Button, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BuildIcon } from "../components/buildIcon";
import Chat from "../components/chat";
import Preview from "../components/preview";

export default function Builder({ params }: any) {
    const projectId = params.builderId;
    const [project, setProject] = useState<any>();
    const [loading, setLoading] = useState(true); // Add a loading state
    const [buildLoading,setBuildLoading]=useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch("/api/project/getProject", {
                    method: "POST",
                    body: JSON.stringify({ projectId })
                });
                const data = await response.json();
                setProject(data.project);
            } catch (error) {
                console.error("Failed to fetch project:", error);
            } finally {
                setLoading(false); // Set loading to false once fetching is complete
            }
        };

        fetchProject();
    }, [projectId]);



    const handleBuildClick=async ()=>{
        setBuildLoading(true);
        const response=await fetch("/api/project/build",{
            method:"POSt",
            body:JSON.stringify({projectId})
        })

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'nextjs-app.zip'; // The name of the file to be downloaded
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            setBuildLoading(false);
          } else {
            console.error('Error downloading the file:', await response.json());
            setBuildLoading(false)
          }
    }

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="w-full h-screen overflow-hidden bg-white">
            <div className="p-2 border-b-2 mb-2 flex flex-row items-center">
                <div className="flex-1 text-2xl">{project.projectName}</div>
                <div className="flex-2 mr-2">
                    <Button startContent={<BuildIcon />} isLoading={buildLoading} color="primary" size="md" variant="bordered" onClick={handleBuildClick}>
                        Build
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-[1fr_2fr] gap-4 h-full">
                <div  className="pr-2 ml-4 mb-20">
                    {project.chat?(
                        <Chat id={projectId} previousChat={project.chat} frontendDev={project.frontendDev} />
                    ):(
                        <Chat id={projectId} />
                    )}
                    
                </div>
                <div className="mb-32">
                    {project.frontendDev?(
                        <Preview frontendDev={project.frontendDev} />
                    ):(
                        <Preview />
                    )}
                    
                </div>
            </div>
        </div>
    );
}
