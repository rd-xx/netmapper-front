const Snippet = ({ leftContent = "$", children }) => {
  return (
    <div className="flex w-full flex-row items-center justify-between rounded-md border border-gray-200 bg-gray-100">
      <div className="flex flex-row items-center gap-x-4">
        <div className="flex h-full flex-row items-center justify-center rounded-l-md bg-gray-200 px-3 py-2">
          <code>{leftContent}</code>
        </div>
        <div className="flex flex-col">{children}</div>
      </div>
    </div>
  )
}

export default Snippet
