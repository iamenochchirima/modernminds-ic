import React, { useState } from "react"
import Sidebar from "../src/components/dashboard/SibeBar"
import Navbar from "../src/components/dashboard/AdminNavBar"
import HeaderStats from "../src/components/dashboard/HeaderStats"
import FooterAdmin from "../src/components/dashboard/FooterAdmin"
import Maps from "../src/components/dashboard/Maps"
import Settings from "../src/components/dashboard/Settings"
import Tables from "../src/components/dashboard/Tables"
import Articles from "../src/components/dashboard/Articles"

const Dashboard = () => {
  const [tab, setTab] = useState(0)

  return (
    <>
      <Sidebar {...{setTab, tab}} />
      <div className="relative md:ml-64 bg-blueGray-100">
        <Navbar {...{setTab, tab}} />
        {/* Header */}
        {/* <HeaderStats /> */}
        <div className="px-4 py-5 md:px-10 mx-auto w-full -m-24">
          {tab === 0 && <Articles />}
          {tab === 1 && <Maps />}
          {tab === 2 && <Settings />}
          {tab === 3 && <Tables />}
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  )
}

export default Dashboard
