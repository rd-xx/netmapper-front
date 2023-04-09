import { useField } from "formik"
import clsx from "clsx"

const FormField = (props) => {
  const { className, name, label, placeholder, ...otherProps } = props
  const [field, { error, touched }] = useField({ name })

  return (
    <label className={clsx("flex flex-col gap-2", className)}>
      {label && (
        <span className="text-sm font-medium text-neutral-700">{label}</span>
      )}
      <input
        {...field}
        className={clsx(
          "rounded-md border px-3 py-2 outline-none hover:border-primary focus:border-primary",
          {
            "border-red-500": touched && error,
          }
        )}
        placeholder={placeholder || label}
        {...otherProps}
      />
      {touched && error && (
        <span className="text-sm font-semibold text-red-500">{error}</span>
      )}
    </label>
  )
}

export default FormField
