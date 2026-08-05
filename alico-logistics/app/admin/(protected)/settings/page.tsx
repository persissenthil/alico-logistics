import { prisma } from "@/lib/prisma";
import SettingsForm from "@/app/admin/components/SettingsForm";

export default async function SettingsPage() {
  const settingsRows = await prisma.setting.findMany();

  const settingsMap = Object.fromEntries(
    settingsRows.map((setting) => [
      setting.key,
      setting.value,
    ])
  );

  const initialSettings = {
    companyName:
      settingsMap.companyName || "Alico Logistics",
    email:
      settingsMap.email || "office@alicoltd.co.uk",
    phone:
      settingsMap.phone || "",
    address:
      settingsMap.address || "",
    logoUrl: settingsMap.logoUrl || "",  
  };

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold text-slate-900">
        Settings
      </h1>

      <p className="mt-2 text-slate-600">
        Manage your company contact information.
      </p>

      <SettingsForm initialSettings={initialSettings} />
    </div>
  );
}