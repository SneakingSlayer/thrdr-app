import { THREADS_API, LIKES_API } from "@/constants";

export interface ThreadCreate {
  description: string;
  createdById: string;
}

export interface ThreadLike {
  threadId?: string;
  userId?: string;
  likeId?: string;
}

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

export const getThreadById = async (threadId: string) => {
  const res = await fetch(`${THREADS_API}/${threadId}`, {
    method: "GET",
    cache: "no-cache",
  });
  const result = await res.json();
  return result;
};
