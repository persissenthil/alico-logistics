"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

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
async function handleDelete(id: number) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this contact?"
  );

  if (!confirmed) return;

  const response = await fetch(`/api/admin/contacts/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    router.refresh();
  } else {
    alert("Failed to delete contact.");
  }
}

async function handleStatusChange(id: number, status: string) {
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

  if (response.ok) {
    router.refresh();
  } else {
    alert("Failed to update contact status.");
  }
}

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-2xl font-semibold text-slate-900">
        Recent Contact Messages
      </h2>

      <div className="overflow-x-auto rounded-lg bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Subject</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Actions</th>
              
            </tr>
          </thead>

          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-t">
                <td className="px-4 py-3">{contact.name}</td>
                <td className="px-4 py-3">{contact.email}</td>
                <td className="px-4 py-3">
                  {contact.subject || "-"}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={contact.status}
                    onChange={(event) =>
                      handleStatusChange(contact.id, event.target.value)
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
                    <option value="In Progress">In Progress</option>
                    <option value="Replied">Replied</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  {contact.createdAt.toLocaleDateString()}
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/contacts/${contact.id}`}
                      className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}