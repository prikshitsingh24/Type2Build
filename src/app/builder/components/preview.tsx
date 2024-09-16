'use client'

import { Button } from "@nextui-org/button";
import { useState } from "react";
import Renderer from "./renderer";
import { ToolKitIcon } from "./toolkit";

export default function Preview(){
    const [selectedElement,setSelectedElement]=useState<any>(null);
    const [toolkit,setToolkit]=useState(false)

    const handleSelectedElement=(element:any)=>{
        if(toolkit){
            setSelectedElement(element)
        }
        
    }

    const handleToolkitClick=()=>{
        setToolkit(!toolkit)
    }

    return(
        <div className="h-full">
            <div className="flex flex-row items-center">
            <div className="flex-1 text-2xl">
            Preview
            </div>
            <div className="flex flex-2 mr-4 hover:cursor-pointer">
                <Button startContent={<ToolKitIcon/>}  color="primary" size="md" variant="bordered" onClick={handleToolkitClick}>ToolKit</Button>
            </div>
            </div>
            
            <div className="border flex rounded-lg h-full mr-4 hover:cursor-pointer" >
                <Renderer onElementSelect={handleSelectedElement}></Renderer>
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