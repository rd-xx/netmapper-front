import { cva } from "class-variance-authority"
import NextLink from "next/link"

const variants = cva("", {
  variants: {
    style: {
      button:
        "rounded-md bg-primary px-3 py-2 font-semibold text-white hover:bg-primary-hover", // button's default style
    },
  },
})

const Link = ({ className, children, style, ...props }) => {
  return (
    <NextLink {...props}>
      <div className={variants({ style, className })}>{children}</div>
    </NextLink>
  )
}

export default Link
