// NOTE: Prismaクライアントの設定

import { PrismaClient } from "@prisma/client";

// ホットリロードで何度もインスタンス化されるのを防ぐ
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// インスタンスが作成されていなかったら新規作成
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// 開発環境のみグローバルに作成(本番環境では毎回新しいインスタンスを作成)
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
