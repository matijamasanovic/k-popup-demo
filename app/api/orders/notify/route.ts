import { NextRequest, NextResponse } from "next/server";
import { sendOrderEmails, OrderEmailData } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const data: OrderEmailData = await request.json();
    await sendOrderEmails(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
