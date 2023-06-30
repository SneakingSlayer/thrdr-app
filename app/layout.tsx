import { getServerSession } from "next-auth";
import "./globals.css";

// Components
import { ParentLayout } from "@/components";
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: "thrdr.",
  description:
    "Create an account or sign in to thrdr. Bump friends & discuss interesting topics.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return <ParentLayout session={session}>{children}</ParentLayout>;
}
