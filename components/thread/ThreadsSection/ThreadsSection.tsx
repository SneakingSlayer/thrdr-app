"use client";

import React, { useContext } from "react";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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

const ThreadsSection = ({ userId }: { userId: string }) => {
  const [sort, setSort] = React.useState("popular");

  const session = useSession();
  const { ref, inView } = useInView();

  const { result, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useGetInfiniteThreads({ userId, sort });

  React.useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, inView]);

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
        {!isLoading && (
          <Tabs defaultIndex={sort === "popular" ? 0 : 1} variant={"unstyled"}>
            <TabList>
              <Tab
                _selected={{ color: "blue.200" }}
                color={"gray.500"}
                fontSize={"xs"}
                fontWeight={"bold"}
                onClick={() => setSort("popular")}
              >
                Popular
              </Tab>
              <Tab
                color={"gray.500"}
                _selected={{ color: "blue.200" }}
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
              bg="blue.300"
              borderRadius="1px"
            />
          </Tabs>
        )}
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
