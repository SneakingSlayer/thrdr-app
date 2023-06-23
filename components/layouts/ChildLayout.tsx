import React from "react";

import { Container, Navbar } from "@/components";
import { Session } from "next-auth";

const ChildLayout = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  return (
    <>
      {/*  <Navbar session={session} /> */}
      {children}
    </>
  );
};

export default ChildLayout;
