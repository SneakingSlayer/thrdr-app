import type { Comments, Likes, User } from "./users";

export interface Thread {
  id: string;
  title: string;
  description: string;
  createdForId: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  createdBy: User;
  createdFor: User;
  likes: Likes[];
  _count: {
    likes: number;
    comments: number;
  };
  comments: Comments[];
}

export interface InfiniteThreadItems {
  data: Thread[];
  nextCursor: string;
}

export interface InfiniteThreadData {
  pageParams: string[] | undefined[];
  pages: InfiniteThreadItems[];
}
