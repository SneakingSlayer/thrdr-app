import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/utils";

import { verifyToken } from "@/utils";

export const POST = async (
  req: NextRequest,
  { params }: { params: { threadId: string } }
) => {
  try {
    const token = await verifyToken(req);
    if (!token.isValid) throw { ...token };
    const reqBody = await req.json();
    const getLike = await prisma.threadLikes.findFirst({
      where: {
        threadId: params.threadId,
        userId: reqBody.userId,
      },
    });
    if (getLike) throw { message: "Already upvoted" };
    const result = await prisma.threadLikes.create({
      data: {
        threadId: params.threadId,
        userId: reqBody.userId,
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
