import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import jsonwebtoken from "jsonwebtoken"
import { routes } from "@/utils/routes"
import config from "@/utils/config.js"
import api from "@/services/api.js"

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

export const AppContextProvider = (props) => {
  const [session, setSession] = useState(null)
  const { replace, pathname, events } = useRouter()

  // Auth
  const signIn = async ({ email, password }) => {
    const {
      data: { result: jwt },
    } = await api.post("/sign-in", { email, password })
    const { payload } = jsonwebtoken.decode(jwt)

    localStorage.setItem(config.security.jwt.storageKey, jwt)
    setSession(payload)
  }
  const signUp = async ({ username, email, password }) => {
    await api.post("/sign-up", { username, email, password })
  }
  const signOut = () => {
    localStorage.removeItem(config.security.jwt.storageKey)
    setSession(false)
  }

  useEffect(() => {
    const jwt = localStorage.getItem(config.security.jwt.storageKey)

    if (!jwt) {
      setSession(false)

      return
    }

    const { payload } = jsonwebtoken.decode(jwt)

    setSession(payload)
  }, [])

  const startScan = async (target, options) => {
    const { data } = await api.post("/nmap/scan", { target, options })

    return data.result
  }
  const getScan = async (id) => {
    const { data } = await api.get(`/nmap/scan/${id}`)

    return data.result
  }
  const getScans = async () => {
    const { data } = await api.get("/nmap/scans")

    return data.result
  }

  // Checks that the user is allowed to access the current route
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (session && url === routes.signIn.path) {
        replace(routes.home.path)
      }
    }

    // Check that initial route is OK
    handleRouteChange(pathname)

    // Monitor routes
    events.on("routeChangeStart", handleRouteChange)

    return () => {
      events.off("routeChangeStart", handleRouteChange)
    }
  }, [events, pathname, replace, session])

  return (
    <AppContext.Provider
      {...props}
      value={{
        state: { session },
        actions: {
          // Auth
          signIn,
          signUp,
          signOut,
          // Scans
          startScan,
          getScan,
          getScans,
        },
      }}
    />
  )
}

export default AppContext
