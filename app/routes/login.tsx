import type { Route } from "./+types/login";

import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLogin } from "../features/auth/hooks";
import { useNavigate, data, redirect, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { loginSchema, type LoginFormValues } from "../features/auth/schemas";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const hasAccessToken = cookieHeader?.includes("accessToken=");

  if (hasAccessToken) {
    return redirect("/?error=already_logged_in");
  }

  return data({});
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login | Smoucher - Smart Voucher Management" },
    { name: "description", content: "Sign in to your Smoucher account" },
  ];
}

export default function Login() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { t } = useTranslation();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "unauthorized") {
      toast.error(t("login.unauthorized", { defaultValue: "Please login to access this page" }));
      // remove the error param so it doesn't stay in the URL
      setSearchParams(new URLSearchParams());
    }

    const success = searchParams.get("success");
    if (success === "logged_out") {
      toast.success(t("login.loggedOut", { defaultValue: "Successfully logged out" }));
      setSearchParams(new URLSearchParams());
    }
  }, [searchParams, setSearchParams, t]);
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate("/?success=logged_in");
      },
    });
  };

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
                {t("login.heading")}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {t("login.subheading")}
              </p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
              {loginMutation.isError && (
                <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  {loginMutation.error.message}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="username">
                  {t("login.emailLabel")}
                </Label>
                <Input
                  {...register("username")}
                  id="username"
                  placeholder={t("login.emailPlaceholder")}
                  type="text"
                  className={errors.username ? 'border-red-500' : ''}
                />
                {errors.username && (
                  <span className="text-xs text-red-500">{errors.username.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">
                    {t("login.passwordLabel")}
                  </Label>
                  <a
                    className="text-sm font-medium text-primary hover:underline underline-offset-4"
                    href="#"
                  >
                    {t("login.forgotPassword")}
                  </a>
                </div>
                <div className="relative">
                  <Input
                    {...register("password")}
                    id="password"
                    placeholder={t("login.passwordPlaceholder")}
                    type={showPassword ? "text" : "password"}
                    className={errors.password ? 'border-red-500' : ''}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
                {errors.password && (
                  <span className="text-xs text-red-500">{errors.password.message}</span>
                )}
              </div>

              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full mt-2"
              >
                {loginMutation.isPending ? "Signing in..." : t("login.signIn")}
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
              {t("login.noAccount")}
              <a
                className="font-medium text-primary hover:underline underline-offset-4 ml-1"
                href="#"
              >
                {t("login.contactSales")}
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
                {t("login.trustedBy")}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[280px]">
                {t("login.trustedDesc")}
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-6 text-center text-xs text-slate-400 dark:text-slate-600">
        {t("login.copyright")}
        <div className="mt-2 space-x-4">
          <a className="hover:text-primary" href="#">
            {t("login.privacy")}
          </a>
          <a className="hover:text-primary" href="#">
            {t("login.terms")}
          </a>
        </div>
      </footer>
    </div>
  );
}
