import React from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SetDataOptions } from "@tanstack/react-query";

import { useModalState } from "@/hooks";
import { useSession } from "next-auth/react";

import type {
  InfiniteThreadData,
  Thread,
  InfiniteThreadItems,
  ThreadLike,
} from "@/types";

import { deleteLike, createLike } from "@/apiQueries";

const useLikeThreadMutation = ({
  hasLiked,
  forSingleThread,
  createdFor = "",
}: {
  hasLiked: boolean;
  forSingleThread: boolean;
  createdFor?: string; // createdFor not required for single threads, thread query is refetched
}) => {
  const { setModalId } = useModalState();
  const session = useSession();
  const handleMutation = async (params: ThreadLike) => {
    if (!session?.data) return setModalId("AUTH_GUARD_MODAL");
    return hasLiked ? await deleteLike(params) : await createLike(params);
  };

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: handleMutation,
    onSuccess: async (newLike: { data: ThreadLike }) => {
      if (forSingleThread) {
        await queryClient.fetchQuery(["thread", newLike.data.threadId]);
        return;
      }
      await queryClient.cancelQueries(["threads", createdFor]);
      const prevData: InfiniteThreadData | undefined =
        await queryClient.getQueryData(["threads", createdFor]);
      const updatedPages = prevData?.pages?.map((page) => ({
        ...page,
        data: page.data.map((thread: Thread) => {
          if (thread.id === newLike.data.threadId && hasLiked) {
            const filteredLikes = thread.likes?.filter(
              (like) =>
                like.userId !== newLike.data.userId &&
                like.threadId !== newLike.data.threadId
            );
            return {
              ...thread,
              likes: filteredLikes,
              _count: {
                ...thread._count,
                likes:
                  thread._count.likes - 1 < 0 ? 0 : thread._count.likes - 1,
              },
            };
          }
          if (thread.id === newLike.data.threadId && !hasLiked) {
            return {
              ...thread,
              likes: [...thread.likes, newLike.data],
              _count: {
                ...thread._count,
                likes: thread._count.likes + 1,
              },
            };
          }
          return thread;
        }),
      })) as InfiniteThreadItems[];
      await queryClient.fetchQuery(["profile", createdFor]);
      return queryClient.setQueryData(
        ["threads", createdFor],
        (prev: InfiniteThreadData | undefined) => {
          if (prev) {
            return {
              ...prev,
              pages: updatedPages,
            };
          }
          return prev;
        },
        newLike as SetDataOptions
      );
    },
  });

  return { mutate, isLoading };
};

export default useLikeThreadMutation;
