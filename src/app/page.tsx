import Book from "./components/Book";
import { getAllBooks } from "./lib/microcms/client";
import { BookType } from "./types/types";

export default async function Home() {
  const books = await getAllBooks();

  // 疑似データ
  // const books = [
  //   {
  //     id: 1,
  //     title: "Book 1",
  //     thumbnail: "next.svg",
  //     price: 2980,
  //     author: {
  //       id: 1,
  //       name: "Author 1",
  //       description: "Author 1 description",
  //       profile_icon: "https://i.pravatar.cc/150?img=1",
  //     },
  //     content: "Content 1",
  //     created_at: new Date().toString(),
  //     updated_at: new Date().toString(),
  //   },
  //   {
  //     id: 2,
  //     title: "Book 2",
  //     thumbnail: "vercel.svg",
  //     price: 1980,
  //     author: {
  //       id: 2,
  //       name: "Author 2",
  //       description: "Author 2 description",
  //       profile_icon: "https://i.pravatar.cc/150?img=2",
  //     },
  //     content: "Content 2",
  //     created_at: new Date().toString(),
  //     updated_at: new Date().toString(),
  //   },
  //   {
  //     id: 3,
  //     title: "Book 3",
  //     price: 4980,
  //     thumbnail: "next.svg",
  //     author: {
  //       id: 3,
  //       name: "Author 3",
  //       description: "Author 3 description",
  //       profile_icon: "https://i.pravatar.cc/150?img=3",
  //     },
  //     content: "Content 3",
  //     created_at: new Date().toString(),
  //     updated_at: new Date().toString(),
  //   },
  // ];

  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Premium Books
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Discover high-quality programming Books from industry experts
              </p>
            </div>
          </div>
        </section>

        {/* Books Grid section */}
        <section className="px-4 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {books.map((book: BookType) => (
                <Book book={book} key={book.id} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
