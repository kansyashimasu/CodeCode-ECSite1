// NOTE: Headerコンポーネント

"use client";

import Link from "next/link";
import { useState } from "react";
import { User, Search, Menu, X, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <div className="flex-shrink-0 w-32">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-white font-semibold text-lg hidden sm:block">
                CodeShop
              </span>
            </Link>
          </div>

          {/* 検索バー */}
          <div className="hidden md:flex flex-1 justify-center px-8 ml-80">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-4 h-4" />
            </div>
          </div>

          {/* ナビゲーション（デスクトップ） */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/products"
              className="text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/10 px-3 py-2 rounded-lg"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/10 px-3 py-2 rounded-lg"
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-white transition-colors duration-200 hover:bg-white/10 px-3 py-2 rounded-lg"
            >
              About
            </Link>
          </nav>

          {/* アクションボタン */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* 検索ボタン（モバイル） */}
            <button
              className="md:hidden text-gray-300 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* ユーザーアイコン */}
            {user ? (
              // ログイン済みの場合: GitHubアイコンとログアウトボタンを表示
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  {user.image && (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full border-2 border-white/20 hover:border-white/40 transition-colors duration-200 cursor-pointer"
                    />
                  )}
                  <span className="hidden sm:block text-white">
                    {user.name && user.name.length > 6
                      ? user.name.substring(0, 6) + "..."
                      : user.name}
                  </span>
                  {/* ログアウトボタン */}
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="text-gray-300 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                    aria-label="logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-gray-300 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                aria-label="login"
              >
                <User className="w-5 h-5" />
              </Link>
            )}

            {/* カートアイコン(必要に応じて追加) */}
            {/* <Link
                            href="/cart"
                            className="relative text-gray-300 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                            aria-label="Cart"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-400 to-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                3
                            </span>
                        </Link> */}

            {/* ハンバーガーメニュー（モバイル） */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/40 backdrop-blur-md border-b border-white/10">
            <div className="px-4 py-2 space-y-1">
              {/* モバイル検索 */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pl-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-4 h-4" />
              </div>

              {/* モバイルナビゲーション */}
              <Link
                href="/products"
                className="block text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/categories"
                className="block text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/about"
                className="block text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
