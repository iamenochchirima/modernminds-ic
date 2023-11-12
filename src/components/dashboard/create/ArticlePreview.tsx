import { useEffect, useState } from "react";
import {
  Article as ArticleType,
  Category,
} from "../../../declarations/modernminds_backend/modernminds_backend.did";
import { Link, useParams } from "react-router-dom";
import { GrClose } from "react-icons/gr";

const ArticlePreview = ({ previewArticle, setPreview }) => {
  // const { data: categories } = useGetCategoriesQuery();
  const [categories, setCategories] = useState<[Category] | null>(null);

  // const [getArticle, { data: previewArticle, isSuccess }] =
  //   useLazyGetFullArticleQuery();

  console.log("previewArticle", previewArticle);

  return (
    <div className="fixed z-50 inset-0 overflow-y-scroll bg-black bg-opacity-75 font-graphik">
      <div className=" flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white w-full  px-6 py-2 max-w-[1500px] space-y-8">
          <div className="flex justify-end">
            <button className="justify-end" onClick={() => setPreview(false)}>
              <GrClose className="text-2xl mt-2" />
            </button>
          </div>
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Article Preview
            </h2>
          </div>

          {/* Article section starts here */}

          <div className=" min-h-screen px-3 ss:px-10 flex justify-center ">
            <div className="">
              <div className="flex justify-center">
                <div className="w-full h-[500px] sm:h-[600px] md:h-[724px] relative">
                  {previewArticle?.cover_image ? (
                    <img
                      src={previewArticle?.cover_image}
                      style={{
                        objectFit: "cover",
                      }}
                      className="w-full h-full"
                      alt="ArticlePreview cover image"
                    />
                  ) : null}
                </div>
              </div>
              <div className="flex justify-center">
                <div className="py-10 sm:w-3/4 grid grid-cols-5">
                  <div className="col-span-5 sm:col-span-3 sm:border-r-2 ">
                    <h1 className="text-4xl md:text-5xl text-teal-900 font-kinfolk font-medium pr-3">
                      {previewArticle?.title.toUpperCase()}
                    </h1>
                  </div>

                  <div className="col-span-5 sm:col-span-2 flex flex-col justify-center gap-4 mt-10 sm:pt-0">
                    <h1 className="sm:pl-10 text-lg">
                      BY{" "}
                      <span className="font-bold">
                        {previewArticle?.author.toUpperCase()}
                      </span>
                    </h1>
                    <div className="sm:pl-10">
                      <h1 className="text-teal-600">{previewArticle?.issue}</h1>
                      <h1 className="mt-5">
                        {categories?.map((category) => (
                          <>
                            {category.id === previewArticle?.category && (
                              <Link to={`/category/${category.slug}/`}>
                                <span
                                  key={category.id}
                                  className="  text-sm border-b border-yellow-400 hover:border-black tracking-widest"
                                >
                                  {category.name}
                                </span>
                              </Link>
                            )}
                          </>
                        ))}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center flex-col">
                {previewArticle.content.map((content, index) => (
                  <div
                    key={index}
                    className={`sm:w-3/4 
                    ${content.img_url ? "flex" : ""} 
                    ${content.img_is_center ? "flex-col items-center" : ""} 
                    ${content.img_is_left ? "flex-row-reverse" : ""} 
                    ${content.img_is_right ? "flex-row" : ""}
                  `}
                  >
                    <div
                      className={`${
                        content.img_is_center ? "w-full" : "w-1/2"
                      }`}
                    >
                      {content.body}
                    </div>
                    {content.img_url && (
                      <div
                        className={`
                        ${content.img_is_center ? "w-full" : "w-1/2"}
                        ${content.img_is_left ? "overflow-hidden relative" : ""}
                        ${content.img_is_right ? "overflow-hidden relative0" : ""}
                        `}
                      >
                        <img
                          src={content.img_url}
                          alt=""
                          className={`
                          ${content.img_is_center ? "w-full" : "w-full"}
                          ${content.img_is_left ? "float-right" : ""}
                          ${content.img_is_right ? "float-left" : ""}
                          
                          `}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreview;
