import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import AuthSessionProvider from "./providers/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeCode EC Site1",
  description: "An e-commerce site created by CodeCode",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <AuthSessionProvider>
          <Header />
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
