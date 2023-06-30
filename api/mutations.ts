import { THREADS_API, LIKES_API, USERS_API } from "@/constants";

import type { ThreadCreate, ThreadLike } from "@/types";

export const createThread = async (
  newThread: ThreadCreate,
  createdForId: string,
  createdById: string
) => {
  const res = await fetch(`${THREADS_API}/user/${createdForId}`, {
    method: "POST",
    body: JSON.stringify({
      title: "test title",
      ...newThread,
      createdById,
    }),
  });
  const parsed = await res.json();
  return parsed;
};

export const createLike = async (newLike: ThreadLike) => {
  const res = await fetch(`${THREADS_API}/${newLike.threadId}/${LIKES_API}`, {
    method: "POST",
    body: JSON.stringify({ userId: newLike.userId }),
  });
  const result = await res.json();
  return result;
};

export const deleteLike = async (like: ThreadLike) => {
  const res = await fetch(
    `${THREADS_API}/${like.threadId}/${LIKES_API}/${like.userId}`,
    {
      method: "DELETE",
    }
  );
  const result = await res.json();
  return result;
};

export const getUserById = async (params: string) => {
  try {
    const res = await fetch(`${USERS_API}/${params}`, {
      method: "GET",
      cache: "no-cache",
    });
    const result = await res.json();
    return result?.data;
  } catch (error) {
    return null;
  }
};

export const createComment = async ({
  pageParam = "",
  threadId,
}: {
  pageParam: string;
  threadId: string;
}) => {
  const res = await fetch(
    `${THREADS_API}/${threadId}/comments?cursor=${pageParam}&limit=10`,
    {
      method: "GET",
    }
  );
  const result = await res.json();
  return result;
};
