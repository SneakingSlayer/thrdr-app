"use client";

import {
  Flex,
  HStack,
  Button,
  AvatarGroup,
  Avatar,
  VStack,
  Textarea,
  Text,
  Box,
} from "@chakra-ui/react";

import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { THREADS_API } from "@/constants";
import type { Comments, Likes } from "@/types";

import { SubmitButton } from "@/components";

import { useLikeThreadMutation, useModalState } from "@/hooks";

const ThreadActionsGroup = ({
  likes,
  userId,
  threadId,
  comments,
}: {
  likes: Likes[];
  userId: string;
  threadId: string;
  comments: Comments[];
}) => {
  const { setModalId } = useModalState();
  const session = useSession();
  const queryClient = useQueryClient();
  const hasLiked = likes?.map((like) => like.userId)?.includes(userId);
  const { mutate, isLoading } = useMutation({
    mutationFn: async (values) => {
      const res = await fetch(`${THREADS_API}/${threadId}/comments`, {
        method: "POST",
        body: JSON.stringify(values),
      });
      const result = await res.json();
      return result;
    },
    onSuccess: async (newComment: any) => {
      await queryClient.fetchQuery(["thread", threadId]);
      return queryClient.setQueryData(
        ["comments", threadId],
        (prev: any) => ({
          ...prev,
          pages: [{ data: [newComment.data], nextCursor: "" }, ...prev.pages],
        }),
        newComment
      );
    },
  });

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (values: any) => {
    if (!session?.data) return setModalId("AUTH_GUARD_MODAL");
    await mutate({ ...values, createdById: userId, threadId });
    reset();
  };

  const { mutate: likeMutation } = useLikeThreadMutation({
    forSingleThread: true,
    hasLiked,
  });

  return (
    <>
      <Box mb={5} backgroundColor={"gray.700"} px={3} borderRadius={7}>
        <Flex justifyContent={"space-between"}>
          <HStack py={3}>
            <Button
              disabled={hasLiked}
              colorScheme={hasLiked ? "blue" : "gray"}
              leftIcon={<AiOutlineHeart />}
              size={"xs"}
              onClick={async () =>
                await likeMutation({
                  userId,
                  threadId,
                })
              }
            >
              {likes?.length ?? 0} Like
            </Button>
            <Button leftIcon={<BiComment />} size={"xs"}>
              {comments?.length ?? 0} Reply
            </Button>
          </HStack>
          <HStack>
            <AvatarGroup spacing={-2.5} fontSize={"xs"} size={"xs"}>
              {comments?.map((comment, i) => (
                <Avatar
                  key={i}
                  borderColor={"whiteAlpha.400"}
                  size={"sm"}
                  name={comment?.createdBy?.name}
                  src={comment?.createdBy?.image ?? ""}
                />
              ))}
            </AvatarGroup>
          </HStack>
        </Flex>
      </Box>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <VStack alignItems={"end"}>
          <Textarea
            {...register("comment", { required: "Required" })}
            border={0}
            backgroundColor={"gray.900"}
            placeholder="Write a reply..."
            fontSize={"sm"}
          />
          <SubmitButton title="Post" isSubmitting={isLoading} />
        </VStack>
      </Box>
    </>
  );
};

export default ThreadActionsGroup;
