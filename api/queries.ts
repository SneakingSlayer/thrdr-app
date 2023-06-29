import { THREADS_API, LIKES_API } from "@/constants";

export const getThreadById = async (threadId: string) => {
  const res = await fetch(`${THREADS_API}/${threadId}`, {
    method: "GET",
    cache: "no-cache",
  });
  const result = await res.json();
  return result;
};
