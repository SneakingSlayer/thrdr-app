"use client";

import React, { useContext } from "react";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Switch,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import { SubmitButton } from "../button";

import { useForm } from "react-hook-form";
import { THREADS_API } from "@/constants";

import { useSession } from "next-auth/react";

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { InfiniteThreadData, Thread } from "@/types";

import { createThread } from "@/queries";
import { useModalState } from "@/hooks";

interface ThreadFormProps {
  name: string;
  userId: string;
}

interface ThreadMutation {
  description: string;
  createdById: string;
}

const ThreadForm = ({ name, userId }: ThreadFormProps) => {
  const queryClient = useQueryClient();
  const session = useSession();
  const { setModalId } = useModalState();
  const { mutate, isLoading } = useMutation({
    mutationFn: (newThread: ThreadMutation) =>
      createThread(newThread, userId, session?.data?.user?.id ?? ""),
    onSuccess: async (newPost) => {
      await queryClient.fetchQuery(["profile", userId]);
      return queryClient.setQueryData(
        ["threads", userId],
        (prev: InfiniteThreadData | undefined) => {
          if (prev) {
            return {
              ...prev,
              pages: [{ data: [newPost.data], nextCursor: "" }, ...prev.pages],
            };
          }
          return prev;
        },
        newPost
      );
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (values: any) => {
    if (!session?.data) return setModalId("AUTH_GUARD_MODAL");
    await mutate(values);
    reset();
  };

  return (
    <Box mb={8} as="form" onSubmit={handleSubmit(onSubmit)}>
      <VStack>
        <FormControl isInvalid={Boolean(errors?.description)}>
          <Textarea
            {...register("description", {
              minLength: {
                value: 10,
                message: "Must be atleast 10 characters",
              },
              required: "Must be atleast 10 characters",
            })}
            background={"gray.900"}
            border={0}
            placeholder={`Say something to ${name}...`}
            rows={3}
            fontSize={"sm"}
          />
          <FormErrorMessage>
            {errors?.description && errors?.description?.message?.toString()}
          </FormErrorMessage>
        </FormControl>
        <Flex justifyContent={"space-between"} w={"100%"} alignItems={"center"}>
          <HStack>
            <Switch />
            <Text fontSize={"xs"} color={"gray.600"}>
              Anonymous?
            </Text>
          </HStack>

          <SubmitButton title="Post" isSubmitting={isLoading} />
        </Flex>
      </VStack>
    </Box>
  );
};

export default ThreadForm;
