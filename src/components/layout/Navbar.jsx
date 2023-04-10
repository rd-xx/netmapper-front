import { useAppContext } from "@/components/business/AppContext"
import Button from "@/components/generic/Button"
import Link from "@/components/generic/Link"
import routes from "@/utils/routes"
import Image from "next/image"

const Navbar = () => {
  const {
    state: { session },
    actions: { signOut },
  } = useAppContext()

  return (
    <header className="sticky top-0 z-50 shadow">
      <nav className="flex items-center justify-between px-8 py-2">
        <Link href={routes.home.path}>
          <span className="sr-only">netMAPPER</span>
          <Image width={64} height={64} src="/logo.svg" alt="" />
        </Link>
        <div className="flex gap-x-12">
          {Object.keys(routes).map((key) => {
            const item = routes[key]
            const shouldSkip =
              item.hide || (item.authRequired ? session == null : false)

            if (shouldSkip) {
              return null
            }

            return (
              <Link
                key={item.label}
                href={item.path}
                className="text-sm font-medium leading-6 text-gray-900 hover:text-gray-600"
              >
                {item.label}
              </Link>
            )
          })}
        </div>
        {session ? (
          <Button color="ghost" onClick={signOut}>
            Se déconnecter
          </Button>
        ) : (
          <Link href={routes.signIn.path}>Se connecter &rarr;</Link>
        )}
      </nav>
    </header>
  )
}

export default Navbar
