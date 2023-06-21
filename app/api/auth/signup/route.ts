import { NextResponse } from "next/server";

import { prisma } from "@/prisma/utils";

import bcrypt from "bcrypt";

export const POST = async (req: Request, res: Response) => {
  try {
    const params = await req.json();
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(params.password, salt);
    const newUser = await prisma.user.create({
      data: {
        ...params,
        password: hashPass,
      },
    });
    return NextResponse.json({ data: newUser });
  } catch (error) {
    return NextResponse.json(
      {
        data: error,
      },
      { status: 400 }
    );
  }
};
