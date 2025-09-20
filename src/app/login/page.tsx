"use client";

import { getProviders, signIn } from "next-auth/react";

// eslint-disable-next-line @next/next/no-async-client-component
async function Login() {
  // 認証プロバイダの取得
  const providers = await getProviders().then((res) => {
    return res;
  });

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* 背景の装飾的な円 */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl animate-bounce delay-500"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
          {/* ヘッダー部分 */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4 animate-spin-slow">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent animate-pulse">
              Login
            </h2>
            <p className="mt-2 text-gray-300 text-sm">
              Please log in to your account.
            </p>
          </div>

          {/* ボタン部分 */}
          <div className="space-y-4">
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.id}>
                  <button
                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                    className="group relative w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
                  >
                    {/* ボタンの光る効果 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                    <div className="relative flex items-center justify-center">
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300"
                        fill="currentColor"
                      >
                        <title>GitHub icon</title>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.723-4.042-1.608-4.042-1.608-.546-1.386-1.332-1.754-1.332-1.754-1.087-.743.083-.728.083-.728 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.42-1.305.763-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.382 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.956-.266 1.98-.398 3-.403 1.02.005 2.044.137 3 .403 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.768.838 1.234 1.91 1.234 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.824 1.102.824 2.222 0 1.604-.015 2.897-.015 3.29 0 .322.216.697.825.577C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span className="text-lg">Log in with GitHub</span>
                    </div>
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default Login;
