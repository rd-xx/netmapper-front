import { useAppContext } from "@/components/business/AppContext"
import FormField from "@/components/generic/FormField"
import Button from "@/components/generic/Button"
import Alert from "@/components/generic/Alert"
import Form from "@/components/generic/Form"
import Page from "@/components/layout/Page"
import { useRouter } from "next/router"
import { routes } from "@/utils/routes"
import { AxiosError } from "axios"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import * as yup from "yup"

const initialValues = {
  email: "",
  password: "",
}

const validationSchema = yup.object().shape({
  email: yup.string().email().required("Email requis").label("E-mail"),
  password: yup.string().required("Mot de passe requis").label("Mot de passe"),
})

const SignInPage = () => {
  const {
    actions: { signIn },
  } = useAppContext()
  const router = useRouter()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (values) => {
    setError(null)

    try {
      setIsLoading(true)
      await signIn(values)
      router.replace(routes.home.path)
      router.reload()
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data?.error) {
        setError(err.response?.data?.error)
      }
    }

    setIsLoading(false)
  }

  return (
    <Page withoutNavbar>
      <div className="flex flex-col items-center gap-x-48 gap-y-16 lg:flex-row">
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
            Connectez-vous à votre compte
          </h2>

          <div className="mt-8 w-96">
            <div className="rounded-lg bg-white px-10 py-8 shadow">
              <Form
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <FormField name="email" type="email" label="E-mail" />
                <FormField
                  name="password"
                  type="password"
                  label="Mot de passe"
                />
                <Button className="mt-4" type="submit" loading={isLoading}>
                  Se connecter
                </Button>
              </Form>
            </div>
          </div>
        </div>

        {error && (
          <Alert
            title="Il y a eu une erreur lors de la connexion"
            error={error}
          />
        )}
      </div>
    </Page>
  )
}

export default SignInPage
