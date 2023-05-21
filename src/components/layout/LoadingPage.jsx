import Spinner from "@/components/generic/Spinner"

const LoadingPage = () => {
  return (
    <div className="flex max-w-2xl flex-col items-center">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        netMAPPER
      </h1>
      <Spinner size="xl" />
    </div>
  )
}

export default LoadingPage
