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

    const result = await prisma.threadComments.create({
      data: { ...reqBody },
      include: {
        createdBy: true,
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

export const GET = async (
  req: NextRequest,
  { params }: { params: { threadId: string; cursor: string } }
) => {
  try {
    const cursor = (req.nextUrl.searchParams.get("cursor") ?? 1) as string;
    const limit = (req.nextUrl.searchParams.get("limit") ?? 10) as string;
    const result = await prisma.threadComments.findMany({
      take: parseInt(limit) + 1,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        threadId: params.threadId,
      },
      include: {
        createdBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    let nextCursor = undefined;
    if (result.length > parseInt(limit)) {
      nextCursor = result.pop()?.id ?? undefined;
    }
    return NextResponse.json({ data: result, nextCursor });
  } catch (error) {
    return NextResponse.json({ data: error }, { status: 400 });
  }
};
