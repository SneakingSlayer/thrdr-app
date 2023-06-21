import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/utils";

import { verifyToken } from "@/utils";

export const DELETE = async (
  req: NextRequest,
  {
    params,
  }: {
    params: { threadId: string; userId: string };
  }
) => {
  try {
    const token = await verifyToken(req);
    if (!token.isValid) throw { ...token };
    const getLike = await prisma.threadLikes.findFirst({
      where: {
        userId: params.userId,
        threadId: params.threadId,
      },
    });
    if (!getLike) throw { message: "Upvote not found" };
    const result = await prisma.threadLikes.delete({
      where: {
        id: getLike.id,
      },
    });
    return NextResponse.json({ data: result });
  } catch (error: any) {
    return NextResponse.json(
      { data: error?.message ?? "Bad request" },
      { status: error?.status ?? 400 }
    );
  }
};
