import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/utils";
import { verifyToken } from "@/utils";
import bcrypt from "bcrypt";
export const GET = async (
  req: NextRequest,
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
    return NextResponse.json({ data: getUser });
  } catch (error) {
    return error;
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  try {
    const token = await verifyToken(req);
    if (!token.isValid) throw { ...token };
    const reqBody = await req.json();
    console.log(token);
    if (token.token?.id !== params.userId)
      throw { ...token, message: "Accounts does not match!" };
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(reqBody.password, salt);
    if (!reqBody.password) delete reqBody.password;
    const updatedUser = await prisma.user.update({
      where: {
        id: params.userId,
      },
      data: !reqBody.password
        ? {
            ...reqBody,
          }
        : { ...reqBody, password: hashPass },
    });
    return NextResponse.json({ data: updatedUser });
  } catch (error: any) {
    return NextResponse.json(
      { data: error?.message ?? "Bad request" },
      { status: error?.status ?? 400 }
    );
  }
};
