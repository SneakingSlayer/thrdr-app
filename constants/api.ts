export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.BASE_URL;
export const SIGN_UP_API = `/api/auth/signup`;
export const THREADS_API = `/api/threads`;
export const LIKES_API = `/api/likes`;
export const USERS_API = `/api/users`;
