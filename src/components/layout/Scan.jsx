import { useAppContext } from "@/components/business/AppContext"
import LoadingPage from "@/components/layout/LoadingPage"
import { cleanRegExp, ipSchema } from "@/utils/schemas"
import FormField from "@/components/generic/FormField"
import { buildCommandPreview } from "@/utils/builders"
import Checkbox from "@/components/generic/Checkbox"
import Divider from "@/components/generic/Divider"
import Snippet from "@/components/generic/Snippet"
import Button from "@/components/generic/Button"
import { useCallback, useState } from "react"
import Form from "@/components/generic/Form"
import useOptions from "@/hooks/useOptions"
import { useRouter } from "next/router"
import * as yup from "yup"

const initialValues = {
  target: "",
}

const validationSchema = yup.object().shape({
  target: ipSchema,
})

const Scan = () => {
  const { isLoading, options } = useOptions()
  const [activeInputOptions, setActiveInputOptions] = useState([])
  const [activeNoInputOptions, setActiveNoInputOptions] = useState([])
  const [newValidationSchema, setNewValidationSchema] =
    useState(validationSchema)
  const {
    actions: { startScan },
  } = useAppContext()
  const router = useRouter()

  const handleAddInputOption = useCallback(
    (option) => {
      const optionName = option.target.id
      const checked = option.target.checked

      if (checked) {
        setActiveInputOptions((prev) => [
          ...prev,
          options.inputOptions.find((x) => x.key === optionName),
        ])

        setNewValidationSchema((prev) =>
          prev.concat(
            yup.object().shape({
              [optionName]: yup
                .string()
                .matches(
                  new RegExp(
                    cleanRegExp(
                      options.inputOptions.find((x) => x.key === optionName)
                        .validator
                    )
                  ),
                  "Champ invalide"
                )
                .required(),
            })
          )
        )
      } else {
        setActiveInputOptions((prev) =>
          prev.filter((x) => x.key !== optionName)
        )

        setNewValidationSchema((prev) => prev.omit([optionName]))
      }
    },
    [options?.inputOptions]
  )

  const handleAddOption = useCallback(
    (option) => {
      const optionName = option.target.id
      const checked = option.target.checked

      if (checked) {
        setActiveNoInputOptions((prev) => [
          ...prev,
          options.noInputOptions.find((x) => x === optionName),
        ])
      } else {
        setActiveNoInputOptions((prev) => prev.filter((x) => x !== optionName))
      }
    },
    [options?.noInputOptions]
  )

  const handleSubmit = useCallback(
    async (values) => {
      const targetValue = values.target
      const inputOptionsValues = activeInputOptions.map(
        (x) => `${x.key}=${values[x.key]}`
      )
      const noInputOptionsValues = activeNoInputOptions

      const options = inputOptionsValues.concat(noInputOptionsValues)

      const { _id: scanId } = await startScan(targetValue, options)
      router.push(`/scan/${scanId}`)
    },
    [activeInputOptions, activeNoInputOptions, router, startScan]
  )

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <div className="flex w-full flex-col items-center gap-y-10 lg:w-auto lg:flex-row-reverse lg:gap-x-48">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          netMAPPER
        </h1>
        <Divider />
        <h2 className="items-end text-end text-xl">Options</h2>
        <div>
          <div>
            <h4 className="text-lg">— avec input</h4>
            <div className="mb-2 grid grid-cols-2">
              {options?.inputOptions.map((option) => (
                <Checkbox
                  key={option.key}
                  label={option.key}
                  onChange={handleAddInputOption}
                />
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg">— sans input</h4>
            <div className="grid grid-cols-2">
              {options?.noInputOptions.map((optionKey) => (
                <Checkbox
                  key={optionKey}
                  label={optionKey}
                  onChange={handleAddOption}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-4/5 rounded-lg border border-slate-200 bg-slate-100 py-8 shadow-lg lg:w-[500px]">
        <Form
          className="px-10"
          initialValues={initialValues}
          validationSchema={newValidationSchema}
          onSubmit={handleSubmit}
        >
          <FormField name="target" label="Adresse IP" />
          {activeInputOptions.map((x) => (
            <FormField key={x.key} name={x.key} label={x.label} />
          ))}
          <Button type="submit">Submit</Button>
        </Form>
        <Divider />
        <div className="px-10">
          Preview
          <Snippet>
            {buildCommandPreview(activeInputOptions, activeNoInputOptions)}
          </Snippet>
        </div>
      </div>
    </div>
  )
}

export default Scan
