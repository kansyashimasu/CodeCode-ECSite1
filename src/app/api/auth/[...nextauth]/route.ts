// NOTE: Auth.js認証関係のリクエスト処理(認証プロセスの管理)

import { nextAuthOptions } from "@/app/lib/next-auth/option";
import NextAuth from "next-auth";

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
