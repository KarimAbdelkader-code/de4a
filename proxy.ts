import { timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function matches(actual: string, expected: string) {
  const left = Buffer.from(actual);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function proxy(request: NextRequest) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) return new NextResponse("Admin credentials are not configured.", { status: 503 });

  try {
    const authorization = request.headers.get("authorization");
    if (authorization?.startsWith("Basic ")) {
      const decoded = Buffer.from(authorization.slice(6), "base64").toString("utf8");
      const separator = decoded.indexOf(":");
      if (separator > -1 && matches(decoded.slice(0, separator), username) && matches(decoded.slice(separator + 1), password)) {
        return NextResponse.next();
      }
    }
  } catch { /* malformed authorization */ }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Karim & Salma Admin", charset="UTF-8"' },
  });
}

export const config = { matcher: "/admin/:path*" };
