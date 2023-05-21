import { useField } from "formik"
import clsx from "clsx"
import Label from "@/components/generic/Label"

const FormField = (props) => {
  const { className, direction, name, label, placeholder, ...otherProps } =
    props
  const [field, { error, touched }] = useField({ name })

  return (
    <Label
      direction={direction}
      className={className}
      label={label}
      error={touched && error ? error : null}
    >
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
    </Label>
  )
}

export default FormField
