import { useEffect, useState } from "react";
import {
  Article,
  Category as CategoryType,
} from "../declarations/modernminds_backend/modernminds_backend.did";
import { Link, useParams } from "react-router-dom";

const Category = () => {
  const { slug } = useParams();

  const [page, setPage] = useState(1);

  const [categories, setCategories] = useState<[CategoryType] | null>(null);
  const [articles, setArticles] = useState<[Article] | null>(null);
  const [data, setData] = useState(null);

  const [background, setBackground] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    // setArticles([]);
  }, [slug]);

  useEffect(() => {
    const matchingCategory = categories?.find(
      (category) => category.slug === slug
    );

    if (matchingCategory) {
      setBackground(matchingCategory.cover_image);
      setName(matchingCategory.name);
    }
  }, [categories, slug]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const getArticles = async () => {
    console.log("Getting articles");
  };

  useEffect(() => {
    if (data) {
      // setArticles((prevArticles) => [...prevArticles, ...data.results]);
    }
  }, [data]);

  useEffect(() => {
    if (slug) {
      getArticles();
    }
  }, [slug, page, getArticles]);

  return (
    <>
      <div className="">
        <div className="relative h-[550px] w-full">
          <div className="absolute w-full h-[550px] flex flex-col bg-black bg-opacity-20 z-10 justify-center">
            <h1 className="text-center text-white font-graphikSemiBold  text-5xl sm:text-7xl">
              {name}
            </h1>
          </div>
          <div className="w-full h-[550px] relative">
            {background ? (
              <img
                src={background}
                style={{
                  objectFit: "cover",
                }}
                className="w-full h-full"
                alt="Category background image"
              />
            ) : null}
          </div>
        </div>
        <div className="px-3 ss:px-10 grid grid-cols-6 gap-10 mt-20">
          {articles?.map((article) => (
            <div
              key={article.id}
              className="col-span-6 ss:col-span-2 md:col-span-2  fade-in-fwd"
            >
              <div className="">
                <Link
                  className="relative"
                  to={`/Articles/${encodeURIComponent(article.slug)}/`}
                >
                  <div className="relative w-full h-[250px] hover:scale-105 duration-300">
                    <img
                      src={article?.cover_image}
                      style={{
                        objectFit: "cover",
                      }}
                      className="absolute w-full h-full"
                      alt="Article cover image"
                    />
                  </div>
                </Link>
                <div className="">
                  <Link to={`/Articles/${encodeURIComponent(article.slug)}/`}>
                    <h3>
                      <span className="text-gray-500 text-xs tracking-widest">
                        {article.issue}
                      </span>
                    </h3>
                    <h1 className="hover:underline font-bold">
                      {article.title}
                    </h1>
                  </Link>
                  {categories?.map((category) => {
                    if (category.id === article.category) {
                      return (
                        <Link
                          key={category.id}
                          to={`/category/${encodeURIComponent(category.slug)}/`}
                        >
                          <span className="  text-xs border-b border-yellow-400 hover:border-black tracking-widest">
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
      </div>
      <div className="text-center mt-5 flex gap-4 justify-center">
        {/* {data?.next ? (
          <button className="border-b-2 border-black" onClick={handleLoadMore}>
            Load More
          </button>
        ) : null} */}
      </div>
    </>
  );
};

export default Category;
