"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";

import ConfirmDialog from "@/app/admin/components/ui/ConfirmDialog";

type Contact = {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  status: string;
  createdAt: Date;
};

type ContactsTableProps = {
  contacts: Contact[];
};

export default function ContactsTable({
  contacts,
}: ContactsTableProps) {
  const router = useRouter();

  const [contactToDelete, setContactToDelete] =
    useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (contactToDelete === null) return;

    setDeleting(true);

    try {
      const response = await fetch(
        `/api/admin/contacts/${contactToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete contact.");
      }

      toast.success("Contact deleted successfully.");
      setContactToDelete(null);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete contact."
      );
    } finally {
      setDeleting(false);
    }
  }

  async function handleStatusChange(
    id: number,
    status: string
  ) {
    try {
      const response = await fetch(
        `/api/admin/contacts/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update contact status."
        );
      }

      toast.success("Contact status updated.");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update contact status."
      );
    }
  }

  return (
    <>
      <section className="mt-10 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-xl font-semibold text-slate-900">
            Recent Contact Messages
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">
                  Subject
                </th>
                <th className="px-4 py-3 text-left">
                  Status
                </th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-t border-slate-200 transition-colors hover:bg-slate-50"
                >
                  <td className="px-4 py-3">
                    {contact.name}
                  </td>

                  <td className="px-4 py-3">
                    {contact.email}
                  </td>

                  <td className="px-4 py-3">
                    {contact.subject || "-"}
                  </td>

                  <td className="px-4 py-3">
                    <select
                      value={contact.status}
                      onChange={(event) =>
                        handleStatusChange(
                          contact.id,
                          event.target.value
                        )
                      }
                      className={`rounded-full border-0 px-3 py-1 text-sm font-medium outline-none ${
                        contact.status === "New"
                          ? "bg-green-100 text-green-700"
                          : contact.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : contact.status === "Replied"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="In Progress">
                        In Progress
                      </option>
                      <option value="Replied">
                        Replied
                      </option>
                      <option value="Closed">
                        Closed
                      </option>
                    </select>
                  </td>

                  <td className="px-4 py-3">
                    {contact.createdAt.toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/contacts/${contact.id}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          setContactToDelete(contact.id)
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {contacts.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-slate-500"
                  >
                    No contact messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <ConfirmDialog
        open={contactToDelete !== null}
        title="Delete contact"
        description="Are you sure you want to permanently delete this contact message? This action cannot be undone."
       confirming={deleting}
        onCancel={() => {
          if (!deleting) {
            setContactToDelete(null);
          }
        }}
        onConfirm={handleDelete}
      />
    </>
  );
}