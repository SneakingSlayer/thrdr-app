"use client";

import React from "react";

import { Box, Flex, Spinner, Stack } from "@chakra-ui/react";
import CommentCard from "./CommentCard";
import type { Comments } from "@/types";
import { useInView } from "react-intersection-observer";

import { EmptyList } from "@/components";

import { useGetInfiniteComments } from "@/hooks";

const CommentsSection = ({ threadId }: { threadId: string }) => {
  const { ref, inView } = useInView();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetInfiniteComments({ threadId });

  React.useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, inView]);

  const allCommentsLength = React.useMemo(
    () =>
      data?.pages
        ?.map((page) => page.data)
        ?.reduce((prev, curr) => prev.concat(curr))?.length ?? 0,
    [data?.pages]
  );

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
        {!isLoading && allCommentsLength < 1 && (
          <Flex justifyContent={"center"} alignItems={"center"} py={10}>
            <EmptyList />
          </Flex>
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
