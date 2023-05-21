import { cva } from "class-variance-authority"
import clsx from "clsx"

const variants = cva("flex", {
  variants: {
    direction: {
      top: "flex-col gap-2",
      right: "flex-row-reverse gap-8 justify-end",
    },
  },
  defaultVariants: {
    direction: "top",
  },
})

const Label = ({ direction, className, label, error, children }) => {
  return (
    <div>
      <div className={clsx(variants({ direction, className }))}>
        {label && (
          <label className="text-sm font-medium text-neutral-700">
            {label}
          </label>
        )}
        {children}
        {error && (
          <span className="text-sm font-semibold text-red-500">{error}</span>
        )}
      </div>
    </div>
  )
}

export default Label
