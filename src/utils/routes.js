const routes = {
  home: {
    label: "Home",
    path: "/",
  },
  signIn: {
    label: "Sign in",
    path: "/sign-in",
    hide: true,
  },
  signUp: {
    label: "Sign up",
    path: "/sign-up",
    hide: true,
  },
  history: {
    label: "History",
    path: "/history",
    authRequired: true,
  },
}

export default routes
