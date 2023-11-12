import React, { useState } from "react"
import Sidebar from "../components/dashboard/SibeBar"
import Articles from "../components/dashboard/Articles"
import Maps from "../components/dashboard/Maps"
import Settings from "../components/dashboard/Settings"
import Tables from "../components/dashboard/Tables"
import Navbar from "../components/dashboard/AdminNavBar"

const Dashboard = () => {
  const [tab, setTab] = useState(0)

  return (
    <div className="font-graphik">
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
    </div>
  )
}

export default Dashboard
