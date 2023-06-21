import { DefaultSession } from "next-auth";

interface UserSession {
  id: string;
  userName: string;
  name: string;
  email: string;
  image: string;
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: UserSession;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: UserSession;
  }
}
