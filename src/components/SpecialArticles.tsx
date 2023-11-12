// import {
//   useGetSpecialArticlesQuery,
//   useGetCategoriesQuery
// } from "../redux/api/generalApi"
import TodaysPick from "./TodaysPick"
import { ThreeDots } from "react-loader-spinner"
import { useState } from "react"
import { Article, Category } from "../declarations/modernminds_backend/modernminds_backend.did"
import { Link } from "react-router-dom"

const SpecialArticles = () => {
  // const { data: categories } = useGetCategoriesQuery();
  // const {
  //   data: specialData,
  //   isLoading: specialLoading,
  //   isSuccess: specialSuccess,
  //   isError: specialError,
  // } = useGetSpecialArticlesQuery();
  const [categories, setCategories] = useState<[Category] | null>(null)
  const [articles, setArticles] = useState<[Article] | null>(null);
  const [specialLoading, setSpecialLoading] = useState(false)
  const [specialSuccess, setSpecialSuccess] = useState(false)
  const [specialError, setSpecialError] = useState(true)

  return (
    <div className="px-3 ss:px-10  mt-24 grid grid-cols-4 gap-5">
      {specialSuccess && (
        <>
          {articles?.map(article => {
            if (article?.is_top_story === true) {
              return (
                <div
                  key={article.id}
                  className="col-span-4 sm:col-span-2 md:col-span-3 relative text-white "
                >
                  <div className="relative w-full h-[600px]">
                    <div className="absolute w-full h-full flex flex-col px-5 justify-end max-h-[600px] bg-black bg-opacity-30 z-10">
                      <Link
                        className=""
                        to={`/article/${encodeURIComponent(article.slug)}/`}
                      >
                        <span className=" font-graphikSemiBold bg-yellow-700 text-white px-2 py-1">
                          TOP STORY
                        </span>
                        <h1 className="md:text-5xl text-3xl font-bold pt-5">
                          {article.title}
                        </h1>
                      </Link>
                      {categories?.map(category => {
                        if (category.id === article.category) {
                          return (
                            <Link
                              className="mb-10"
                              key={category.id}
                              to={`/category/${encodeURIComponent(
                                category.slug
                              )}/`}
                            >
                              <span className="text-xs border-b border-yellow-400 hover:border-black tracking-widest">
                                {category.name}
                              </span>
                            </Link>
                          )
                        }
                        return null
                      })}
                    </div>
                    <div className="relative w-full h-[600px]">
                      <img
                        src={article?.cover_image}
                        style={{
                          objectFit: "cover"
                        }}
                        className="absolute w-full h-full"
                        alt="Article cover image"
                      />
                    </div>
                  </div>
                </div>
              )
            }
            return null
          })}
        </>
      )}
      {specialError && (
        <div className="font-graphik flex justify-center col-span-4 sm:col-span-2 md:col-span-3 items-center h-screen">
          <h1 className="text-center">Something went wrong</h1>
        </div>
      )}
      {specialLoading && (
        <div className="font-graphik flex justify-center col-span-4 sm:col-span-2 md:col-span-3 items-center h-screen">
          <div className="text-center">
            <ThreeDots
              height="40"
              width="40"
              radius="9"
              color="#333333"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              visible={true}
            />
          </div>
        </div>
      )}

      <div className="col-span-4 sm:col-span-2 md:col-span-1 ">
        <div className="">
          {articles?.map(article => {
            if (article?.is_editor_note === true) {
              return (
                <div
                  key={article.id}
                  className="relative text-white hover:scale-105 duration-300 h-[250px]"
                >
                  <div className="">
                    <Link
                      to={`/Articles/${encodeURIComponent(article.slug)}/`}
                    >
                      <div className=" relative w-full h-[250px] z-10 px-3 bg-black bg-opacity-30 flex flex-col justify-end">
                        <div className="pt-5">
                          <h1 className="font-graphikBold text-lg">
                            EDITOR&apos;S NOTE
                          </h1>
                        </div>
                        <h1 className="py-2 font-medium">{article.title}</h1>
                      </div>
                    </Link>
                    <div className="w-full h-full">
                      <img
                        src={article?.cover_image}
                        style={{
                          objectFit: "cover"
                        }}
                        className="absolute w-full h-full"
                        alt="Article cover image"
                      />
                    </div>
                  </div>
                </div>
              )
            }
            return null
          })}
        </div>
        <TodaysPick />
      </div>
    </div>
  )
}

export default SpecialArticles
