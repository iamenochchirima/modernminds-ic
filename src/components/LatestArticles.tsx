import { useState } from "react";
// import {
//   useGetArticlesQuery,
//   useGetCategoriesQuery,
// } from "../redux/api/generalApi";

import {
  Article,
  Category,
} from "../declarations/modernminds_backend/modernminds_backend.did";
import { Link } from "react-router-dom";

const LatestArticles = () => {
  const [page, setPage] = useState(1);
  // const { articles, isSuccess, isFetching, hasNextPage } =
  //   useGetArticlesQuery(page);
  // const { articles: categories } = useGetCategoriesQuery();

  const [categories, setCategories] = useState<[Category] | null>(null);
  const [articles, setArticles] = useState<[Article] | null>(null);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handlePrevious = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <h1 className="text-center p-10 text-xl font-graphikBold">
        LATEST STORIES
      </h1>
      <div className="px-3 ss:px-10 grid grid-cols-6 gap-5">
        {articles?.map((article) => (
          <div
            key={article.id}
            className="col-span-6 ss:col-span-2 md:col-span-2 hover:scale-105 duration-300 fade-in-fwd"
          >
            <div className="">
              <Link className="relative" to={`/article/${article.slug}/`}>
                <div className="relative w-full h-[250px] object-cover  hover:scale-105 duration-300">
                  {article?.cover_image && (
                    <img
                      src={article?.cover_image}
                      className="absolute w-full h-full"
                      style={{
                        objectFit: "cover",
                      }}
                      alt="Article cover image"
                    />
                  )}
                </div>
              </Link>
              <div className="">
                <Link to={`/Articles/${encodeURIComponent(article.slug)}/`}>
                  <h3>
                    <span className="text-gray-500 text-xs tracking-widest">
                      {article.issue}
                    </span>
                  </h3>
                  <h1 className="hover:underline font-bold">{article.title}</h1>
                </Link>
                {categories?.map((category) => {
                  if (category.id === article.category) {
                    return (
                      <Link
                        key={category.id}
                        to={`/category/${category.slug}/`}
                      >
                        <span className="text-xs border-b border-yellow-400 hover:border-black tracking-widest">
                          {category.name}
                        </span>
                      </Link>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-5 flex gap-4 justify-center">
        {/* {articles?.previous ? ( */}
        <button className=" border-b-2 border-black" onClick={handlePrevious}>
          Previous
        </button>
        {/* ) : null} */}
        {/* {articles?.next ? ( */}
        <button className="border-b-2 border-black" onClick={handleLoadMore}>
          Load More
        </button>
        {/* ) : null} */}
      </div>
    </>
  );
};

export default LatestArticles;
