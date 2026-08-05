import { prisma } from "@/lib/prisma";

export type WebsiteSettings = {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  logoUrl: string;
};

export async function getSettings(): Promise<WebsiteSettings> {
  const rows = await prisma.setting.findMany();

  const map = Object.fromEntries(
    rows.map((row) => [row.key, row.value])
  );

  return {
    companyName: map.companyName || "Alico Logistics",
    email: map.email || "",
    phone: map.phone || "",
    address: map.address || "",
    logoUrl: map.logoUrl || "",
  };
}