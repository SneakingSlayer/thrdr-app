import { getToken } from "next-auth/jwt";
import { TOKEN_SECRET } from "@/constants";
import { NextRequest } from "next/server";

export const verifyToken = async (req: NextRequest) => {
  const token = await getToken({ req, secret: TOKEN_SECRET });
  if (!token)
    return {
      message: "You must be logged in to do that.",
      status: 401,
      isValid: false,
      token,
    };
  return { message: "Logged in.", status: 200, isValid: true, token };
};
