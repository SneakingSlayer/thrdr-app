import { StringMappingType } from "typescript";

export interface User {
  id: string;
  email: string;
  emailVerified: boolean | null;
  name: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  _count?: {
    likes: number;
    comments: number;
    creationsFor: number;
  };
}

export interface Likes {
  id: string;
  createdAt: string;
  threadId: string;
  updatedAt: string;
  userId: string;
  user: User;
}

export interface Comments {
  comment: string;
  createdAt: string;
  createdBy: User;
  createdById: string;
  id: string;
  threadId: string;
  updatedAt: string;
}
