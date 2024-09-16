import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req:Request) {

    const { projectName, projectDescription, ownerId } = await req.json();

    if(!projectName){
        return NextResponse.json({ message: 'Please provide project name' });
    }

    const project = await prisma.project.create({
        data:{
            projectName:projectName,
            frontend:"",
            Backend:"",
            owner: {
                connect: { id: ownerId } // Connect to an existing user
            },
            projectDescription:projectDescription?projectDescription:" "
        }
    })

    return NextResponse.json({message:"project created successfully",project:project})
};
