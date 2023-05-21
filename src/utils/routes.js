const routes = {
  home: {
    label: "Accueuil",
    path: "/",
  },
  signIn: {
    label: "Connexion",
    path: "/sign-in",
  },
  signUp: {
    label: "Inscription",
    path: "/sign-up",
  },
  history: {
    label: "Historique",
    path: "/history",
    authRequired: true,
  },
}

const navbarRoutes = [routes.home, routes.history]

export { routes, navbarRoutes }
