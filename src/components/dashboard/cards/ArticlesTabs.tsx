import React, { useState } from "react"
import CreateArticle from "../create/CreateArticle"

export default function ArticlesTabs() {
  const [tab, setTab] = React.useState("all")
  const [openCreateModal, setOpenCreateModal] = useState(false)

  const handleCreateAticle = () => {
    setOpenCreateModal(true)
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative flex gap-4 w-full px-4 max-w-full flex-grow flex-1">
              <button
                onClick={() => setTab("all")}
                className={`font-semibold text-base text-blueGray-700 px-4 py-1 whitespace-nowrap  ${
                  tab === "all"
                    ? "bg-indigo-400 text-white shadow-lg"
                    : "bg-white  hover:bg-slate-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setTab("editors")}
                className={`font-semibold text-base text-blueGray-700 px-4 py-1 whitespace-nowrap  ${
                  tab === "editors"
                    ? "bg-indigo-400 text-white shadow-lg"
                    : "bg-white  hover:bg-slate-200"
                }`}
              >
                Editors Note
              </button>
              <button
                onClick={() => setTab("today")}
                className={`font-semibold text-base text-blueGray-700 px-4 py-1 whitespace-nowrap  ${
                  tab === "today"
                    ? "bg-indigo-400 text-white shadow-lg"
                    : "bg-white  hover:bg-slate-200"
                }`}
              >
                Todays Pick
              </button>
              <button
                onClick={() => setTab("top")}
                className={`font-semibold text-base text-blueGray-700 px-4 py-1 whitespace-nowrap  ${
                  tab === "top"
                    ? "bg-indigo-400 text-white shadow-lg"
                    : "bg-white  hover:bg-slate-200"
                }`}
              >
                Top Stories
              </button>
              <button
                onClick={() => setTab("special")}
                className={`font-semibold text-base text-blueGray-700 px-4 py-1 whitespace-nowrap  ${
                  tab === "special"
                    ? "bg-indigo-400 text-white shadow-lg"
                    : "bg-white  hover:bg-slate-200"
                }`}
              >
                Special Articles
              </button>
              <button
                onClick={() => setTab("issue")}
                className={`font-semibold text-base text-blueGray-700 px-4 py-1 whitespace-nowrap  ${
                  tab === "issue"
                    ? "bg-indigo-400 text-white shadow-lg"
                    : "bg-white  hover:bg-slate-200"
                }`}
              >
                By Issue
              </button>
              <button
                onClick={() => setTab("archived")}
                className={`font-semibold text-base text-blueGray-700 px-4 py-1 whitespace-nowrap  ${
                  tab === "archived"
                    ? "bg-indigo-400 text-white shadow-lg"
                    : "bg-white  hover:bg-slate-200"
                }`}
              >
                Archived
              </button>
              <button
                onClick={() => setTab("drafts")}
                className={`font-semibold text-base text-blueGray-700 px-4 py-1 whitespace-nowrap  ${
                  tab === "drafts"
                    ? "bg-indigo-400 text-white shadow-lg"
                    : "bg-white  hover:bg-slate-200"
                }`}
              >
                Drafts
              </button>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                onClick={handleCreateAticle}
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Create Article
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Page name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Visitors
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Unique users
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Bounce rate
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  /argon/
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  4,569
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  340
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                  46,53%
                </td>
              </tr>
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  /argon/index.html
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  3,985
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  319
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-arrow-down text-orange-500 mr-4"></i>
                  46,53%
                </td>
              </tr>
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  /argon/charts.html
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  3,513
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  294
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-arrow-down text-orange-500 mr-4"></i>
                  36,49%
                </td>
              </tr>
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  /argon/tables.html
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  1 whitespace-nowrap{" "}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  147
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                  50,87%
                </td>
              </tr>
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  /argon/profile.html
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  1,795
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  190
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-arrow-down text-red-500 mr-4"></i>
                  46,53%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {openCreateModal && <CreateArticle {...{setOpenCreateModal}} />}
    </>
  )
}
