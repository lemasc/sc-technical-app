import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const form = await req.formData();
  const file = form.get("file") as File;
  console.log(file);
  return NextResponse.json({ success: true });
};
