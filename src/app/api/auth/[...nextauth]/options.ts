import { PrismaClient } from '@prisma/client';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"

const prisma = new PrismaClient();


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        id: {label:'Id', type:'number'},
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
            id: user.id,
            name: user.name,
            email: user.email,
          };
        }
      
        return null; // Return null if authentication fails
      }
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: { ...session.user, id:token.id as string },
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
