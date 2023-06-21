"use client";

import React from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { THREADS_API } from "@/constants";
import { Box, Flex, Spinner, Stack } from "@chakra-ui/react";
import CommentCard from "./CommentCard";
import type { Comments } from "@/types";
import { useInView } from "react-intersection-observer";

import { useGetInfiniteComments } from "@/hooks";

const CommentsSection = ({ threadId }: { threadId: string }) => {
  const { ref, inView } = useInView();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetInfiniteComments({ threadId });

  React.useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <Box>
      <Stack spacing={6}>
        {isLoading && (
          <Flex justifyContent={"center"} py={5}>
            <Spinner />
          </Flex>
        )}
        {!isLoading &&
          data?.pages?.map((page) =>
            page?.data?.map((comment: Comments, i: number) => (
              <CommentCard key={i} comment={comment} />
            ))
          )}
        <Box ref={ref} />
      </Stack>
      {isFetchingNextPage && (
        <Flex justifyContent={"center"} py={5}>
          <Spinner />
        </Flex>
      )}
    </Box>
  );
};

export default CommentsSection;
