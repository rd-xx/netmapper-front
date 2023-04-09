import { AppContextProvider } from "@/components/business/AppContext"
import "@/styles/globals.css"

export default function App({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  )
}
