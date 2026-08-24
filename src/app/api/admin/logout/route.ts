import { NextResponse } from "next/server";
import { clearAdminSession } from "@/lib/admin-auth";

export async function POST() {
  const response = NextResponse.json({ message: "Session fermée." });
  clearAdminSession(response);
  return response;
}
