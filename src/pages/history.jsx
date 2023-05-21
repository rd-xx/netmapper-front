import { useAppContext } from "@/components/business/AppContext"
import Badge from "@/components/generic/Badge"
import Link from "@/components/generic/Link"
import { useEffect, useState } from "react"
import Page from "@/components/layout/Page"
import { routes } from "@/utils/routes"
import { useRouter } from "next/router"
import clsx from "clsx"

export default function Example() {
  const [scans, setScans] = useState([])
  const {
    actions: { getScans },
  } = useAppContext()
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const scansFromApi = await getScans()
      setScans(scansFromApi)
    })()
  }, [getScans])

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
                  <th className="border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">
                    Target
                  </th>
                  <th className="border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Options
                  </th>
                  <th className="hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell">
                    Status
                  </th>
                  <th className="hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                    Error
                  </th>
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
                        scanIdx !== scans.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        " py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                      )}
                    >
                      {scan.target}
                    </td>
                    <td
                      className={clsx(
                        scanIdx !== scans.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "space-x-2 px-3 py-4 text-sm text-gray-500"
                      )}
                    >
                      {scan.options.map((x) => (
                        <Badge key={x}>{x}</Badge>
                      ))}
                    </td>
                    <td
                      className={clsx(
                        scanIdx !== scans.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "hidden px-3 py-4 text-sm text-gray-500 md:table-cell"
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
                        scanIdx !== scans.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"
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
