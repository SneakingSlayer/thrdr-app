import type {
  Awaitable,
  NextAuthOptions,
  RequestInternal,
  User,
} from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "@/prisma/utils";

import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  secret: process.env.TOKEN_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userName: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            userName: req?.body?.userName,
          },
        });
        const isValidPass = await bcrypt.compare(
          req?.body?.password,
          user?.password ?? ""
        );

        if (isValidPass && user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    /*  FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
    }), */
  ],
  callbacks: {
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id ? token.id : token.sub,
          userName: token?.userName ?? null,
          email: token?.email ?? null,
          image: token?.picture ?? null,
        },
      };
    },
    jwt: async ({ token }) => {
      const user = await prisma.user.findUnique({
        where: {
          id: token?.sub,
        },
      });
      if (!user) return token;
      return {
        ...token,
        id: user.id,
        userName: user.userName,
        email: user.email,
        image: user.image,
      };
    },
  },
  pages: {
    signIn: "/signin",
  },
};
