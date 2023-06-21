import "./globals.css";

// Components
import { ParentLayout } from "@/components";

export const metadata = {
  title: "thrdr.",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ParentLayout>{children}</ParentLayout>;
}
