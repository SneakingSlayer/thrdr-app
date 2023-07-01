"use client";

import React from "react";

import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";

import { SubmitButton } from "../button";

import { useForm } from "react-hook-form";

import { useSession } from "next-auth/react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InfiniteThreadData } from "@/types";

import { createThread } from "@/apiQueries";
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
  const toast = useToast();
  const queryClient = useQueryClient();
  const session = useSession();
  const { setModalId } = useModalState();
  const { mutate, isLoading } = useMutation({
    mutationFn: (newThread: ThreadMutation) =>
      createThread(newThread, userId, session?.data?.user?.id ?? ""),
    onSuccess: async (newPost) => {
      await queryClient.fetchQuery(["profile", userId]);
      toast({
        title: "Thread successfully posted.",
        status: "success",
        duration: 4000,
        isClosable: false,
        variant: "left-accent",
        position: "bottom",
        size: "xs",
        colorScheme: "brand",
      });
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
            placeholder={`Say something to ${name}...`}
            rows={3}
            variant={"filled"}
          />
          <FormErrorMessage>
            {errors?.description && errors?.description?.message?.toString()}
          </FormErrorMessage>
        </FormControl>
        <Flex justifyContent={"space-between"} w={"100%"} alignItems={"center"}>
          <HStack>
            {/*  <Switch /> */}
            <Text fontSize={"xs"} color={"gray.600"}>
              Anonymous feature coming soon!
            </Text>
          </HStack>

          <SubmitButton title="Post" isSubmitting={isLoading} />
        </Flex>
      </VStack>
    </Box>
  );
};

export default ThreadForm;
