import React from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import { THREADS_API } from "@/constants";
import { Thread } from "@/types";
import { getInfiniteThreads } from "@/api";

interface Threads {
  data: Thread[];
  nextCursor: string | undefined | null;
}

const useGetInfiniteThreads = ({
  userId,
  sort,
}: {
  userId: string;
  sort?: string;
}) => {
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isLoading,
    refetch,
    ...result
  } = useInfiniteQuery<Threads, Error>({
    queryKey: ["threads", userId],
    queryFn: async ({ pageParam = "" }) =>
      getInfiniteThreads({ pageParam, userId, sort: sort ?? "" }),
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
    refetch,
  };
};

export default useGetInfiniteThreads;
