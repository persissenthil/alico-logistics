type FormInputProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  required?: boolean;
  placeholder?: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

export default function FormInput({
  id,
  label,
  type = "text",
  value,
  required = false,
  placeholder,
  onChange,
}: FormInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-medium text-slate-700"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}