import UserSidebar from "@/components/UserSidebar"
import { ReactNode } from "react"

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
        <h1 className="text-center pb-lg-4 pt-4 pb-2">User Settings</h1>
      <div className="container d-flex flex-lg-row flex-column justify-content-lg-between align-items-lg-start align-items-center">
        <div className="col-lg-4 col-10 mb-5"><UserSidebar /></div>
        <div className="col-lg-7 col-12">{children}</div>
      </div>
    </div>
  )
}

export default layout
