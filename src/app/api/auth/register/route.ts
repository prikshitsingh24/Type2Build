import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req:Request) {

    const { name, email, password } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ message: 'Email and password are required.' });
    }
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password
      },
    })
    return NextResponse.json({message: 'User registered successfully!',user:user});
};


