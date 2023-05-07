import { XCircleIcon } from "@heroicons/react/20/solid"
import { useEffect, useState } from "react"

const Alert = ({ title, error }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false)
    }, 10000)

    return () => {
      clearTimeout(timeId)
    }
  }, [])

  if (!show) {
    return null
  }

  return (
    <div className="absolute right-0 top-0 m-8 rounded-md bg-red-50 p-4 shadow-lg">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{title}</h3>
          <div className="mt-2 text-sm text-red-700">{error}</div>
        </div>
      </div>
    </div>
  )
}

export default Alert
