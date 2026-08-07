type StatCardProps = {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  iconBg?: string;
  metricOneLabel?: string;
  metricOneValue?: number | string;
  metricTwoLabel?: string;
  metricTwoValue?: number | string;
};

export default function StatCard({
  title,
  value,
  icon,
  iconBg = "bg-blue-600",
  metricOneLabel,
  metricOneValue,
  metricTwoLabel,
  metricTwoValue,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900">
            {value}
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

      {(metricOneLabel || metricTwoLabel) && (
        <div className="mt-4 flex justify-between border-t border-slate-200 pt-3">
          <div>
            <p className="text-xs text-slate-500">
              {metricOneLabel}
            </p>

            <p className="mt-1 text-lg font-semibold text-slate-900">
              {metricOneValue}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">
              {metricTwoLabel}
            </p>

            <p className="mt-1 text-lg font-semibold text-slate-900">
              {metricTwoValue}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}