'use client'

import codeStatus from "@/app/state/codeStatus";
import messageStatus from "@/app/state/messageStatus";
import promptStatus from "@/app/state/promptStatus";
import selectedElementsState from "@/app/state/selectedElementsState";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { useRecoilState } from "recoil";
import Renderer from "./renderer";
import { ToolKitIcon } from "./toolkit";

export default function Preview({frontendDev}: any=""){
    const [selectedElement,setSelectedElement]=useRecoilState(selectedElementsState.selectedElementState);
    const [toolkit,setToolkit]=useRecoilState(selectedElementsState.toolkitStatus)
    const [code,setCode]=useRecoilState(codeStatus.frontendCodeState);
    const [newDraft,setNewDraft]=useRecoilState(promptStatus.newDraftState);
    const [changesInDraft,setChangesInDraft]=useRecoilState(promptStatus.changesInDraftState);
    const [clearMessage,setClearMessage]=useRecoilState(messageStatus.messageState)
    const [overlayStyles, setOverlayStyles] = useRecoilState(selectedElementsState.overlayStatus)

    const handleSelectedElement = (element: any) => {
        if (toolkit) {
            setSelectedElement((prevElements: any) => {
                const elementExists = prevElements.some((el: any) => el.innerText === element.innerText);
    
                if (elementExists) {
                    // If the element exists, remove it and remove its overlay style
                    
                    return prevElements.filter((el: any) => el.innerText !== element.innerText);
                } else {
            
    
                    return [...prevElements, element];
                }
            });
            setOverlayStyles((prevElements:any)=>{
                const elementExists = prevElements.some((el: any) => el.innerText === element.innerText);
    
                if (elementExists) {
                    // If the element exists, remove it and remove its overlay style
                    setOverlayStyles((prevOverlayStyles: any) =>
                        prevOverlayStyles.filter((style: any) => style.element.innerText !== element.innerText)
                    );
                    return prevElements.filter((el: any) => el.innerText !== element.innerText);
                } else {
                    // If the element doesn't exist, add it to the list and add the overlay
                    const rect = element.getBoundingClientRect();
                    const newOverlayStyle: React.CSSProperties = {
                        position: 'fixed',
                        top: `${rect.top + window.scrollY}px`,
                        left: `${rect.left + window.scrollX}px`,
                        width: `${rect.width}px`,
                        height: `${rect.height}px`,
                        backgroundColor: 'rgba(0, 128, 255, 0.2)', // Light blue background with transparency
                        border: '2px solid rgba(0, 128, 255, 0.8)', // Solid blue border to indicate selection
                        backdropFilter: 'blur(2px)', // Apply a blur effect
                        boxShadow: '0 0 15px rgba(0, 128, 255, 0.5)', // Add a glowing effect
                        pointerEvents: 'none', // Disable pointer events on overlay
                        zIndex: 9999, // Ensure it's above other elements
                        borderRadius: '8px', // Optionally round corners
                        
                    };
                    return [...prevElements, { element, style: newOverlayStyle }]
    
                }
            })
        }
    };
    

    const handleToolkitClick=()=>{
        setToolkit(!toolkit)
    }

    const handleNewDraftClick=()=>{
        setNewDraft(true);
        setCode("")
        setClearMessage(true);
    }

    const handleChangesInDraftClick=()=>{
        setNewDraft(false);
        setChangesInDraft(true);
    }

    return(
        <div className="h-full">
            <div className="flex flex-row items-center">
            <div className="flex-1 flex-row text-2xl">
            <div className="flex flex-row items-center">
            Preview
            {code && !changesInDraft && !frontendDev &&(
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
               {overlayStyles.map((overlay:any, index:number) => (
                <div key={index} style={overlay.style} />
            ))}
            </div>
        </div>
    )
}