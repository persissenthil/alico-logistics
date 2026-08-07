import { formatDistanceToNow } from "date-fns";
import Link from "next/link";


type Activity = {
  id: number;
  type: "contact" | "quote";
  name: string;
  createdAt: Date;
};

type RecentActivityProps = {
  activities: Activity[];
};

export default function RecentActivity({
  activities,
}: RecentActivityProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <h2 className="text-xl font-semibold text-slate-900">
          Recent Activity
        </h2>

        <Link
          href="/admin/activity"
          className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          View All →
        </Link>
      </div>

      <div className="divide-y divide-slate-200">
        {activities.length === 0 ? (
          <div className="px-6 py-10 text-center text-slate-500">
            No recent activity.
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={`${activity.type}-${activity.id}`}
              className="px-6 py-3"
            >
 
            <div>
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    activity.type === "contact"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {activity.type === "contact"
                    ? "Contact"
                    : "Quote"}
                </span>

                <Link
                  href={
                    activity.type === "contact"
                      ? `/admin/contacts/${activity.id}`
                      : `/admin/quotes/${activity.id}`
                  }
                  className="font-medium text-slate-900 transition hover:text-blue-600 hover:underline"
                >
                  {activity.type === "contact"
                    ? `New contact from ${activity.name}`
                    : `New quote request from ${activity.name}`}
                </Link>
              </div>
                <p
                  className="mt-2 text-xs text-slate-500"
                  title={activity.createdAt.toLocaleString()}
                >
                  {formatDistanceToNow(activity.createdAt, {
                    addSuffix: true,
                  })}
                  {" • "}
                  {activity.createdAt.toLocaleDateString()}
                </p>
            </div>

            </div>
          ))
        )}
      </div>
    </section>
  );
}