"use client";

import {
  Flex,
  HStack,
  Button,
  AvatarGroup,
  Avatar,
  VStack,
  Textarea,
  Spinner,
  Box,
  useToast,
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

import {
  useGetProfilePic,
  useLikeThreadMutation,
  useModalState,
} from "@/hooks";

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
  const toast = useToast();
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
      toast({
        title: "Comment successfully posted.",
        status: "success",
        duration: 4000,
        isClosable: false,
        variant: "left-accent",
        position: "bottom",
        size: "xs",
        colorScheme: "brand",
      });
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

  const { mutate: likeMutation, isLoading: isLiking } = useLikeThreadMutation({
    forSingleThread: true,
    hasLiked,
  });

  const { getImageUri } = useGetProfilePic({});

  return (
    <>
      <Box mb={5} backgroundColor={"gray.700"} px={3} borderRadius={7}>
        <Flex justifyContent={"space-between"}>
          <HStack py={3}>
            <Button
              disabled={hasLiked}
              bg={hasLiked ? "brand.500" : "whiteAlpha.200"}
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
            {isLiking && <Spinner size={"xs"} />}
          </HStack>
          <HStack>
            <AvatarGroup spacing={-2.5} fontSize={"xs"} size={"xs"}>
              {comments?.map((comment, i) => (
                <Avatar
                  key={i}
                  borderColor={"gray.700"}
                  size={"sm"}
                  bg={"brand.200"}
                  name={comment?.createdBy?.name}
                  src={getImageUri(comment?.createdBy?.userName)}
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
            placeholder="Write a reply..."
            variant={"filled"}
          />
          <SubmitButton title="Post" isSubmitting={isLoading} />
        </VStack>
      </Box>
    </>
  );
};

export default ThreadActionsGroup;
