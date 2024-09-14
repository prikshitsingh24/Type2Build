import { PrismaClient } from '@prisma/client';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"

const prisma = new PrismaClient();

interface User {
  name: string;
  password:string,
  email: string;
}


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: 'Name', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
        email : {label:"Email",type:'text'}
      },
      async authorize(credentials,req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
      
        // Query the user from the database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
      
        // Verify the user's credentials
        if (user && user.password === credentials.password) {
          // Return user object if authentication is successful
          return {
            name: user.name,
            email: user.email,
          } as User;
        }
      
        return null; // Return null if authentication fails
      }
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user: { ...session.user, id: user?.id },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
