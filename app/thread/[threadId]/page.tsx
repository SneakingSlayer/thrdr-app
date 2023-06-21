import React from "react";

import { prisma } from "@/prisma/utils";
import { ThreadDetails } from "@/components";

import { getThreadById } from "@/queries";

const Thread = async (params: { params: { threadId: string } }) => {
  const result = await getThreadById(params.params.threadId);

  return <ThreadDetails {...result} />;
};

export default Thread;
