import { prisma } from "@/lib/prisma";
import SettingsForm from "@/app/admin/components/SettingsForm";
import PageHeader from "@/app/admin/components/ui/PageHeader";


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
    logoUrl:
      settingsMap.logoUrl || "",
  };

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="Settings"
        description="Manage your company contact information."
      />
      <SettingsForm initialSettings={initialSettings} />
    </div>
  );
}