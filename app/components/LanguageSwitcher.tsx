import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  return (
    <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-800 rounded-lg p-1 bg-slate-50 dark:bg-slate-900 shadow-sm ml-2">
      <button
        onClick={() => changeLanguage("en")}
        className={`px-2 py-1 text-[10px] font-bold rounded uppercase transition-colors ${
          i18n.language === "en" || !i18n.language.startsWith("vi")
            ? "bg-white dark:bg-slate-800 text-primary shadow-sm"
            : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage("vi")}
        className={`px-2 py-1 text-[10px] font-bold rounded uppercase transition-colors ${
          i18n.language && i18n.language.startsWith("vi")
            ? "bg-white dark:bg-slate-800 text-primary shadow-sm"
            : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
        }`}
      >
        VI
      </button>
    </div>
  );
}
