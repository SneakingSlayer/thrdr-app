import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/prisma/utils";

import { verifyToken } from "@/utils";

export const POST = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  try {
    const token = await verifyToken(req);
    if (!token.isValid) throw { ...token };
    const createdFor = await prisma.user.findUnique({
      where: {
        userName: params.userId,
      },
    });
    const reqBody = await req.json();
    const thread = await prisma.thread.create({
      data: { ...reqBody, createdForId: createdFor?.id },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            emailVerified: true,
            name: true,
            userName: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        createdFor: {
          select: {
            id: true,
            email: true,
            emailVerified: true,
            name: true,
            userName: true,
            createdAt: true,
            updatedAt: true,
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

    return NextResponse.json({ data: thread });
  } catch (error: any) {
    return NextResponse.json(
      { data: error?.message ?? "Bad request" },
      { status: error?.status ?? 400 }
    );
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string; cursor: string } }
) => {
  try {
    // const token = await getToken({ req, secret: TOKEN_SECRET });
    const { token } = await verifyToken(req);
    const cursor = (req.nextUrl.searchParams.get("cursor") ?? 1) as string;
    const limit = (req.nextUrl.searchParams.get("limit") ?? 10) as string;
    const sort = (req.nextUrl.searchParams.get("sort") ?? "popular") as string;

    const user = await prisma.user.findUnique({
      where: {
        userName: params.userId,
      },
    });
    const result = await prisma.thread.findMany({
      take: parseInt(limit) + 1,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        OR: [{ createdById: user?.id }, { createdForId: user?.id }],
      },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            emailVerified: true,
            name: true,
            userName: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        createdFor: {
          select: {
            id: true,
            email: true,
            emailVerified: true,
            name: true,
            userName: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        likes: {
          take: 1,
          where: {
            userId: token?.sub ?? token?.id ?? "",
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

      orderBy:
        sort === "popular"
          ? [
              {
                likes: {
                  _count: "desc",
                },
              },
              {
                comments: {
                  _count: "desc",
                },
              },
            ]
          : {
              createdAt: "desc",
            },
    });
    let nextCursor = undefined;
    if (result.length > parseInt(limit)) {
      nextCursor = result.pop()?.id ?? undefined;
    }

    return NextResponse.json({ data: result, nextCursor });
  } catch (error) {
    return NextResponse.json(
      { data: error, nextCursor: null },
      { status: 400 }
    );
  }
};
