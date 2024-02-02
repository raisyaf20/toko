import { NextResponse } from "next/server";
import WithAuth from "./middlewares/withAuth";

export function mainMiddleware() {
  return NextResponse.next();
}

export default WithAuth(mainMiddleware, ["admin", "auth"]);
