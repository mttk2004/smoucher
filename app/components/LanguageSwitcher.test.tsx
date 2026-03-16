import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: vi.fn(),
}));

describe("LanguageSwitcher", () => {
  const mockChangeLanguage = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with default language (vi)", () => {
    (useTranslation as any).mockReturnValue({
      i18n: {
        language: "vi",
        changeLanguage: mockChangeLanguage,
      },
    });

    render(<LanguageSwitcher />);

    const enButton = screen.getByRole("button", { name: "EN" });
    const viButton = screen.getByRole("button", { name: "VI" });

    expect(enButton).toBeInTheDocument();
    expect(viButton).toBeInTheDocument();

    // VI button should be active (have primary text color/background)
    expect(viButton.className).toContain("text-primary");
    // EN button should be inactive
    expect(enButton.className).toContain("text-slate-500");
  });

  it("renders correctly with language (en)", () => {
    (useTranslation as any).mockReturnValue({
      i18n: {
        language: "en",
        changeLanguage: mockChangeLanguage,
      },
    });

    render(<LanguageSwitcher />);

    const enButton = screen.getByRole("button", { name: "EN" });
    const viButton = screen.getByRole("button", { name: "VI" });

    // EN button should be active
    expect(enButton.className).toContain("text-primary");
    // VI button should be inactive
    expect(viButton.className).toContain("text-slate-500");
  });

  it("calls changeLanguage with 'en' when EN button is clicked", async () => {
    const user = userEvent.setup();
    (useTranslation as any).mockReturnValue({
      i18n: {
        language: "vi",
        changeLanguage: mockChangeLanguage,
      },
    });

    render(<LanguageSwitcher />);

    const enButton = screen.getByRole("button", { name: "EN" });
    await user.click(enButton);

    expect(mockChangeLanguage).toHaveBeenCalledTimes(1);
    expect(mockChangeLanguage).toHaveBeenCalledWith("en");
  });

  it("calls changeLanguage with 'vi' when VI button is clicked", async () => {
    const user = userEvent.setup();
    (useTranslation as any).mockReturnValue({
      i18n: {
        language: "en",
        changeLanguage: mockChangeLanguage,
      },
    });

    render(<LanguageSwitcher />);

    const viButton = screen.getByRole("button", { name: "VI" });
    await user.click(viButton);

    expect(mockChangeLanguage).toHaveBeenCalledTimes(1);
    expect(mockChangeLanguage).toHaveBeenCalledWith("vi");
  });
});
