import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/auth/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { name, email, password } = (await req.json()) as { name?: string; email?: string; password?: string };
  if (!email || !password) return NextResponse.json({ message: "Email and password required" }, { status: 400 });
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ message: "User already exists" }, { status: 400 });
  const hash = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { name: name || null, email, password: hash } });
  return NextResponse.json({ message: "Account created" });
}
