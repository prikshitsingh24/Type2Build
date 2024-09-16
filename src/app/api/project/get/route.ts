import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req:Request) {

    const { userId } = await req.json();

    if(!userId){
        return NextResponse.json({message:"Please provide owner id"})
    }

    const userWithProjects = await prisma.user.findUnique({
        where: { id: userId },
        include: { projects: true }  // Include the related projects
    });

    return NextResponse.json({projects:userWithProjects})
};
