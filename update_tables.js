import fs from 'fs';

// --- CAMPAIGNS ---
let content = fs.readFileSync('app/routes/campaigns.tsx', 'utf8');
const CAMPAIGNS_DATA = `const CAMPAIGNS_DATA = [
  {
    icon: "shopping_bag",
    iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    name: "Summer Sale 2024",
    type: "E-commerce • 15.2k target audience",
    status: "ACTIVE",
    statusVariant: "success",
    startDate: "Jun 01, 2024",
    endDate: "to Aug 31, 2024",
    spent: "$4,800",
    budget: "$6,500",
    progress: "74%"
  },
  {
    icon: "flash_on",
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    name: "Flash Discount",
    type: "Social Media • 5k target audience",
    status: "DRAFT",
    statusVariant: "default",
    startDate: "Sep 15, 2024",
    endDate: "to Sep 16, 2024",
    spent: "$0",
    budget: "$1,200",
    progress: "0%"
  },
  {
    icon: "celebration",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    name: "Holiday Special",
    type: "Cross-channel • 50k target audience",
    status: "ENDED",
    statusVariant: "info",
    startDate: "Dec 01, 2023",
    endDate: "to Dec 25, 2023",
    spent: "$25,000",
    budget: "$25,000",
    progress: "100%"
  },
  {
    icon: "hot_tub",
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-600 dark:text-orange-400",
    name: "Weekend Warmup",
    type: "Email • 8.4k target audience",
    status: "PAUSED",
    statusVariant: "warning",
    startDate: "Jul 05, 2024",
    endDate: "to Jul 07, 2024",
    spent: "$440",
    budget: "$2,000",
    progress: "22%"
  }
];

`;
let mapBody = `{CAMPAIGNS_DATA.map((campaign, i) => (
            <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className={\`size-10 rounded-lg \${campaign.iconBg} flex items-center justify-center \${campaign.iconColor}\`}>
                    <span className="material-symbols-outlined">
                      {campaign.icon}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {campaign.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {campaign.type}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5">
                <Badge variant={campaign.statusVariant as any}>{campaign.status}</Badge>
              </td>
              <td className="px-6 py-5">
                <div className="text-sm">
                  <p className="text-slate-900 dark:text-slate-100 font-medium">
                    {campaign.startDate}
                  </p>
                  <p className="text-slate-500 text-xs">{campaign.endDate}</p>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span>{campaign.spent} / {campaign.budget}</span>
                    <span>{campaign.progress}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: campaign.progress }}
                    ></div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5 text-right">
                <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </td>
            </tr>
          ))}`;
content = content.replace(/export default function Campaigns\(\) \{/, CAMPAIGNS_DATA + 'export default function Campaigns() {');
content = content.replace(/<tbody className="divide-y divide-slate-200 dark:divide-slate-800">[\s\S]*?<\/tbody>/, `<tbody className="divide-y divide-slate-200 dark:divide-slate-800">\n            ${mapBody}\n          </tbody>`);
fs.writeFileSync('app/routes/campaigns.tsx', content);


// --- CUSTOMERS ---
content = fs.readFileSync('app/routes/customers.tsx', 'utf8');
const CUSTOMERS_DATA = `const CUSTOMERS_DATA = [
  {
    initials: "AR",
    bg: "bg-primary/20 text-primary",
    name: "Alex Rivera",
    email: "alex.r@example.com",
    smId: "SM-8821",
    extId: "EXT-9901",
    tier: "Gold",
    tierVariant: "warning"
  },
  {
    initials: "JS",
    bg: "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300",
    name: "Jordan Smith",
    email: "j.smith@provider.net",
    smId: "SM-4412",
    extId: "EXT-2234",
    tier: "Silver",
    tierVariant: "default"
  },
  {
    initials: "CC",
    bg: "bg-orange-100 dark:bg-orange-900/30 text-orange-600",
    name: "Casey Chen",
    email: "casey.c@work.com",
    smId: "SM-1092",
    extId: "EXT-7721",
    tier: "Bronze",
    tierVariant: "danger"
  },
  {
    initials: "TW",
    bg: "bg-primary/20 text-primary",
    name: "Taylor Wong",
    email: "t.wong@service.io",
    smId: "SM-3398",
    extId: "EXT-5542",
    tier: "Gold",
    tierVariant: "warning"
  }
];

`;
mapBody = `{CUSTOMERS_DATA.map((customer, i) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={\`size-8 rounded-full flex items-center justify-center font-bold text-xs \${customer.bg}\`}>
                      {customer.initials}
                    </div>
                    <span className="text-sm font-semibold">{customer.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                  {customer.email}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {customer.smId}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-[11px] font-mono font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {customer.extId}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <Badge variant={customer.tierVariant as any}>{customer.tier}</Badge>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">
                      edit_square
                    </span>
                  </button>
                </td>
              </tr>
            ))}`;
content = content.replace(/export default function Customers\(\) \{/, CUSTOMERS_DATA + 'export default function Customers() {');
content = content.replace(/<tbody className="divide-y divide-slate-100 dark:divide-slate-800">[\s\S]*?<\/tbody>/, `<tbody className="divide-y divide-slate-100 dark:divide-slate-800">\n              ${mapBody}\n            </tbody>`);
fs.writeFileSync('app/routes/customers.tsx', content);


// --- VOUCHERS ---
content = fs.readFileSync('app/routes/vouchers.tsx', 'utf8');
const VOUCHERS_DATA = `const VOUCHERS_DATA = [
  {
    code: "SMCH-9283-XJ",
    status: "Issued",
    statusVariant: "info",
    initials: "AR",
    name: "Alex River",
    campaign: "Summer Blast 2024",
    expiry: "Dec 12, 2024"
  },
  {
    code: "SMCH-1102-LK",
    status: "Redeemed",
    statusVariant: "success",
    initials: "JS",
    name: "Jordan Smith",
    campaign: "Holiday Special",
    expiry: "Oct 05, 2023"
  },
  {
    code: "SMCH-7734-OP",
    status: "Expired",
    statusVariant: "danger",
    initials: "CD",
    name: "Casey Doe",
    campaign: "Flash Sale",
    expiry: "Jan 20, 2024"
  },
  {
    code: "SMCH-4456-BN",
    status: "Issued",
    statusVariant: "info",
    initials: "SW",
    name: "Sam Wilson",
    campaign: "Loyalty Rewards",
    expiry: "Nov 15, 2024"
  },
  {
    code: "SMCH-2291-QM",
    status: "Redeemed",
    statusVariant: "success",
    initials: "TR",
    name: "Taylor Reed",
    campaign: "Referral Bonus",
    expiry: "Sep 30, 2023"
  }
];

`;

mapBody = `{VOUCHERS_DATA.map((voucher, i) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono text-sm font-semibold text-primary">
                    {voucher.code}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={voucher.statusVariant as any}>
                    {voucher.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                      {voucher.initials}
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {voucher.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  {voucher.campaign}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  {voucher.expiry}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">
                      more_vert
                    </span>
                  </button>
                </td>
              </tr>
            ))}`;

content = content.replace(/export default function Vouchers\(\) \{/, VOUCHERS_DATA + 'export default function Vouchers() {');
content = content.replace(/<tbody className="divide-y divide-slate-200 dark:divide-slate-800">[\s\S]*?<\/tbody>/, `<tbody className="divide-y divide-slate-200 dark:divide-slate-800">\n              ${mapBody}\n            </tbody>`);

// Replace pagination block in vouchers
content = content.replace(/<div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">[\s\S]*?<\/div>\n      <\/div>/, `<div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
          <Pagination start={1} end={5} total={1240} itemName="vouchers" className="mt-0" />
        </div>
      </div>`);

if (!content.includes('import { Pagination }')) {
  content = `import { Pagination } from "../components/ui/Pagination";\nimport { Badge } from "../components/ui/Badge";\n` + content;
}
fs.writeFileSync('app/routes/vouchers.tsx', content);


// --- HISTORY ---
content = fs.readFileSync('app/routes/history.tsx', 'utf8');
const HISTORY_DATA = `const HISTORY_DATA = [
  {
    orderId: "#ORD-9921",
    location: "Downtown Central",
    address: "Main St. 402",
    amount: "$15.00",
    status: "Completed",
    statusVariant: "success",
    timestamp: "Oct 24, 2023 14:20"
  },
  {
    orderId: "#ORD-9845",
    location: "Westside Mall",
    address: "Terminal 3, Gate B",
    amount: "$10.00",
    status: "Completed",
    statusVariant: "success",
    timestamp: "Oct 23, 2023 11:15"
  },
  {
    orderId: "#ORD-9712",
    location: "Airport Terminal 2",
    address: "International Hub",
    amount: "$25.50",
    status: "Pending",
    statusVariant: "warning",
    timestamp: "Oct 22, 2023 18:45"
  },
  {
    orderId: "#ORD-9650",
    location: "Downtown Central",
    address: "Main St. 402",
    amount: "$5.00",
    status: "Completed",
    statusVariant: "success",
    timestamp: "Oct 21, 2023 09:30"
  },
  {
    orderId: "#ORD-9588",
    location: "North Plaza",
    address: "Level 2 Food Court",
    amount: "$12.00",
    status: "Cancelled",
    statusVariant: "default",
    timestamp: "Oct 20, 2023 13:10"
  }
];

`;

mapBody = `{HISTORY_DATA.map((record, i) => (
              <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-mono text-sm text-primary font-semibold">
                    {record.orderId}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {record.location}
                    </span>
                    <span className="text-xs text-slate-500">{record.address}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {record.amount}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={record.statusVariant as any}>
                    {record.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {record.timestamp}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors text-slate-400">
                    <span className="material-symbols-outlined text-lg">
                      more_vert
                    </span>
                  </button>
                </td>
              </tr>
            ))}`;

content = content.replace(/export default function History\(\) \{/, HISTORY_DATA + 'export default function History() {');
content = content.replace(/<tbody className="divide-y divide-slate-100 dark:divide-slate-800">[\s\S]*?<\/tbody>/, `<tbody className="divide-y divide-slate-100 dark:divide-slate-800">\n              ${mapBody}\n            </tbody>`);

content = content.replace(/<div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">[\s\S]*?<\/div>\n      <\/div>/, `<div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <Pagination start={1} end={5} total={1248} itemName="records" className="mt-0" />
        </div>
      </div>`);

if (!content.includes('import { Pagination }')) {
  content = `import { Pagination } from "../components/ui/Pagination";\nimport { Badge } from "../components/ui/Badge";\n` + content;
}
fs.writeFileSync('app/routes/history.tsx', content);

