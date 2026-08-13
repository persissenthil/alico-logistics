"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useRef, useState } from "react";
import FormTextarea from "@/app/admin/components/ui/FormTextarea";
import FormInput from "@/app/admin/components/ui/FormInput";

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
  const [selectedFile, setSelectedFile] =
  useState<File | null>(null);

  async function handleLogoUpload() {
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      toast.error("Please choose a logo.");
      return;
    }

    const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/webp",
        "image/svg+xml",
      ];

      if (!allowedTypes.includes(file.type)) {
        toast.error(
          "Please upload a PNG, JPG, WebP or SVG file."
        );
        return;
      }

      const maxFileSize = 2 * 1024 * 1024;

      if (file.size > maxFileSize) {
        toast.error(
          "Logo file size must be 2 MB or smaller."
        );
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
     setSelectedFile(null);
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

  const companyName = settings.companyName.trim();
  const email = settings.email.trim();
  const phone = settings.phone.trim();

  if (!companyName) {
    toast.error("Company name is required.");
    return;
  }

  if (!email) {
    toast.error("Email is required.");
    return;
  }

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    toast.error("Please enter a valid email address.");
    return;
  }
  const phonePattern =
  /^(?:\+44|0)[0-9\s()-]+$/;

if (phone && !phonePattern.test(phone)) {
  toast.error(
    "Please enter a valid UK phone number starting with +44 or 0."
  );
  return;
}

const phoneDigits = phone.replace(/\D/g, "");

if (phone && phoneDigits.length < 10) {
  toast.error("Please enter a valid UK phone number.");
  return;
}

/*const phonePattern = /^\+?[0-9\s()-]+$/;

if (phone && !phonePattern.test(phone)) {
  toast.error(
    "Phone number can only contain numbers, spaces, +, -, ( and )."
  );
  return;
}

if (phone && phone.replace(/\D/g, "").length < 7) {
  toast.error("Please enter a valid phone number.");
  return;
}*/
  setSaving(true);

    try {
      const response = await fetch(
        "/api/admin/settings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...settings,
            companyName,
            email,
            phone,
          }),
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
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;
            setSelectedFile(file);
          }}
          className="mb-4 block w-full rounded-lg border border-slate-300 bg-white p-3 text-sm"
        />        

        <p className="mb-4 text-sm text-slate-500">
          PNG, JPG, WebP or SVG. Maximum file size: 2 MB.
        </p>

        <button
          type="button"
          onClick={handleLogoUpload}
          disabled={uploading || !selectedFile}
          className="rounded-lg bg-slate-900 px-5 py-2 font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload Logo"}
        </button>
      </div>
<div className="rounded-xl border border-slate-200 bg-white p-6">
  <h2 className="mb-5 text-lg font-semibold text-slate-900">
    Company Information
  </h2>

  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
    <FormInput
      id="companyName"
      label="Company Name"
      required
      value={settings.companyName}
      onChange={(event) =>
        setSettings({
          ...settings,
          companyName: event.target.value,
        })
      }
    />

    <FormInput
      id="companyEmail"
      label="Email"
      type="email"
      required
      value={settings.email}
      onChange={(event) =>
        setSettings({
          ...settings,
          email: event.target.value,
        })
      }
    />

    <div className="md:col-span-2">
      <FormInput
        id="companyPhone"
        label="Phone"
        type="tel"
        value={settings.phone}
        onChange={(event) =>
          setSettings({
            ...settings,
            phone: event.target.value,
          })
        }
      />
    </div>

    <div className="md:col-span-2">
      <FormTextarea
        id="companyAddress"
        label="Address"
        rows={4}
        value={settings.address}
        onChange={(event) =>
          setSettings({
            ...settings,
            address: event.target.value,
          })
        }
      />
    </div>
  </div>
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