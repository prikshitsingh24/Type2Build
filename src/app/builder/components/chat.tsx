'use client';
import React, { useEffect, useState } from 'react';
import { Button, Input, Card, Textarea, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import { useRecoilState } from 'recoil';
import codeStatus from '@/app/state/codeStatus';
import promptStatus from '@/app/state/promptStatus';
import messageStatus from '@/app/state/messageStatus';
import selectedElementsState from '@/app/state/selectedElementsState';
import crossLogoRed from "../../images/crossLogoRed.png"
import Image from "next/image";

export default function Chat ({id,previousChat,frontendDev}:any) {
  const [message, setMessage] = useState('');
  const [code,setCode]=useRecoilState(codeStatus.frontendCodeState)
  const [loading,setLoading]=useState(false)
  const [messages, setMessages] = useState<string[]>([]); 
  const [newDraft,setNewDraft]=useRecoilState(promptStatus.newDraftState);
  const [changesInDraft,setChangesInDraft]=useRecoilState(promptStatus.changesInDraftState);
  const [clearMessage,setClearMessage]=useRecoilState(messageStatus.messageState)
  const [selectedElement,setSelectedElement]=useRecoilState(selectedElementsState.selectedElementState);
  const [toolkit,setToolkit]=useRecoilState(selectedElementsState.toolkitStatus)
  const [overlayStyles, setOverlayStyles] = useRecoilState(selectedElementsState.overlayStatus)

  const newDraftPrompt=async ()=>{
    setLoading(true)
    if(message == " "){
      return
    }
      try{
        const response=await fetch("/api/model/ask",{
          method:"POST",
          body: JSON.stringify({prompt:message, projectId: id })
        })
        const data = await response.json()
        console.log(data)
        setCode(data.output)
        setMessages((prevMessages) => [
          ...prevMessages,
          message
        ]);
        setMessage('');
      }catch(err){
        return err
      }finally{
        setLoading(false)
      }
  }


  useEffect(()=>{
    if(clearMessage){
      setMessages([])
      setMessage("")
      setClearMessage(false);
    }
  },[clearMessage])

  const changesInDraftPrompt=async ()=>{
      let prompt;
      setLoading(true);
  
      if (message.trim() === "") {
          return;
      }
  
      // Include selected elements if there are any
      if (selectedElement.length > 0) {
          prompt = `${message} \n` + selectedElement
              .map((el: any, index: number) => `Element ${index + 1}: ${el.innerText} ${el.tagName} ${el.className}`)
              .join("\n");
          console.log(prompt)
      } else {
          prompt = message;
      }
  
      try {
          const response = await fetch("/api/model/modify", {
              method: "POST",
              body: JSON.stringify({
                  prompt,
                  code: code || frontendDev, // send either the existing code or frontendDev as the fallback
                  projectId: id,
              }),
          });
  
          if (response.ok) {
              const data = await response.json();
              console.log(data);
              setCode(data.output);
              setMessages((prevMessages) => [
                  ...prevMessages,
                  message,
              ]);
              setMessage('');
              setSelectedElement([])
          }
      } catch (err) {
          console.error(err);
      } finally {
          setLoading(false);
      }
  };



  const handleSend = async () => {
    if(newDraft && previousChat.length==0){
      newDraftPrompt();
    }
    else if(changesInDraft || previousChat.length!=0){
      changesInDraftPrompt();
    }
      
  };
  useEffect(()=>{
    if(previousChat){
      setMessages(previousChat)
    }
  },[])
  
  const handleRemoveClick = (index: number) => {
    setOverlayStyles((prevElements:any) => {
      return prevElements.filter((_: any, i: number) => i !== index);
    });
    setSelectedElement((prevElements:any) => {
      return prevElements.filter((_: any, i: number) => i !== index);
    });
  };

  return (
    <Card className="h-full flex flex-col bg-[#1e1e1e] rounded-[12px] border border-[#333]"> {/* Adjust border-radius */}
      <CardHeader className="bg-[#333] text-[#f0f0f0] border-b border-[#444] py-2 px-4 rounded-t-[12px]"> {/* Smooth top corners */}
        <div className="text-lg font-semibold">Chat</div>
      </CardHeader>
      <CardBody className="h-10 p-2 bg-[#1e1e1e]">
        <div className="flex flex-col space-y-2 ">
        <div className="mt-2 text-sm text-[#ccc]">
          {messages.map((msg, index) => (
            <div className='bg-blue-700 rounded-lg p-2 mb-5' key={index}>{msg}</div>
          ))}
        </div>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col items-center p-2 rounded-b-[12px]"> {/* Smooth bottom corners */}
      {selectedElement.length > 0 && toolkit && (
        <div className="flex flex-row absolute bottom-40 left-0 right-0 w-full">
          <div className="bg-black flex flex-row bg-opacity-50 w-full overflow-x-scroll backdrop-blur-md shadow-lg mt-4 rounded-md p-4">
            {selectedElement.map((element: any, index: any) => (
             <div className='relative'>
              <div onClick={() => handleRemoveClick(index)}><Image src={crossLogoRed} alt="cross" className="w-4 absolute z-99 right-3 top-2"></Image></div>
               <div key={index} className='bg-white border border-gray-300 shadow-lg mt-2 rounded-md p-2 mr-2 pt-3'>
                <strong>Element {index + 1}</strong>
              </div>
             </div>
            ))}
          </div>
        </div>
        )}
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={1}
          placeholder="Type a message..."
        />
        <div className='mt-5'>
        <Button
          onClick={handleSend}
          color="primary" size="lg" variant="bordered"
          isLoading={loading}
        >
          Send
        </Button>
        </div>
     
      </CardFooter>
    </Card>
  );
};

