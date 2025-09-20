// microCMSのクライアント初期化

import { BookType } from "@/app/types/types";
import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN || "",
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY || "",
});

// 全記事取得
export const getAllBooks = async () => {
  const allBooks = await client.getList<BookType>({
    endpoint: "codeshop",
  });

  return allBooks.contents;
};
