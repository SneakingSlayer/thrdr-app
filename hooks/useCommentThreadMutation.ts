import React from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@chakra-ui/react";
import { THREADS_API } from "@/constants";

const useCommentThreadMutation = (threadId: string) => {
  const toast = useToast();
  const queryClient = useQueryClient();
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
  return { mutate, isLoading };
};

export default useCommentThreadMutation;
