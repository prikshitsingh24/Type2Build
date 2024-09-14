import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req:Request) {

    const { name, email, password } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ message: 'Email and password are required.' });
    }

    return NextResponse.json({message: 'User registered successfully!' });
};


