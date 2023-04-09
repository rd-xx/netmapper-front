import Navbar from "@/components/layout/Navbar"

const Page = ({ children, withoutNavbar = false }) => {
  if (withoutNavbar) {
    return (
      <div className="grid min-h-screen place-items-center bg-gray-50">
        {children}
      </div>
    )
  } else {
    return (
      <div className="flex h-screen flex-col bg-gray-50">
        <Navbar />
        <div className="grid flex-1 place-items-center">{children}</div>
      </div>
    )
  }
}

export default Page
