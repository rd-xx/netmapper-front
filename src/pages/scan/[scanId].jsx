import {
  ArrowPathIcon,
  CalendarDaysIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/20/solid"
import { Fragment, useCallback, useEffect, useState } from "react"
import { useAppContext } from "@/components/business/AppContext"
import LoadingPage from "@/components/layout/LoadingPage"
import Spinner from "@/components/generic/Spinner"
import { buildDatetime } from "@/utils/builders"
import Page from "@/components/layout/Page"
import { routes } from "@/utils/routes"
import { useRouter } from "next/router"

export const getServerSideProps = ({ params }) => ({
  props: {
    params: {
      scanId: params.scanId,
    },
  },
})

const ScanPage = (props) => {
  const [scan, setScan] = useState(null)
  const { scanId } = props.params
  const {
    actions: { getScan },
  } = useAppContext()
  const router = useRouter()

  useEffect(() => {
    const handleScan = async () => {
      const scanFromApi = await getScan(scanId)
      setScan(scanFromApi)

      return scanFromApi.status
    }

    try {
      const intervalId = setInterval(async () => {
        const status = await handleScan()

        if (status === "done") {
          clearInterval(intervalId)
        }
      }, 1000)
    } catch (err) {
      router.replace(routes.home.path)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanId])

  const renderLines = useCallback((stringArray) => {
    return stringArray.map((x) =>
      x.split(/\n/g).map((line, i) => (
        <Fragment key={i}>
          {line}
          <br />
        </Fragment>
      ))
    )
  }, [])

  const renderField = useCallback((field, value, Icon) => {
    return (
      <>
        <div className="flex items-center gap-4">
          <Icon className="h-8 w-8 text-slate-800" />
          <p className="text-xl text-slate-800">{field} :</p>
        </div>
        <p className="flex items-center gap-4 text-xl font-semibold">{value}</p>
      </>
    )
  }, [])

  if (scan === null) {
    return (
      <Page>
        <LoadingPage />
      </Page>
    )
  }

  return (
    <Page>
      <div className="flex h-full w-full flex-col gap-8 p-8 lg:flex-row">
        <div className="w-full rounded-lg border border-slate-200 bg-slate-100 p-4 shadow-lg lg:w-1/2">
          <p>{renderLines(scan.response)}</p>
          <p className="font-medium text-red-500">{renderLines(scan.error)}</p>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center gap-4 p-4">
            <h2 className="mb-10 text-3xl font-semibold">Informations</h2>
            <div>
              <div className="grid grid-cols-2 items-center gap-8">
                {renderField("Cible", scan.target, ComputerDesktopIcon)}
                {renderField(
                  "État",
                  scan.status === "done" ? (
                    "Fini"
                  ) : (
                    <>
                      En cours <Spinner />
                    </>
                  ),
                  ArrowPathIcon
                )}
                {scan.status === "done" &&
                  renderField(
                    "Date",
                    buildDatetime(new Date(scan.updatedAt)),
                    CalendarDaysIcon
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default ScanPage
