const routes = {
  home: {
    label: "Home",
    path: "/",
  },
  signIn: {
    label: "Sign in",
    path: "/sign-in",
  },
  signUp: {
    label: "Sign up",
    path: "/sign-up",
  },
  history: {
    label: "History",
    path: "/history",
    authRequired: true,
  },
}

const navbarRoutes = [routes.home, routes.history]

export { routes, navbarRoutes }
