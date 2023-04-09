import { createContext, useContext, useEffect, useState } from "react"
import jsonwebtoken from "jsonwebtoken"
import config from "@/utils/config.js"
import api from "@/services/api.js"

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

export const AppContextProvider = (props) => {
  const [session, setSession] = useState(null)

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
