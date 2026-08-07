type PeriodStatCardProps = {
  title: string;
  today: number;
  week: number;
  month: number;
  icon?: React.ReactNode;
  iconBg?: string;
};

export default function PeriodStatCard({
  title,
  today,
  week,
  month,
  icon,
  iconBg = "bg-green-600",
}: PeriodStatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900">
            {today}
          </h2>
        </div>

        {icon && (
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between border-t border-slate-200 pt-3">
        <div>
          <p className="text-xs text-slate-500">
            This Week
          </p>

          <p className="mt-1 text-lg font-semibold text-slate-900">
            {week}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            This Month
          </p>

          <p className="mt-1 text-lg font-semibold text-slate-900">
            {month}
          </p>
        </div>
      </div>
    </div>
  );
}