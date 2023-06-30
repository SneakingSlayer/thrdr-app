import React from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata = {};

const MeLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userId: string };
}) => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <title>{`${params.userId}`}</title>
      {children}
    </>
  );
};
export default MeLayout;
