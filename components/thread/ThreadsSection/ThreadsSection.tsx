"use client";

import React, { useContext } from "react";

import {
  Box,
  Flex,
  Icon,
  Spinner,
  Tab,
  TabIndicator,
  TabList,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useInView } from "react-intersection-observer";

import { useGetInfiniteThreads, useModalState } from "@/hooks";

import { useSession } from "next-auth/react";
import ThreadCard from "./ThreadCard";

import { EmptyList } from "@/components";

const ThreadsSection = ({ userId }: { userId: string }) => {
  const [sort, setSort] = React.useState("popular");

  const session = useSession();
  const { ref, inView } = useInView();

  const {
    result,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteThreads({ userId, sort });

  React.useEffect(() => {
    refetch();
  }, [sort, refetch]);

  React.useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, inView]);

  const allThreadsLength = React.useMemo(
    () =>
      result?.data?.pages
        ?.map((page) => page.data)
        ?.reduce((prev, curr) => prev.concat(curr))?.length ?? 0,
    [result?.data?.pages]
  );
  return (
    <Box>
      <Flex
        mb={6}
        w={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text as="h1" fontWeight={"bold"}>
          Threads
        </Text>
        <Tabs
          position={"relative"}
          defaultIndex={sort === "popular" ? 0 : 1}
          variant={"unstyled"}
        >
          <TabList>
            <Tab
              _selected={{ color: "brand.400" }}
              color={"gray.500"}
              fontSize={"xs"}
              fontWeight={"bold"}
              onClick={() => setSort("popular")}
            >
              Popular
            </Tab>
            <Tab
              color={"gray.500"}
              _selected={{ color: "brand.400" }}
              fontSize={"xs"}
              fontWeight={"bold"}
              onClick={() => setSort("new")}
            >
              New
            </Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="brand.400"
            borderRadius="1px"
            position={"absolute"}
          />
        </Tabs>
      </Flex>
      {isLoading && (
        <Flex justifyContent={"center"} py={5}>
          <Spinner />
        </Flex>
      )}
      <VStack>
        {result?.data?.pages?.map((page) =>
          page?.data?.map((thread, i) => (
            <ThreadCard
              key={i}
              thread={thread}
              userId={session?.data?.user?.id ?? ""}
            />
          ))
        )}
        {!isLoading && allThreadsLength < 1 && <EmptyList />}
        <Box ref={ref} />
      </VStack>
      {isFetchingNextPage && (
        <Flex justifyContent={"center"} py={5}>
          <Spinner />
        </Flex>
      )}
    </Box>
  );
};

export default ThreadsSection;
