import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req:Request) {

    const { projectId } = await req.json();

    if(!projectId){
        return NextResponse.json({message:"Please provide owner id"})
    }

    const project = await prisma.project.findUnique({
        where: { id: projectId },
    });

    return NextResponse.json({project:project})
};
