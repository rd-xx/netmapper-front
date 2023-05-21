import { useState, useEffect } from "react"
import api from "@/services/api"
import { useAppContext } from "@/components/business/AppContext"

const useOptions = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState(null)
  const {
    state: { session },
  } = useAppContext()

  useEffect(() => {
    if (!session) {
      return
    }

    ;(async () => {
      setIsLoading(true)

      // await new Promise((resolve) => setTimeout(resolve, 2000))

      const response = await api("/nmap/options")
      const { result } = response.data
      setOptions(result)

      setIsLoading(false)
    })()
  }, [session])

  return { isLoading, options }
}

export default useOptions
