import { NextResponse } from "next/server";
import { prisma } from "@/prisma/utils";
export const GET = async (
  req: Response,
  { params }: { params: { userId: string } }
) => {
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        userName: params.userId,
      },
      include: {
        _count: {
          select: {
            likes: true,
            comments: true,
            creationsFor: true,
          },
        },
      },
    });
    console.log("api", getUser);
    return NextResponse.json({ data: getUser });
  } catch (error) {
    return error;
  }
};
