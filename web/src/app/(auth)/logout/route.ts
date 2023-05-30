import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const redirectURL = new URL("/", request.url);

  cookies().set("token", "", {
    maxAge: 0,
  });

  return NextResponse.redirect(redirectURL);
}
