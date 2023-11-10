import React from "react"
import ArticlesTabs from "./cards/ArticlesTabs"


const Articles = () => {

  return (
    <>
      <div className="flex flex-wrap mt-[100px]">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <ArticlesTabs />
        </div>
      </div>
    </>
  )
}

export default Articles
