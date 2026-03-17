import type { Route } from "./+types/campaigns.create";
import { useTranslation } from "react-i18next";
import { PageHeader } from "../components/PageHeader";
import { useCreateCampaign } from "../features/campaigns/hooks";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { CampaignForm } from "../features/campaigns/components/CampaignForm";
import type { CampaignFormValues } from "../features/campaigns/schemas";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Smoucher - Create Campaign" },
    { name: "description", content: "Launch a new marketing initiative" },
  ];
}

export default function CreateCampaign() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: createCampaign, isPending } = useCreateCampaign();

  const onSubmit = (data: CampaignFormValues) => {
    // Format dates to ISO strings with UTC 'Z' for backend (basic formatting)
    const formattedData = {
      ...data,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      status: "DRAFT" as const, // Default status for new campaigns
    };

    createCampaign(formattedData, {
      onSuccess: () => {
        toast.success("Campaign created successfully");
        navigate("/campaigns");
      },
    });
  };

  return (
    <>
      <div className="w-full max-w-3xl flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary mb-2">
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>
            <a
              className="text-sm font-medium hover:underline"
              href="/campaigns"
            >
              {t("campaignsCreate.back")}
            </a>
          </div>
          <PageHeader
            title={t("campaignsCreate.title")}
            description={t("campaignsCreate.description")}
          />
        </div>

        <CampaignForm
          onSubmit={onSubmit}
          isPending={isPending}
          onCancel={() => navigate("/campaigns")}
        />

        <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">lightbulb</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Pro Tip
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Campaigns with clear, descriptive names are 40% easier to track
              across multiple channels. Try including the year or season in the
              title.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
