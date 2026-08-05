type FormTextareaProps = {
  id: string;
  label: string;
  rows?: number;
  value: string;
  placeholder?: string;
  onChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
};

export default function FormTextarea({
  id,
  label,
  rows = 4,
  value,
  placeholder,
  onChange,
}: FormTextareaProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-medium text-slate-700"
      >
        {label}
      </label>

      <textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}