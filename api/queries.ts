import { THREADS_API, LIKES_API } from "@/constants";

export const getThreadById = async (threadId: string) => {
  const res = await fetch(`${THREADS_API}/${threadId}`, {
    method: "GET",
    cache: "no-cache",
  });
  const result = await res.json();
  return result;
};

export const getInfiniteThreads = async ({
  pageParam = "",
  userId,
  sort,
}: {
  pageParam: string;
  userId: string;
  sort: string;
}) => {
  const result = await fetch(
    `${THREADS_API}/user/${userId}?cursor=${pageParam}&limit=10&sort=${sort}`,
    {
      method: "GET",
    }
  );
  return result.json();
};
