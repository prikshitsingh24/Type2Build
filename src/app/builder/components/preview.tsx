'use client'

import codeStatus from "@/app/state/codeStatus";
import messageStatus from "@/app/state/messageStatus";
import promptStatus from "@/app/state/promptStatus";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { useRecoilState } from "recoil";
import Renderer from "./renderer";
import { ToolKitIcon } from "./toolkit";

export default function Preview({frontendDev}: any=""){
    const [selectedElement,setSelectedElement]=useState<any>(null);
    const [toolkit,setToolkit]=useState(false)
    const [code,setCode]=useRecoilState(codeStatus.frontendCodeState);
    const [newDraft,setNewDraft]=useRecoilState(promptStatus.newDraftState);
    const [changesInDraft,setChangesInDraft]=useRecoilState(promptStatus.changesInDraftState);
    const [clearMessage,setClearMessage]=useRecoilState(messageStatus.messageState)
    
    const handleSelectedElement=(element:any)=>{
        if(toolkit){
            setSelectedElement(element)
        }
        
    }

    const handleToolkitClick=()=>{
        setToolkit(!toolkit)
    }

    const handleNewDraftClick=()=>{
        setNewDraft(true);
        setCode("")
        setClearMessage(true);
    }

    const handleChangesInDraftClick=()=>{
        setChangesInDraft(true);
    }

    return(
        <div className="h-full">
            <div className="flex flex-row items-center">
            <div className="flex-1 flex-row text-2xl">
            <div className="flex flex-row items-center">
            Preview
            {code && !changesInDraft &&(
                <div className="flex flex-row w-full justify-center">
                    <Button color="danger" variant="bordered" onClick={handleNewDraftClick}>New Draft</Button>
                    <div className="ml-10" ><Button color="primary" size="md" variant="bordered" onClick={handleChangesInDraftClick}>Make changes in this draft</Button></div>
                </div>
            )}
            </div>
            </div>
            
            <div className="flex flex-2 mr-4 hover:cursor-pointer mb-2">
                <Button startContent={<ToolKitIcon/>}  color="primary" size="md" variant="bordered" onClick={handleToolkitClick}>ToolKit</Button>
            </div>
            </div>
            
            <div className="border flex rounded-lg h-full mr-4 hover:cursor-pointer" >
                {frontendDev?(
                    <Renderer onElementSelect={handleSelectedElement} frontendDev={frontendDev}></Renderer>
                ):(
                    <Renderer onElementSelect={handleSelectedElement}></Renderer>
                )}
            </div>
            {selectedElement && toolkit && (
                <div className="absolute bottom-4 right-0 p-4 bg-white border border-gray-300 shadow-lg mt-4 mr-4 rounded-md">
                    <h3 className="text-lg font-semibold">Element Info</h3>
                    <p><strong>Tag Name:</strong> {selectedElement.tagName}</p>
                    <p><strong>Class Name:</strong> {selectedElement.className}</p>
                    <p><strong>Inner Text:</strong> {selectedElement.innerText}</p>
                </div>
            )}
        </div>
    )
}