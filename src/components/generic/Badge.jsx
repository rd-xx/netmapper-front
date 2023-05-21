import Spinner from "@/components/generic/Spinner"
import { cva } from "class-variance-authority"
import clsx from "clsx"

const variants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium gap-2 shadow",
  {
    variants: {
      color: {
        neutral: "bg-gray-200/70 text-gray-800",
        success: "bg-green-100 text-green-800",
        error: "bg-red-100 text-red-800",
        warning: "bg-yellow-100 text-yellow-800",
      },
    },
    defaultVariants: {
      color: "neutral",
    },
  }
)

const Badge = ({ color, className, loading, children, ...rest }) => {
  return (
    <span className={clsx(variants({ color, className }))} {...rest}>
      {children}
      {loading && <Spinner size="sm" />}
    </span>
  )
}

export default Badge
