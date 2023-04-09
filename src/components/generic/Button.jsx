import { cva } from "class-variance-authority"

const variants = cva("", {
  variants: {
    color: {
      primary: "bg-blue-500 hover:bg-blue-700 text-white",
    },
  },
  defaults: {
    color: "primary",
  },
})

const Button = ({ className, color, children, onClick }) => (
  <button className={variants({ color, className })} onClick={onClick}>
    {children}
  </button>
)

export default Button
