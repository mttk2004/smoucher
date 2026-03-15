import type { Route } from "./+types/login";

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
            <svg className="size-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Smoucher</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500 hidden md:inline">Need help?</span>
          <button className="flex items-center justify-center rounded-lg h-9 px-4 bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 transition-colors">
            Support
          </button>
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
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Sign in to your account</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Enter your credentials to access your voucher dashboard</p>
            </div>

            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">Email address</label>
                <input className="flex h-11 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm ring-offset-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="email" placeholder="name@company.com" type="email" />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">Password</label>
                  <a className="text-sm font-medium text-primary hover:underline underline-offset-4" href="#">Forgot password?</a>
                </div>
                <div className="relative">
                  <input className="flex h-11 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm ring-offset-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="password" placeholder="••••••••" type="password" />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" type="button">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </button>
                </div>
              </div>

              <button className="flex h-11 w-full items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" type="submit">
                Sign In
              </button>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-200 dark:border-slate-800"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-slate-900 px-2 text-slate-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <button className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-8 text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900" type="button">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"></path>
                  </svg>
                  Google
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
              Don't have an account?
              <a className="font-medium text-primary hover:underline underline-offset-4 ml-1" href="#">Contact Sales</a>
            </p>
          </div>

          <div className="mt-12 flex flex-col items-center gap-6 text-center">
            <div className="flex -space-x-4">
              <div className="h-12 w-12 rounded-full border-4 border-white dark:border-slate-900 bg-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">shopping_cart</span>
              </div>
              <div className="h-12 w-12 rounded-full border-4 border-white dark:border-slate-900 bg-primary/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">confirmation_number</span>
              </div>
              <div className="h-12 w-12 rounded-full border-4 border-white dark:border-slate-900 bg-primary/40 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">loyalty</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Trusted by 500+ retailers</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[280px]">Automate your voucher issuance and redemption workflow effortlessly.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-6 text-center text-xs text-slate-400 dark:text-slate-600">
        © 2024 Smoucher Inc. All rights reserved.
        <div className="mt-2 space-x-4">
          <a className="hover:text-primary" href="#">Privacy Policy</a>
          <a className="hover:text-primary" href="#">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
