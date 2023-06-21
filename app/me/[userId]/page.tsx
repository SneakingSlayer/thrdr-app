import React from "react";

import { ProfileSection } from "@/components";

import { getUserById } from "@/queries";

const Profile = async (params: { params: { userId: string } }) => {
  const user = await getUserById(params.params.userId);
  return <ProfileSection {...user} />;
};

export default Profile;
