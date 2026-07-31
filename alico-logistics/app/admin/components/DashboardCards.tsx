type DashboardCardsProps = {
  contacts: number;
  quotes: number;
};

export default function DashboardCards({
  contacts,
  quotes,
}: DashboardCardsProps) {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-sm font-medium text-slate-500">
          Contact Messages
        </h2>

        <p className="mt-2 text-3xl font-bold text-slate-900">
          {contacts}
        </p>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-sm font-medium text-slate-500">
          Quote Requests
        </h2>

        <p className="mt-2 text-3xl font-bold text-slate-900">
          {quotes}
        </p>
      </div>
    </div>
  );
}