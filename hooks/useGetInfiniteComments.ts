import React from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import { THREADS_API } from "@/constants";
import { createComment } from "@/apiQueries";

const useGetInfiniteComments = ({ threadId }: { threadId: string }) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["comments", threadId],
      queryFn: ({ pageParam = "" }) => createComment({ pageParam, threadId }),
      getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
    });
  return { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage };
};
export default useGetInfiniteComments;
