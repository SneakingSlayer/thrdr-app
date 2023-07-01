import React from "react";

import { ThreadDetails } from "@/components";

import { getThreadById } from "@/apiQueries";

import { notFound } from "next/navigation";

const Thread = async (params: { params: { threadId: string } }) => {
  const result = await getThreadById(params.params.threadId);
  if (!result) notFound();
  return <ThreadDetails {...result} />;
};

export default Thread;
