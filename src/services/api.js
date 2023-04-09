import config from "@/utils/config"
import axios from "axios"

const api = axios.create({
  baseURL: config.api.baseURL,
  get headers() {
    return {
      authorization:
        typeof localStorage !== "undefined"
          ? localStorage.getItem(config.security.jwt.storageKey)
          : null,
    }
  },
})

export default api
