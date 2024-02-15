import AdminSidebar from "@/components/AdminSidebar"
import { ReactNode } from "react"

interface Props {
    children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div>
        <h1 className="text-center pb-lg-4 pt-4 pb-2">Admin Dashboard</h1>
      <div className="px-lg-5 px-md-3 px-2 d-flex flex-lg-row flex-column justify-content-lg-between align-items-lg-start align-items-center">
        <div className="col-lg-3 col-10 mb-5"><AdminSidebar /></div>
        <div className="col-lg-8 col-12">{children}</div>
      </div>
    </div>
  )
}

export default AdminLayout
