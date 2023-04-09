import { cva } from "class-variance-authority"

const variants = cva("rounded-md px-3 py-2 font-semibold", {
  variants: {
    color: {
      primary: "bg-primary hover:bg-primary-hover text-white",
      ghost:
        "bg-transparent hover:bg-gray-200 text-gray-900 font-normal text-sm",
    },
  },
  defaultVariants: {
    color: "primary",
  },
})

const Button = ({ className, color, children, onClick }) => (
  <button className={variants({ color, className })} onClick={onClick}>
    {children}
  </button>
)

export default Button
