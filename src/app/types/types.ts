// NOTE: 型定期ファイル

export interface BookType {
  id: number;
  title: string;
  content: string;
  price: number;
  thumbnail: {
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}
