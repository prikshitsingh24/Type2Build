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

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="w-full h-screen overflow-hidden">
            <div className="p-2 border-b-2 mb-2 flex flex-row items-center">
                <div className="flex-1 text-2xl">{project.projectName}</div>
                <div className="flex-2 mr-2">
                    <Button startContent={<BuildIcon />} color="primary" size="md" variant="bordered">
                        Build
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-[1fr_2fr] gap-4 h-full">
                <div  className="pr-2 ml-4 mb-20">
                    <Chat />
                </div>
                <div className="mb-32">
                    <Preview />
                </div>
            </div>
        </div>
    );
}
