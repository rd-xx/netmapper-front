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

  // Checks that the user is allowed to access the current route
  useEffect(() => {
    const allowedRoutesWhenLoggedOut = Object.keys(routes)
      .map((key) => (routes[key]?.authRequired ? null : routes[key].path))
      .filter((route) => route !== null)
    const forbiddenRoutesWhenLoggedIn = Object.keys(routes)
      .map((key) => (routes[key]?.hide ? routes[key].path : null))
      .filter((route) => route !== null)

    const handleRouteChange = (url) => {
      if (!session && !allowedRoutesWhenLoggedOut.includes(url)) {
        replace(routes.home.path)
      } else if (session && forbiddenRoutesWhenLoggedIn.includes(url)) {
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
          signIn,
          signUp,
          signOut,
        },
      }}
    />
  )
}

export default AppContext
