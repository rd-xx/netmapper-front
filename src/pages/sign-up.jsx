import { useAppContext } from "@/components/business/AppContext"
import FormField from "@/components/generic/FormField"
import Button from "@/components/generic/Button"
import Alert from "@/components/generic/Alert"
import Form from "@/components/generic/Form"
import Link from "@/components/generic/Link"
import Page from "@/components/layout/Page"
import { useRouter } from "next/router"
import routes from "@/utils/routes"
import Image from "next/image"
import * as yup from "yup"
import { useState } from "react"
import { AxiosError } from "axios"

const initialValues = {
  username: "",
  email: "",
  password: "",
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("Nom d'utilisateur requis")
    .label("Nom d'utilisateur"),
  email: yup.string().email().required("E-mail requis").label("E-mail"),
  password: yup
    .string()
    .min(8, "Mot de passe doit contenir au moins 8 caractères")
    .matches(
      /^.*(?=.*[0-9]+).*$/,
      "Mot de passe doit contenir au moins un chiffre"
    )
    .matches(
      /^.*(?=.*\p{Ll}+).*$/u,
      "Mot de passe doit contenir au moins une lettre minuscule"
    )
    .matches(
      /^.*(?=.*\p{Lu}+).*$/u,
      "Mot de passe doit contenir au moins une lettre majuscule"
    )
    .matches(
      /^.*(?=.*[^0-9\p{L}]+).*$/u,
      "Mot de passe doit contenir au moins un caractère spécial"
    )
    .required("Mot de passe requis")
    .label("Mot de passe"),
})

const SignUpPage = () => {
  const {
    actions: { signUp },
  } = useAppContext()
  const router = useRouter()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (values) => {
    setError(null)

    try {
      setIsLoading(true)
      await signUp(values)
      router.push(routes.signIn.path)
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data?.error) {
        setError(err.response?.data?.error)
      }
    }

    setIsLoading(false)
  }

  return (
    <Page withoutNavbar>
      <div className="flex items-center gap-x-48">
        <Link href={routes.home.path}>
          <Image
            width={256}
            height={256}
            src="/logo_full.svg"
            alt="netMAPPER"
          />
        </Link>
        <div className="flex flex-col items-center">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Inscrivez-vous
          </h2>
          <div className="mt-8 w-96">
            <div className="rounded-lg bg-white px-10 py-8 shadow">
              <Form
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <FormField name="username" label="Nom d'utilisateur" />
                <FormField name="email" type="email" label="E-mail" />
                <FormField
                  name="password"
                  type="password"
                  label="Mot de passe"
                />
                <div className="flex justify-end">
                  <Link href={routes.signIn.path} style="link">
                    Déjà un compte ? Connectez-vous &rarr;
                  </Link>
                </div>
                <Button className="mt-4" type="submit" loading={isLoading}>
                  S'inscrire
                </Button>
              </Form>
            </div>
          </div>
        </div>
        {error && (
          <Alert
            title="Il y a eu une erreur lors de la création du compte"
            error={error}
          />
        )}
      </div>
    </Page>
  )
}

export default SignUpPage