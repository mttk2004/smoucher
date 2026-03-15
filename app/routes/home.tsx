import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard | Smoucher" },
    { name: "description", content: "Smart Voucher Management System" },
  ];
}

export default function Home() {
  return (
    <div className="p-8 font-sans">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Overview of your voucher campaigns and performance.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Active Campaigns */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">
            Active Campaigns
          </h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
        </div>

        {/* Distributed Vouchers */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">
            Distributed Vouchers
          </h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">8,402</p>
        </div>

        {/* Usage Rate */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Usage Rate</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">24.8%</p>
        </div>

        {/* Total Budget */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Budget Spent</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">$12,450</p>
        </div>
      </div>
    </div>
  );
}
