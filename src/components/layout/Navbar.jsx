import { useAppContext } from "@/components/business/AppContext"
import routes from "@/utils/routes"
import Image from "next/image"

const Navbar = () => {
  const {
    state: { session },
  } = useAppContext()

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-indigo-200">
      <nav
        className="flex items-center justify-between px-8"
        aria-label="Global"
      >
        <div className="flex flex-1">
          <a href="#">
            <span className="sr-only">netMAPPER</span>
            <Image width={64} height={64} src="/logo.svg" alt="" />
          </a>
        </div>
        <div className="flex gap-x-12">
          {Object.keys(routes).map((key) => {
            const item = routes[key]
            const shouldSkip =
              item.hide || (item.authRequired ? !session : false)

            if (shouldSkip) {
              return null
            }

            return (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            )
          })}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
