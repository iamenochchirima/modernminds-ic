import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
// import {
//   useGetSpecialArticlesQuery,
//   useGetCategoriesQuery,
// } from "../redux/api/generalApi";
import Link from "next/link";
import Image from "next/image";
import { Article, Category } from "../declarations/modernminds_backend/modernminds_backend.did";

const TodaysPick = () => {
  // const { data: categories } = useGetCategoriesQuery();
  // const {
  //   data: articles,
  //   isLoading: specialLoading,
  //   isSuccess: specialSuccess,
  //   isError: specialError,
  // } = useGetSpecialArticlesQuery();
  const [categories, setCategories] = useState<[Category] | null>(null)
  const [articles, setArticles] = useState<[Article] | null>(null);;
  const [specialLoading, setSpecialLoading] = useState(false);
  const [specialSuccess, setSpecialSuccess] = useState(false);
  const [specialError, setSpecialError] = useState(false);


  return (
    <div className="">
      <div className="pt-5">
        <span className="text-xl font-graphikBold">TODAY&apos;S PICK</span>
      </div>
      {specialSuccess && (
        <div className="py-1">
          {articles?.map((article) => {
            if (article?.is_top_story === true) {
              return (
                <div key={article.id} className="mt-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2/3">
                      {categories?.map((category) => {
                        if (category.id === article.category) {
                          return (
                            <Link
                              key={category.id}
                              href={`/category/${encodeURIComponent(
                                category.slug
                              )}/`}
                            >
                              <span
                                key={category.id}
                                className="  text-xs border-b border-yellow-400 hover:border-black tracking-widest"
                              >
                                {category.name}
                              </span>
                            </Link>
                          );
                        }
                        return null;
                      })}
                      <Link
                        href={`/Articles/${encodeURIComponent(article.slug)}/`}
                      >
                        <h1 className="hover:underline font-bold">
                          {article.title}
                        </h1>
                      </Link>
                    </div>
                    <div className="w-1/3 relative">
                      {article?.cover_image && (
                        <div className="relative w-full h-[100px]">
                          <Image
                          className="absolute"
                            src={article?.cover_image}
                            style={{
                              objectFit: "cover",
                            }}
                            fill
                            sizes="(max-width: 768px) 100vw,
                            (max-width: 1200px) 50vw,
                            33vw"
                            alt="Article cover image"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
      {specialError && (
        <div className="font-graphik flex justify-center items-center h-screen">
          <h1 className="text-center">Something went wrong</h1>
        </div>
      )}
      {specialLoading && (
        <div className=" flex justify-center items-center h-screen">
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
    </div>
  );
};

export default TodaysPick;
