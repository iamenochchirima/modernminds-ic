import { useState, useEffect } from "react";
// import { useLazySearchQuery } from "../src/redux/api/generalApi";
// import { useGetCategoriesQuery } from "../src/redux/api/generalApi";
import { AiOutlineSearch } from "react-icons/ai";

import {
  Article,
  Category,
} from "../../../declarations/modernminds_backend/modernminds_backend.did";
import { Link } from "react-router-dom";

const Search = () => {
  // const { data: categories } = useGetCategoriesQuery();
  const [categories, setCategories] = useState<[Category] | null>(null);
  const [articles, setArticles] = useState<[Article] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  // const [getArticles, { data, isLoading, isError, error }] =
  //   useLazySearchQuery();
  const [searchData, setSearchData] = useState(null);
  const [data, setData] = useState(null);

  const getArticles = async (body: any) => {
    console.log("body", body);
  };

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (data) {
      setSearchData(data);
    }
  }, [data]);

  useEffect(() => {
    if (searchData) {
      // setArticles((prevArticles) => [...prevArticles, ...searchData.results]);
    }
  }, [searchData]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    // setArticles([]);
    setPage(1);
    setSearchData(null);
    if (searchQuery) {
      const timeoutId = setTimeout(() => {
        getArticles({ searchQuery, page: 1 });
      }, 700);
      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, getArticles]);

  useEffect(() => {
    if (searchQuery) {
      getArticles({ searchQuery, page });
    }
  }, [page, getArticles]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    getArticles({ searchQuery, page });
  };

  return (
    <div className="min-h-screen mt-24 px-3 ss:px-10">
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex pt-20 border-b-2 w-3/4 items-center text-xl gap-10 "
        >
          <AiOutlineSearch className="text-gray-500 text-3xl" />
          <input
            type="text"
            className="w-3/4  outline-none"
            placeholder="Search for articles"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
      {/* {isError && error.status === 404 && ( */}
      <div className="text-center p-20">Sorry, no results were found</div>
      {/* )} */}
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-2 md:w-3/4 gap-10 mt-10">
          {articles?.map((article) => (
            <div
              key={article.id}
              className="md:col-span-1 col-span-2 border p-4 rounded-md"
            >
              <div className="flex items-center space-y-3">
                <div className="w-2/3">
                  {categories?.map((category) => (
                    <>
                      {category.id === article.category && (
                        <Link
                          to={`/category/${encodeURIComponent(
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
                      )}
                    </>
                  ))}
                  <Link to={`/articles/${encodeURIComponent(article.slug)}/`}>
                    <h1 className="hover:underline font-bold">
                      {article.title}
                    </h1>
                  </Link>
                </div>
                <div className="w-1/3 relative">
                  {article?.cover_image && (
                    <div className="w-full h-[100px]">
                      <img
                        src={article?.cover_image}
                        style={{
                          objectFit: "cover",
                        }}
                        className="absolute w-full h-full"
                        alt="Article cover image"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-5 flex gap-4 justify-center">
        {/* {searchData?.next ? ( */}
        <button className="border-b-2 border-black" onClick={handleLoadMore}>
          Load More
        </button>
        {/* ) : null} */}
      </div>
    </div>
  );
};

export default Search;
