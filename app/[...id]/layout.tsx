import React from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata = {};

const ProfileLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <title>{`${params.id}`}</title>
      {children}
    </>
  );
};

export default ProfileLayout;
