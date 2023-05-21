const Snippet = ({ leftContent = "$", children }) => {
  return (
    <div className="flex w-full flex-row items-center justify-between rounded-md border border-gray-200 bg-gray-100 px-4 py-2">
      <div className="flex flex-row items-center gap-x-4">
        <div className="flex h-8 w-8 flex-row items-center justify-center rounded-md bg-gray-200">
          {leftContent}
        </div>
        <div className="flex flex-col">{children}</div>
      </div>
    </div>
  )
}

export default Snippet
