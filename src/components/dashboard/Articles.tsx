import React from "react"
import CardLineChart from "./cards/CardLineChart"
import CardBarChart from "./cards/CardBarChart"
import CardPageVisits from "./cards/CardPageVisits"
import CardSocialTraffic from "./cards/CardSocialTraffic"

const Articles = () => {
  return (
    <>
      <div className="flex flex-wrap mt-[100px]">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
      </div>
    </>
  )
}

export default Articles
