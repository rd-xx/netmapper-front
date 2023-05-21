import { useAppContext } from "@/components/business/AppContext"
import { routes, navbarRoutes } from "@/utils/routes"
import Button from "@/components/generic/Button"
import Link from "@/components/generic/Link"
import Image from "next/image"

const Navbar = () => {
  const {
    state: { session },
    actions: { signOut },
  } = useAppContext()

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <nav className="flex items-center justify-between px-8 py-2">
        <Link href={routes.home.path}>
          <span className="sr-only">netMAPPER</span>
          <Image width={64} height={64} src="/logo.svg" alt="" />
        </Link>
        <div className="flex gap-x-12">
          {session &&
            navbarRoutes.map((item) => {
              const shouldSkip =
                item.hide || (item.authRequired ? session == false : false)

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
