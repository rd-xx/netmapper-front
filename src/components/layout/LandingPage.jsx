import Link from "@/components/generic/Link"
import routes from "@/utils/routes"

const LandingPage = () => {
  return (
    <div className="max-w-2xl text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        netMAPPER
      </h1>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        Explorez votre réseau en profondeur et visualisez toutes les
        informations importantes avec netMAPPER, l'interface graphique pour
        <span className="font-medium"> nmap</span>.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link href={routes.signUp.path} style="button">
          Créer un compte
        </Link>
        <Link href={routes.signIn.path}>Se connecter &rarr;</Link>
      </div>
    </div>
  )
}

export default LandingPage
