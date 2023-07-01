"use client";

import React from "react";

import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import type { Thread } from "@/types";
import moment from "moment";

import { CommentsSection, ThreadActions } from "@/components";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getThreadById } from "@/apiQueries";

import Link from "next/link";
import { useGetProfilePic } from "@/hooks";

const ThreadDetails = (props: { data: Thread }) => {
  const session = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["thread", props.data.id],
    initialData: props,
    queryFn: async () => await getThreadById(props.data.id),
    enabled: !props?.data,
  });

  const { getImageUri } = useGetProfilePic({});

  return (
    <Box>
      <HStack mb={3}>
        <Avatar
          bg={"brand.200"}
          size={"sm"}
          src={getImageUri(data?.data?.createdBy?.userName)}
          name={data?.data?.createdBy?.name}
        />
        <Box>
          <Text fontSize={"xs"} color={"Highlight"} fontWeight={"700"}>
            <Link href={`/u/${data?.data?.createdBy?.userName}`}>
              {data?.data?.createdBy?.userName}
            </Link>{" "}
            <Text as="span" color={"gray.500"} fontWeight={"normal"}>
              to
            </Text>{" "}
            <Link href={`/u/${data?.data?.createdFor?.userName}`}>
              {data?.data?.createdFor?.userName}
            </Link>
          </Text>
          <Text color={"gray.500"} fontSize={"xs"}>
            {moment(data?.data?.createdAt).fromNow()}
          </Text>
        </Box>
      </HStack>
      <Text mb={5}>{data?.data?.description}</Text>
      <ThreadActions
        threadId={data?.data?.id}
        userId={session?.data?.user?.id ?? ""}
        likes={data?.data?.likes}
        comments={data?.data?.comments}
      />
      <CommentsSection threadId={data?.data?.id} />
    </Box>
  );
};

export default ThreadDetails;
