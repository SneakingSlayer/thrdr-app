import React from "react";

import { ThreadDetails } from "@/components";

import { getThreadById } from "@/api";

const Thread = async (params: { params: { threadId: string } }) => {
  const result = await getThreadById(params.params.threadId);

  return <ThreadDetails {...result} />;
};

export default Thread;
