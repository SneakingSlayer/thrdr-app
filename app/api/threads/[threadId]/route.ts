import { NextResponse } from "next/server";

import { prisma } from "@/prisma/utils";

export const GET = async (
  req: Request,
  { params }: { params: { threadId: string } }
) => {
  try {
    const result = await prisma.thread.findUnique({
      where: {
        id: params.threadId,
      },
      include: {
        createdBy: true,
        createdFor: true,
        likes: {
          include: {
            user: true,
          },
        },
        comments: {
          take: 3,
          include: {
            createdBy: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });
    return NextResponse.json({ data: result });
  } catch (error) {
    return NextResponse.json({ data: error }, { status: 400 });
  }
};
