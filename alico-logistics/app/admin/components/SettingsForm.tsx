"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useRef, useState } from "react";

type Settings = {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  logoUrl: string;
};

type SettingsFormProps = {
  initialSettings: Settings;
};

export default function SettingsForm({
  initialSettings,
}: SettingsFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [settings, setSettings] = useState(initialSettings);
  const [logoUrl, setLogoUrl] = useState(
    initialSettings.logoUrl
  );

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function handleLogoUpload() {
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      toast.error("Please choose a logo.");
      return;
    }

    const formData = new FormData();
    formData.append("logo", file);

    setUploading(true);

    try {
      const response = await fetch(
        "/api/admin/settings/logo",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to upload the logo."
        );
      }

      setLogoUrl(data.logoUrl);

      setSettings((currentSettings) => ({
        ...currentSettings,
        logoUrl: data.logoUrl,
      }));

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

     toast.success("Logo uploaded successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to upload the logo."
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);

    try {
      const response = await fetch(
        "/api/admin/settings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(settings),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save settings."
        );
      }

      toast.success("Settings saved successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save settings."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 max-w-5xl space-y-6 rounded-xl bg-white p-8 shadow"
    >
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          Company Logo
        </h2>

        {logoUrl ? (
          <div className="mb-4 flex min-h-28 items-center justify-center rounded-lg border border-slate-200 bg-white p-4">
            <Image
              src={logoUrl}
              alt={`${settings.companyName} logo`}
              width={240}
              height={100}
              className="max-h-24 w-auto object-contain"
            />
          </div>
        ) : (
          <div className="mb-4 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            No company logo uploaded.
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.webp,.svg"
          disabled={uploading}
          className="mb-4 block w-full rounded-lg border border-slate-300 bg-white p-3 text-sm"
        />

        <p className="mb-4 text-sm text-slate-500">
          PNG, JPG, WebP or SVG. Maximum file size: 2 MB.
        </p>

        <button
          type="button"
          onClick={handleLogoUpload}
          disabled={uploading}
          className="rounded-lg bg-slate-900 px-5 py-2 font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload Logo"}
        </button>
      </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="companyName"
              className="mb-2 block font-medium text-slate-700"
            >
              Company Name
            </label>

            <input
              id="companyName"
              type="text"
              required
              className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              value={settings.companyName}
              onChange={(event) =>
                setSettings({
                  ...settings,
                  companyName: event.target.value,
                })
              }
            />
          </div>

          <div>
            <label
              htmlFor="companyEmail"
              className="mb-2 block font-medium text-slate-700"
            >
              Email
            </label>

            <input
              id="companyEmail"
              type="email"
              required
              className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              value={settings.email}
              onChange={(event) =>
                setSettings({
                  ...settings,
                  email: event.target.value,
                })
              }
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="companyPhone"
              className="mb-2 block font-medium text-slate-700"
            >
              Phone
            </label>

            <input
              id="companyPhone"
              type="tel"
              className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              value={settings.phone}
              onChange={(event) =>
                setSettings({
                  ...settings,
                  phone: event.target.value,
                })
              }
            />
          </div>
        </div>
      <div>
        <label
          htmlFor="companyAddress"
          className="mb-2 block font-medium text-slate-700"
        >
          Address
        </label>

        <textarea
          id="companyAddress"
          rows={4}
          className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          value={settings.address}
          onChange={(event) =>
            setSettings({
              ...settings,
              address: event.target.value,
            })
          }
        />
      </div>

      <button
        type="submit"
        disabled={saving || uploading}
        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}