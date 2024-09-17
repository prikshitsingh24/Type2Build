'use client';
import React, { useEffect, useState } from 'react';
import { Button, Input, Card, Textarea, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import { useRecoilState } from 'recoil';
import codeStatus from '@/app/state/codeStatus';
import promptStatus from '@/app/state/promptStatus';
import messageStatus from '@/app/state/messageStatus';

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [code,setCode]=useRecoilState(codeStatus.frontendCodeState)
  const [loading,setLoading]=useState(false)
  const [messages, setMessages] = useState<string[]>([]); 
  const [newDraft,setNewDraft]=useRecoilState(promptStatus.newDraftState);
  const [changesInDraft,setChangesInDraft]=useRecoilState(promptStatus.changesInDraftState);
  const [clearMessage,setClearMessage]=useRecoilState(messageStatus.messageState)

  const newDraftPrompt=async ()=>{
    setLoading(true)
    if(message == " "){
      return
    }
      try{
        const response=await fetch("/api/model/ask",{
          method:"POST",
          body: JSON.stringify({prompt:message})
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
    setLoading(true)
    if(message == " "){
      return
    }
      try{
        const response=await fetch("/api/model/modify",{
          method:"POST",
          body: JSON.stringify({prompt:message,code})
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



  const handleSend = async () => {
    if(newDraft){
      newDraftPrompt();
    }
    else if(changesInDraft){
      changesInDraftPrompt();
    }
      
  };

  return (
    <Card className="h-full flex flex-col bg-[#1e1e1e] rounded-[12px] border border-[#333]"> {/* Adjust border-radius */}
      <CardHeader className="bg-[#333] text-[#f0f0f0] border-b border-[#444] py-2 px-4 rounded-t-[12px]"> {/* Smooth top corners */}
        <div className="text-lg font-semibold">Chat</div>
      </CardHeader>
      <CardBody className="flex-1 overflow-y-auto p-2 bg-[#1e1e1e]">
        <div className="flex flex-col space-y-2 overflow-y-scroll h-full">
        <div className="mt-2 text-sm text-[#ccc]">
          {messages.map((msg, index) => (
            <div className='bg-blue-700 rounded-lg p-2 mb-5' key={index}>{msg}</div>
          ))}
        </div>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col items-center p-2 rounded-b-[12px]"> {/* Smooth bottom corners */}
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

export default Chat;
