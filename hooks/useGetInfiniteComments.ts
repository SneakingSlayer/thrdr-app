import React from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import { THREADS_API } from "@/constants";

const useGetInfiniteComments = ({ threadId }: { threadId: string }) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["comments", threadId],
      queryFn: async ({ pageParam = "" }) => {
        const res = await fetch(
          `${THREADS_API}/${threadId}/comments?cursor=${pageParam}&limit=10`,
          {
            method: "GET",
          }
        );
        const result = await res.json();
        return result;
      },
      getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
    });
  return { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage };
};
export default useGetInfiniteComments;
