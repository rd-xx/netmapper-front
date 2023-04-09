const config = {
  api: {
    baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
  },
  security: {
    jwt: {
      storageKey: "blog_session_jwt",
    },
  },
}

export default config
