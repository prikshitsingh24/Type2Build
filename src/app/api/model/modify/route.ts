import { GoogleGenerativeAI, GoogleGenerativeAIResponseError } from "@google/generative-ai";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


export async function POST(req:Request) {

    const { prompt, code } = await req.json();
    if (!process.env.MODEL_API) {
            return NextResponse.json({message:"Model api not provided"})
        } else {
            const genAI = new GoogleGenerativeAI(process.env.MODEL_API);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
            const msg = `1. You are a website frontend builder give me the html and inline css code like style=" "
                         2. This is my code: ${code}
                         3. keep the code as it is and only make changes to the provided block which are : ${prompt}
                        `;
            try{
                let text=" "
                const result = await model.generateContentStream(msg);
                for await (const chunk of result.stream) {
                    const chunkText = chunk.text();
                    console.log(chunkText);
                    text+=chunkText;
                }
                return NextResponse.json({output:text})

            }catch(error){
                if (error instanceof GoogleGenerativeAIResponseError) {
                    console.error('Google Generative AI Error:', error.message);
                    return NextResponse.json({ message: 'Failed to generate due to safety concerns' });
                  } else {
                    console.error('Unexpected Error:', error);
                    return NextResponse.json({ message: 'An unexpected error occurred' });
                  }
            }
            
                    
    
            
        }
    
};