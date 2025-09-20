// NOTE: 一つ一つのBookコンポーネント
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart, Heart } from "lucide-react";
import { BookType } from "../types/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface BookProps {
  book: BookType;
}

const Book = ({ book }: BookProps) => {
  // ユーザーを取得
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  // モーダルの状態管理
  const [showModal, setShowModal] = useState(false);

  // BuyNowボタンクリック時の処理
  const handleBuyClick = () => {
    setShowModal(true);
  };

  // キャンセルボタンの処理
  const handleCancel = () => {
    setShowModal(false);
  };

  // 購入処理
  const handlePurchase = () => {
    if (!user) {
      setShowModal(false);
      router.push("/login");
    } else {
      alert("購入処理を実装してください");
    }
  };

  useEffect(() => {
    if (showModal) {
      // モーダル表示中はbodyのスクロールを無効
      document.body.style.overflow = "hidden";

      // Escキーでモーダルを閉じる
      const handleEscKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setShowModal(false);
        }
      };
      document.addEventListener("keydown", handleEscKey);

      return () => {
        // クリーンアップ(最終的に元に戻す)
        document.body.style.overflow = "unset";
        document.removeEventListener("keydown", handleEscKey);
      };
    } else {
      // モーダル非表示時はbodyのスクロールを有効
      document.body.style.overflow = "unset";
    }
  }, [showModal]);

  // モーダル背景クリックでモーダルを閉じる
  const handleModalBackgroundClick = (e: React.MouseEvent) => {
    // クリックされた場所がモーダル背景だった場合
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        {/* Book Image */}
        <div className="relative overflow-hidden">
          <Image
            src={book.thumbnail.url}
            alt={book.title}
            width={400}
            height={240}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <button className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-red-500 transition-colors duration-200">
              <Heart className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold rounded-full">
              NEW
            </span>
          </div>
        </div>

        {/* Book Info */}
        <div className="p-6">
          {/* Author Info */}
          <div className="flex items-center mb-3">
            <Image
              src={""}
              alt={""}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full mr-3"
            />
            <span className="text-gray-400 text-sm">{""}</span>
          </div>

          {/* Title */}
          <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors duration-200">
            {book.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {book.content}
          </p>

          {/* Rating (optional - if book has rating) */}
          {/* {book.rating && (
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(book.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-yellow-400 text-sm font-medium mr-1">
              {book.rating}
            </span>
            {book.reviews && (
              <span className="text-gray-500 text-sm">({book.reviews})</span>
            )}
          </div>
        )} */}

          {/* Publication Date */}
          <div className="mb-4">
            <span className="text-gray-500 text-xs">
              Published: {new Date(book.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">
                ¥{book.price.toLocaleString()}
              </span>
            </div>
            <button
              onClick={handleBuyClick}
              className="flex items-center space-x-2 bg-gradient-to-r from-slate-300 to-slate-800 hover:from-slate-500 hover:to-slate-900 hover:text-white text-black px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm font-medium">Buy Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* モーダル */}
      {showModal && (
        <div
          onClick={handleModalBackgroundClick}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[9999] modal"
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 animate-in fade-in zoom-in duration-300"
          >
            <div className="text-center mb-6">
              <div className="mb-4">
                <Image
                  src={book.thumbnail.url}
                  alt={book.title}
                  width={80}
                  height={100}
                  className="mx-auto rounded-lg object-cover"
                />
              </div>
              <p className="text-xl mb-2 text-white font-semibold">
                Would you like to buy a book?
              </p>
              <p className="text-gray-300 text-sm mb-2 line-clamp-2">
                {book.title}
              </p>
              <p className="text-blue-400 font-bold text-lg">
                ¥{book.price.toLocaleString()}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handlePurchase}
                className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Buy
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-white/3 backdrop-blur-md border border-white/5 hover:bg-white/8 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Cancel
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-xs">
                You can cancel by pressing the Esc key or clicking the
                background
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Book;

// TODO: Stripeアカウントを作成してAPIキーを取得してみよう
