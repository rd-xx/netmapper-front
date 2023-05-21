import { useAppContext } from "@/components/business/AppContext"
import Badge from "@/components/generic/Badge"
import Link from "@/components/generic/Link"
import { useEffect, useState } from "react"
import Page from "@/components/layout/Page"
import { routes } from "@/utils/routes"
import { useRouter } from "next/router"
import clsx from "clsx"

const tableHeadersCommonClasses =
  "border-b border-gray-300 bg-slate-100 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
const tableDataCommonClasses = "px-3 py-4 text-sm text-gray-500"

const tableHeaders = [
  {
    label: "Target",
    className: "sm:pl-6 lg:pl-8",
  },
  {
    label: "Option",
  },
  {
    label: "Status",
    className: "hidden md:table-cell",
  },
  {
    label: "Error",
    className: "hidden lg:table-cell",
  },
]

const History = () => {
  const [scans, setScans] = useState([])
  const {
    state: { session },
    actions: { getScans },
  } = useAppContext()
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      try {
        const scansFromApi = await getScans()
        setScans(scansFromApi)
      } catch (err) {
        router.replace(routes.home.path)
      }
    })()
  }, [getScans, router, session])

  return (
    <Page>
      <div className="h-full w-full p-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Historique
            </h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link href={routes.home.path} style="primary">
              Nouveau scan
            </Link>
          </div>
        </div>
        <div className="mt-8">
          <div className="inline-block w-full align-middle">
            <table className="w-full table-auto border-separate border-spacing-0">
              <thead>
                <tr>
                  {tableHeaders.map(({ label, className }) => (
                    <th
                      key={label}
                      className={clsx(className, tableHeadersCommonClasses)}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scans.map((scan, scanIdx) => (
                  <tr
                    key={scan._id}
                    className="even:bg-gray-100 hover:cursor-pointer hover:bg-gray-200"
                    onClick={() => router.push("/scan/" + scan._id)}
                  >
                    <td
                      className={clsx(
                        "py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8",
                        {
                          ["border-b border-gray-200"]:
                            scanIdx !== scans.length - 1,
                        }
                      )}
                    >
                      {scan.target}
                    </td>
                    <td
                      className={clsx("space-x-2", tableDataCommonClasses, {
                        ["border-b border-gray-200"]:
                          scanIdx !== scans.length - 1,
                      })}
                    >
                      {scan.options.map((x) => (
                        <Badge key={x}>{x}</Badge>
                      ))}
                    </td>
                    <td
                      className={clsx(
                        "hidden md:table-cell",
                        tableDataCommonClasses,
                        {
                          ["border-b border-gray-200"]:
                            scanIdx !== scans.length - 1,
                        }
                      )}
                    >
                      <Badge
                        color={scan.status === "done" ? "success" : "warning"}
                        loading={scan.status === "ongoing"}
                      >
                        {scan.status === "done" ? "Fini" : "En cours"}
                      </Badge>
                    </td>
                    <td
                      className={clsx(
                        "hidden lg:table-cell",
                        tableDataCommonClasses,
                        {
                          ["border-b border-gray-200"]:
                            scanIdx !== scans.length - 1,
                        }
                      )}
                    >
                      <Badge color={scan.error.length ? "error" : "success"}>
                        {scan.error.length ? "Oui" : "Non"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default History
