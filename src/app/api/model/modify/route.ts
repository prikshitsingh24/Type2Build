import { GoogleGenerativeAI, GoogleGenerativeAIResponseError } from "@google/generative-ai";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req:Request) {

    const { prompt, code,projectId } = await req.json();
    if (!process.env.MODEL_API) {
            return NextResponse.json({message:"Model api not provided"})
        } else {
            const genAI = new GoogleGenerativeAI(process.env.MODEL_API);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
            const msg = `1. You are a website frontend builder give me the html and inline css code like style=" "
                         2. Just provide the code no extra information
                         3. dont change the original code
                         3. This is my code: ${code}
                         4. make changes only here : ${prompt}
                        `;
            try{
                let text=" "
                const result = await model.generateContentStream(msg);
                for await (const chunk of result.stream) {
                    const chunkText = chunk.text();
                    console.log(chunkText);
                    text+=chunkText;
                }
                const project = await prisma.project.findUnique({
                    where: { id: projectId },
                    select: { chat: true }, // Get the current chat messages
                  });
                
                  if (!project) {
                    throw new Error("Project not found");
                  }
                
                  const updatedChat = [...project.chat, prompt]; // Append new chat message
                
                  const updatedProject = await prisma.project.update({
                    where: { id: projectId },
                    data: {
                      frontendDev: text,
                      chat: updatedChat, // Update the chat array
                    },
                  });
                return NextResponse.json({output:text})

            }catch(error){
                if (error instanceof GoogleGenerativeAIResponseError) {
                    console.error('Google Generative AI Error:', error.message);
                    return NextResponse.json({ message: 'Failed to generate due to safety concerns' });
                  } else {
                    console.error('Unexpected Error:', error);
                    return NextResponse.error()
                  }
            }
            
                    
    
            
        }
    
};