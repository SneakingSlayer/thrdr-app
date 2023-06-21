import { BASE_URL, USERS_API } from "@/constants";

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
