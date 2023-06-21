import React from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import { THREADS_API } from "@/constants";
import { Thread } from "@/types";

interface Threads {
  data: Thread[];
  nextCursor: string | undefined | null;
}

const useGetInfiniteThreads = (userId: string) => {
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isLoading,
    ...result
  } = useInfiniteQuery<Threads, Error>({
    queryKey: ["threads", userId],
    queryFn: async ({ pageParam = "" }) => {
      const result = await fetch(
        `${THREADS_API}/user/${userId}?cursor=${pageParam}&limit=10&sort=popular`,
        {
          method: "GET",
        }
      );
      return result.json();
    },
    getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
  });
  return {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isLoading,
    result,
  };
};

export default useGetInfiniteThreads;
