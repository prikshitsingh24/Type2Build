'use client';
import React, { useState } from 'react';
import { Button, Input, Card, Textarea, CardHeader, CardBody, CardFooter } from '@nextui-org/react';

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  return (
    <Card className="h-[500px] w-[400px] flex flex-col bg-[#1e1e1e] rounded-[12px] border border-[#333]"> {/* Adjust border-radius */}
      <CardHeader className="bg-[#333] text-[#f0f0f0] border-b border-[#444] py-2 px-4 rounded-t-[12px]"> {/* Smooth top corners */}
        <div className="text-lg font-semibold">Chat</div>
      </CardHeader>
      <CardBody className="flex-1 overflow-y-auto p-2 bg-[#1e1e1e]">
        <div className="flex flex-col space-y-2">
          {messages.map((msg, index) => (
            <Card key={index} className="p-2 rounded-lg bg-[#333]">
              <div className="text-[#f0f0f0]">{msg}</div>
            </Card>
          ))}
        </div>
      </CardBody>
      <CardFooter className="flex items-center p-2 rounded-b-[12px]"> {/* Smooth bottom corners */}
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={1}
          className="flex-1 mr-2 text-[#f0f0f0] w-[300px] h-[40px]"
          placeholder="Type a message..."
        />
        <Button
          onClick={handleSend}
          className="bg-[#0070f3] text-white hover:bg-[#005bb5] items-end"
        >
          Send
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Chat;
