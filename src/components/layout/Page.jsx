import Navbar from "@/components/layout/Navbar"

const Page = ({ children }) => (
  <div className="min-h-screen bg-white">
    <Navbar />
    <div>{children}</div>
  </div>
)

export default Page
