import { cva } from "class-variance-authority"
import NextLink from "next/link"

const variants = cva("", {
  variants: {
    style: {
      primary:
        "rounded-md bg-primary px-3 py-2 font-semibold text-white hover:bg-primary-hover", // button's primary style
      ghost:
        "rounded-md px-3 py-2 bg-transparent hover:bg-gray-200 text-gray-900 font-normal text-sm", // button's ghost style
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
