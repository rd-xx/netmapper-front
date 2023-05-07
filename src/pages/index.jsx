import { useAppContext } from "@/components/business/AppContext"
import LandingPage from "@/components/layout/LandingPage"
import Page from "@/components/layout/Page"
import Scan from "@/components/layout/Scan"

const HomePage = () => {
  const {
    state: { session },
  } = useAppContext()

  return <Page>{session ? <Scan /> : <LandingPage />}</Page>
}

export default HomePage
