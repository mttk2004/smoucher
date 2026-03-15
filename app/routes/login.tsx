import type { Route } from "./+types/login";

import { LanguageSwitcher } from "../components/LanguageSwitcher";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login | Smoucher - Smart Voucher Management" },
    { name: "description", content: "Sign in to your Smoucher account" },
  ];
}

export default function Login() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4 bg-white dark:bg-background-dark/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="text-primary">
            <svg
              className="size-8"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Smoucher</h1>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="w-full max-w-[420px] z-10">
          <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-xl shadow-primary/5">
            <div className="flex flex-col gap-2 mb-8 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                Sign in to your account
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Enter your credentials to access your voucher dashboard
              </p>
            </div>

            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  htmlFor="email"
                >
                  Email address
                </label>
                <input
                  className="flex h-11 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm ring-offset-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="email"
                  placeholder="name@company.com"
                  type="email"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <a
                    className="text-sm font-medium text-primary hover:underline underline-offset-4"
                    href="#"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    className="flex h-11 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm ring-offset-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="password"
                    placeholder="••••••••"
                    type="password"
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      visibility
                    </span>
                  </button>
                </div>
              </div>

              <button
                className="flex h-11 w-full items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                type="submit"
              >
                Sign In
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
              Don't have an account?
              <a
                className="font-medium text-primary hover:underline underline-offset-4 ml-1"
                href="#"
              >
                Contact Sales
              </a>
            </p>
          </div>

          <div className="mt-12 flex flex-col items-center gap-6 text-center">
            <div className="flex -space-x-4">
              <div className="h-12 w-12 rounded-full border-4 border-white dark:border-slate-900 bg-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">
                  shopping_cart
                </span>
              </div>
              <div className="h-12 w-12 rounded-full border-4 border-white dark:border-slate-900 bg-primary/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">
                  confirmation_number
                </span>
              </div>
              <div className="h-12 w-12 rounded-full border-4 border-white dark:border-slate-900 bg-primary/40 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">
                  loyalty
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Trusted by 500+ retailers
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[280px]">
                Automate your voucher issuance and redemption workflow
                effortlessly.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-6 text-center text-xs text-slate-400 dark:text-slate-600">
        © 2024 Smoucher Inc. All rights reserved.
        <div className="mt-2 space-x-4">
          <a className="hover:text-primary" href="#">
            Privacy Policy
          </a>
          <a className="hover:text-primary" href="#">
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  );
}
