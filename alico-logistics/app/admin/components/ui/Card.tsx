import { ReactNode } from "react";

type CardProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export default function Card({
  title,
  description,
  children,
  className = "",
}: CardProps) {
  return (
    <section
      className={`rounded-xl border border-slate-200 bg-white p-8 shadow-sm ${className}`}
    >
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h2 className="text-xl font-semibold text-slate-900">
              {title}
            </h2>
          )}

          {description && (
            <p className="mt-1 text-slate-600">
              {description}
            </p>
          )}
        </div>
      )}

      {children}
    </section>
  );
}