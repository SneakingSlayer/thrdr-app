import React from "react";

import { ProfileDetails, ProfileForm } from "@/components";

import { getUserById } from "@/queries";

const Profile = async (params: { params: { userId: string } }) => {
  const user = await getUserById(params.params.userId);
  return (
    <>
      <ProfileDetails {...user} />
      <ProfileForm {...user} />
    </>
  );
};

export default Profile;
