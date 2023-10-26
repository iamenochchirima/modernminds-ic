import React from "react"
import Sidebar from "../src/components/dashboard/SibeBar"
import Navbar from "../src/components/dashboard/AdminNavBar"
import HeaderStats from "../src/components/dashboard/HeaderStats"
import FooterAdmin from "../src/components/dashboard/FooterAdmin"

const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <Navbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Routes>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/maps" element={<Maps />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/tables" element={<Tables />} />
            {/* <Redirect from="/admin" to="/admin/dashboard" /> */}
          </Routes>
          <FooterAdmin/>
        </div>
      </div>
    </>
  )
}

export default Dashboard
