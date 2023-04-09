import { useAppContext } from "@/components/business/AppContext"
import FormField from "@/components/generic/FormField"
import Button from "@/components/generic/Button"
import Form from "@/components/generic/Form"
import Link from "@/components/generic/Link"
import Page from "@/components/layout/Page"
import { useRouter } from "next/router"
import routes from "@/utils/routes"
import Image from "next/image"
import * as yup from "yup"

const initialValues = {
  email: "",
  password: "",
}

const validationSchema = yup.object().shape({
  email: yup.string().email().required().label("E-mail"),
  password: yup.string().required("Mot de passe requis").label("Mot de passe"),
})

const SignInPage = () => {
  const {
    actions: { signIn },
  } = useAppContext()
  const router = useRouter()
  const handleSubmit = async (values) => {
    try {
      await signIn(values)
      router.push(routes.home.path)
    } catch (err) {
      // TODO: handle error
    }
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
        <div>
          <h2 className="mt-8 text-center text-3xl font-bold text-gray-900">
            Connectez-vous à votre compte
          </h2>

          <div className="mt-8 w-full">
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
                <Button type="submit" className="mt-4">
                  Se connecter
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default SignInPage
