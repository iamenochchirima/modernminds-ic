import { FC, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { z } from "zod";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GrClose } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import {
  Article,
  Section,
} from "../../../declarations/modernminds_backend/modernminds_backend.did";
import { v4 as uuid } from "uuid";
import ArticlePreview from "./ArticlePreview";

type FormData = {
  title: string;
  issue: string;
  author: string;
  category: string;
  editor: string;
  status: string;
  is_editor_note: boolean;
  is_todays_pick: boolean;
  is_top_story: boolean;
  is_special: boolean;
};

export interface CreateSection {
  image: File;
  body: string;
  img_is_center: boolean;
  img_caption: string;
  img_is_right: boolean;
  img_credit: string;
  img_is_left: boolean;
}

type Props = {
  setOpenCreateModal: (value: boolean) => void;
};

// Create a fake array of 5 categories
const categories = [
  { id: 1, name: "Art" },
  { id: 2, name: "Business" },
  { id: 3, name: "Culture" },
  { id: 4, name: "Food" },
  { id: 5, name: "Health" },
  { id: 6, name: "Music" },
  { id: 7, name: "Politics" },
  { id: 8, name: "Science" },
  { id: 9, name: "Sports" },
  { id: 10, name: "Technology" },
  { id: 11, name: "Travel" },
];

const CreateArticle: FC<Props> = ({ setOpenCreateModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [categories, setCategories] = useState([])
  const [addMore, setAddMore] = useState(false);
  const [preview, setPreview] = useState(false);
  const [previewArticle, setPreviewArticle] = useState<Article | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const [coverfile, setCoverFile] = useState<File | null>(null);
  const [contentSection1, setContentSection1] = useState<CreateSection | null>(
    null
  );
  const [contentSection2, setContentSection2] = useState<CreateSection | null>(
    null
  );
  const [contentSection3, setContentSection3] = useState<CreateSection | null>(
    null
  );
  const [contentSection4, setContentSection4] = useState<CreateSection | null>(
    null
  );
  const [contentSection5, setContentSection5] = useState<CreateSection | null>(
    null
  );

  const schema = z.object({
    title: z
      .string()
      .min(5, { message: "title must be at least 5 characters long" })
      .max(100, {
        message: "title must be less than 50 characters long",
      }),
    issue: z
      .string()
      .min(1, { message: "issue must be at least 5 characters long" })
      .max(50, {
        message: "issue must be less than 50 characters long",
      }),
    author: z
      .string()
      .min(1, { message: "author must be at least 5 characters long" })
      .max(50, {
        message: "author must be less than 50 characters long",
      }),
    category: z
      .string()
      .min(3, { message: "category must be at least 3 characters long" })
      .max(40, {
        message: "category must be less than 40 characters long",
      }),
    editor: z
      .string()
      .min(3, { message: "editor must be at least 3 characters long" })
      .max(40, {
        message: "editor must be less than 40 characters long",
      }),
    is_editor_note: z.boolean(),
    is_todays_pick: z.boolean(),
    is_top_story: z.boolean(),
    is_special: z.boolean(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const saveArticle = async (data: FormData) => {
    console.log(
      data,
      coverfile,
      contentSection1,
      contentSection2,
      contentSection3,
      contentSection4,
      contentSection5
    );

    // const article: Article = {
    //   id: uuid(),
    //   title: data.title,
    //   author: data.author,

    // }
    setIsLoading(true);
  };

  const handlePreview = async (data: FormData) => {
    setPreviewLoading(true);

    let coverImage = coverfile ? await toBase64(coverfile as File) : "";

    let content: Section[] = [
      {
        body: contentSection1?.body || "",
        img_url: contentSection1?.image
          ? ((await toBase64(contentSection1?.image as File)) as string)
          : "",
        img_is_center: contentSection1?.img_is_center || false,
        img_caption: contentSection1?.img_caption || "",
        img_is_right: contentSection1?.img_is_right || false,
        img_credit: contentSection1?.img_credit || "",
        img_is_left: contentSection1?.img_is_left || false,
      },
      {
        body: contentSection2?.body || "",
        img_url: contentSection2?.image
          ? ((await toBase64(contentSection2?.image as File)) as string)
          : "",
        img_is_center: contentSection2?.img_is_center || false,
        img_caption: contentSection2?.img_caption || "",
        img_is_right: contentSection2?.img_is_right || false,
        img_credit: contentSection2?.img_credit || "",
        img_is_left: contentSection2?.img_is_left || false,
      },
      {
        body: contentSection3?.body || "",
        img_url: contentSection3?.image
          ? ((await toBase64(contentSection3?.image as File)) as string)
          : "",
        img_is_center: contentSection3?.img_is_center || false,
        img_caption: contentSection3?.img_caption || "",
        img_is_right: contentSection3?.img_is_right || false,
        img_credit: contentSection3?.img_credit || "",
        img_is_left: contentSection3?.img_is_left || false,
      },
      {
        body: contentSection4?.body || "",
        img_url: contentSection4?.image
          ? ((await toBase64(contentSection4?.image as File)) as string)
          : "",
        img_is_center: contentSection4?.img_is_center || false,
        img_caption: contentSection4?.img_caption || "",
        img_is_right: contentSection4?.img_is_right || false,
        img_credit: contentSection4?.img_credit || "",
        img_is_left: contentSection4?.img_is_left || false,
      },
      {
        body: contentSection5?.body || "",
        img_url: contentSection5?.image
          ? ((await toBase64(contentSection5?.image as File)) as string)
          : "",
        img_is_center: contentSection5?.img_is_center || false,
        img_caption: contentSection5?.img_caption || "",
        img_is_right: contentSection5?.img_is_right || false,
        img_credit: contentSection5?.img_credit || "",
        img_is_left: contentSection5?.img_is_left || false,
      },
    ];

    const article: Article = {
      id: uuid(),
      title: data.title,
      issue: data.issue,
      author: data.author,
      cover_image: coverImage as string,
      content: content,
      category: data.category,
      slug: slugify(data.title),
      editor: data.editor,
      is_editor_note: data.is_editor_note,
      is_todays_pick: data.is_todays_pick,
      is_top_story: data.is_top_story,
      is_special: data.is_special,
      is_archived: false,
      is_draft: false,
      status: "published",
      created_at: BigInt(Date.now()),
    };
    console.log("article", article);
    setPreviewArticle(article);
    setPreview(true);
    setPreviewLoading(false);
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      console.log("file in toBase64", file);
      if (!file) {
        console.log("no file");
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      }
    });
  };
  
  const slugify = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  return (
    <>
      {preview && <ArticlePreview {...{ previewArticle, setPreview }} />}
      <div className={` ${preview ? `z-0 inset-0`: `fixed z-20 inset-0`}  overflow-y-scroll bg-black bg-opacity-75 font-graphik`}>
        <div className=" flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white w-full  px-6 py-2 max-w-[1000px] space-y-8">
            <div className="flex justify-end">
              <button
                className="justify-end"
                onClick={() => setOpenCreateModal(false)}
              >
                <GrClose className="text-2xl mt-2" />
              </button>
            </div>
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Create Article
              </h2>
            </div>
            <form className="mt-8 space-y-6" action="#">
              <input type="hidden" name="remember" value="true" />
              <div className=" rounded-md shadow-sm">
                <div className="mb-3">
                  <label htmlFor="title" className="">
                    Title
                  </label>
                  <input
                    type="text"
                    autoComplete="title"
                    {...register("title")}
                    className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Title"
                  />
                  {errors.title && (
                    <span className="text-red-600">{errors.title.message}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="issue" className="">
                    Issue
                  </label>
                  <input
                    type="text"
                    autoComplete="issue"
                    {...register("issue")}
                    className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Issue"
                  />
                  {errors.issue && (
                    <span className="text-red-600">{errors.issue.message}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="cover-image" className="">
                    Cover Image
                  </label>
                  <input
                    type="file"
                    autoComplete="cover-image"
                    onChange={(e) => setCoverFile(e.target.files[0])}
                    className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Cover Image"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="">
                    Author
                  </label>
                  <input
                    type="text"
                    autoComplete="author"
                    {...register("author")}
                    className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Author"
                  />
                  {errors.author && (
                    <span className="text-red-600">
                      {errors.author.message}
                    </span>
                  )}
                </div>
                <label className="text-sm font-medium " htmlFor="category">
                  Category
                </label>
                <select
                  className="relative block w-full rounded mb-2 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  id="category"
                  {...register("category")}
                >
                  <option value="">Select a category</option>
                  {categories?.map((category, index) => (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span className="text-red-600">
                    {errors.category.message}
                  </span>
                )}
                <div className="">
                  <label htmlFor="editor-address" className="">
                    Editor
                  </label>
                  <input
                    id="editor-address"
                    autoComplete="editor"
                    {...register("editor")}
                    className="relative block w-full appearance-none rounded  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter editor"
                  />
                  {errors.editor && (
                    <span className="text-red-600">
                      {errors.editor.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="position"
                  className="text-gray-700 font-sm mb-3 mt-3"
                >
                  Article Type
                </label>
                <div className="flex justify-start gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      {...register("is_editor_note")}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="comments"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Editor Note
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      {...register("is_todays_pick")}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="comments"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Today's Pick
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      {...register("is_top_story")}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="comments"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Top Story
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      {...register("is_special")}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="comments"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Special
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-4 ">
                <label htmlFor="" className="font-bold">
                  Content
                </label>
                <div className="border m-2 p-5 rounded-lg bg-gray-100">
                  <label
                    htmlFor=""
                    className="text-gray-700 font-sm mb-3 font-bold"
                  >
                    CreateSection 1 Content
                  </label>
                  <textarea
                    onChange={(e) =>
                      setContentSection1({
                        ...contentSection1,
                        body: e.target.value,
                      })
                    }
                    className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Type the article content here"
                  ></textarea>
                  <div className="">
                    <label
                      htmlFor=""
                      className="text-gray-700 font-sm mb-3 mt-3"
                    >
                      CreateSection 1 Image
                    </label>
                    <input
                      type="file"
                      autoComplete="section-1-image"
                      onChange={(e) =>
                        setContentSection1({
                          ...contentSection1,
                          image: e.target.files[0],
                        })
                      }
                      className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Cover Image"
                    />
                    <div className="mb-3">
                      <label
                        htmlFor="title"
                        className="text-gray-700 font-sm mb-3 mt-3"
                      >
                        Caption
                      </label>
                      <input
                        type="text"
                        autoComplete="caption"
                        onChange={(e) =>
                          setContentSection1({
                            ...contentSection1,
                            img_caption: e.target.value,
                          })
                        }
                        className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Caption"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="title"
                        className="text-gray-700 font-sm mb-3 mt-3"
                      >
                        Credit
                      </label>
                      <input
                        type="text"
                        autoComplete="credit"
                        onChange={(e) =>
                          setContentSection1({
                            ...contentSection1,
                            img_credit: e.target.value,
                          })
                        }
                        className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Credit"
                      />
                    </div>
                    <label
                      htmlFor="position"
                      className="text-gray-700 font-sm mb-3 mt-3"
                    >
                      Image Position
                    </label>
                    <div className="flex items-center gap-10">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="position"
                          value="left"
                          onChange={(e) =>
                            setContentSection1({
                              ...contentSection1,
                              img_is_left: e.target.checked,
                              img_is_center: false,
                              img_is_right: false,
                            })
                          }
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="position-left"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Left
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="position"
                          value="center"
                          onChange={(e) =>
                            setContentSection1({
                              ...contentSection1,
                              img_is_center: e.target.checked,
                              img_is_left: false,
                              img_is_right: false,
                            })
                          }
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="position-center"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Center
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="position"
                          value="right"
                          onChange={(e) =>
                            setContentSection1({
                              ...contentSection1,
                              img_is_right: e.target.checked,
                              img_is_left: false,
                              img_is_center: false,
                            })
                          }
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="position-right"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Right
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setAddMore(true);
                  }}
                  className="flex items-center m-2 gap-1 bg-gray-200 border rounded-lg mt-5 p-2 hover:bg-white"
                >
                  <IoMdAdd size={21} />
                  <span>Add more sections</span>
                </button>
                {addMore && (
                  <>
                    {/* CreateSection 2 */}
                    <div className="border m-2 p-5 rounded-lg bg-gray-100">
                      <label
                        htmlFor=""
                        className="text-gray-700 font-sm mb-3 font-bold"
                      >
                        CreateSection 2 Content (Optional)
                      </label>
                      <textarea
                        onChange={(e) =>
                          setContentSection2({
                            ...contentSection2,
                            body: e.target.value,
                          })
                        }
                        className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Type the article content here"
                      ></textarea>
                      <div className="">
                        <label
                          htmlFor=""
                          className="text-gray-700 font-sm mb-3 mt-3"
                        >
                          CreateSection 2 Image
                        </label>
                        <input
                          type="file"
                          autoComplete="section-2-image"
                          onChange={(e) =>
                            setContentSection2({
                              ...contentSection2,
                              image: e.target.files[0],
                            })
                          }
                          className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="Cover Image"
                        />
                        <div className="mb-3">
                          <label
                            htmlFor="title"
                            className="text-gray-700 font-sm mb-3 mt-3"
                          >
                            Caption
                          </label>
                          <input
                            type="text"
                            autoComplete="img_caption"
                            onChange={(e) =>
                              setContentSection2({
                                ...contentSection2,
                                img_caption: e.target.value,
                              })
                            }
                            className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Caption"
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="title"
                            className="text-gray-700 font-sm mb-3 mt-3"
                          >
                            Credit
                          </label>
                          <input
                            type="text"
                            autoComplete="img_credit"
                            onChange={(e) =>
                              setContentSection2({
                                ...contentSection2,
                                img_credit: e.target.value,
                              })
                            }
                            className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Credit"
                          />
                        </div>
                        <label
                          htmlFor="position"
                          className="text-gray-700 font-sm mb-3 mt-3"
                        >
                          Image Position
                        </label>
                        <div className="flex items-center gap-10">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="position"
                              value="left"
                              onChange={(e) =>
                                setContentSection2({
                                  ...contentSection2,
                                  img_is_left: e.target.checked,
                                  img_is_center: false,
                                  img_is_right: false,
                                })
                              }
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor="position-left"
                              className="ml-2 block text-sm text-gray-900"
                            >
                              Left
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="position"
                              value="center"
                              onChange={(e) =>
                                setContentSection2({
                                  ...contentSection1,
                                  img_is_center: e.target.checked,
                                  img_is_left: false,
                                  img_is_right: false,
                                })
                              }
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor="position-center"
                              className="ml-2 block text-sm text-gray-900"
                            >
                              Center
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="position"
                              value="right"
                              onChange={(e) =>
                                setContentSection2({
                                  ...contentSection1,
                                  img_is_right: e.target.checked,
                                  img_is_left: false,
                                  img_is_center: false,
                                })
                              }
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor="position-right"
                              className="ml-2 block text-sm text-gray-900"
                            >
                              Right
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* CreateSection 3 */}
                    <div className="border m-2 p-5 rounded-lg bg-gray-100">
                      <label
                        htmlFor=""
                        className="text-gray-700 font-sm mb-3 font-bold"
                      >
                        CreateSection 3 Content (Optional)
                      </label>
                      <textarea
                        onChange={(e) =>
                          setContentSection3({
                            ...contentSection3,
                            body: e.target.value,
                          })
                        }
                        className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Type the article content here"
                      ></textarea>
                      <div className="">
                        <label
                          htmlFor=""
                          className="text-gray-700 font-sm mb-3 mt-3"
                        >
                          CreateSection 3 Image
                        </label>
                        <input
                          type="file"
                          autoComplete="section-2-image"
                          onChange={(e) =>
                            setContentSection3({
                              ...contentSection3,
                              image: e.target.files[0],
                            })
                          }
                          className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="Cover Image"
                        />
                        <div className="mb-3">
                          <label
                            htmlFor="title"
                            className="text-gray-700 font-sm mb-3 mt-3"
                          >
                            Caption
                          </label>
                          <input
                            type="text"
                            autoComplete="img_caption"
                            onChange={(e) =>
                              setContentSection3({
                                ...contentSection3,
                                img_caption: e.target.value,
                              })
                            }
                            className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Caption"
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="title"
                            className="text-gray-700 font-sm mb-3 mt-3"
                          >
                            Credit
                          </label>
                          <input
                            type="text"
                            autoComplete="img_credit"
                            onChange={(e) =>
                              setContentSection3({
                                ...contentSection3,
                                img_credit: e.target.value,
                              })
                            }
                            className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Credit"
                          />
                        </div>
                        <label
                          htmlFor="position"
                          className="text-gray-700 font-sm mb-3 mt-3"
                        >
                          Image Position
                        </label>
                        <div className="flex items-center gap-10">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="position"
                              value="left"
                              onChange={(e) =>
                                setContentSection3({
                                  ...contentSection3,
                                  img_is_left: e.target.checked,
                                  img_is_center: false,
                                  img_is_right: false,
                                })
                              }
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor="position-left"
                              className="ml-2 block text-sm text-gray-900"
                            >
                              Left
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="position"
                              value="center"
                              onChange={(e) =>
                                setContentSection3({
                                  ...contentSection3,
                                  img_is_center: e.target.checked,
                                  img_is_left: false,
                                  img_is_right: false,
                                })
                              }
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor="position-center"
                              className="ml-2 block text-sm text-gray-900"
                            >
                              Center
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="position"
                              value="right"
                              onChange={(e) =>
                                setContentSection3({
                                  ...contentSection3,
                                  img_is_right: e.target.checked,
                                  img_is_left: false,
                                  img_is_center: false,
                                })
                              }
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor="position-right"
                              className="ml-2 block text-sm text-gray-900"
                            >
                              Right
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CreateSection 4 */}
                    <div className="border m-2 p-5 rounded-lg bg-gray-100">
                      <label
                        htmlFor=""
                        className="text-gray-700 font-sm mb-3 font-bold"
                      >
                        CreateSection 4 Content (Optional)
                      </label>
                      <textarea
                        onChange={(e) =>
                          setContentSection4({
                            ...contentSection4,
                            body: e.target.value,
                          })
                        }
                        className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Type the article content here"
                      ></textarea>
                      <div className="">
                        <label
                          htmlFor=""
                          className="text-gray-700 font-sm mb-3 mt-3"
                        >
                          CreateSection 4 Image
                        </label>
                        <input
                          type="file"
                          autoComplete="section-4-image"
                          onChange={(e) =>
                            setContentSection4({
                              ...contentSection4,
                              image: e.target.files[0],
                            })
                          }
                          className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="Cover Image"
                        />
                        <div className="mb-3">
                          <label
                            htmlFor="title"
                            className="text-gray-700 font-sm mb-3 mt-3"
                          >
                            Caption
                          </label>
                          <input
                            type="text"
                            autoComplete="img_caption"
                            onChange={(e) =>
                              setContentSection4({
                                ...contentSection4,
                                img_caption: e.target.value,
                              })
                            }
                            className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Caption"
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="title"
                            className="text-gray-700 font-sm mb-3 mt-3"
                          >
                            Credit
                          </label>
                          <input
                            type="text"
                            autoComplete="img_credit"
                            onChange={(e) =>
                              setContentSection4({
                                ...contentSection4,
                                img_credit: e.target.value,
                              })
                            }
                            className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Credit"
                          />
                        </div>
                        <label
                          htmlFor="position"
                          className="text-gray-700 font-sm mb-3 mt-3"
                        >
                          Image Position
                        </label>
                        <div className="flex items-center gap-10">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="position"
                              value="left"
                              onChange={(e) =>
                                setContentSection4({
                                  ...contentSection4,
                                  img_is_left: e.target.checked,
                                  img_is_center: false,
                                  img_is_right: false,
                                })
                              }
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor="position-left"
                              className="ml-2 block text-sm text-gray-900"
                            >
                              Left
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="position"
                              value="center"
                              onChange={(e) =>
                                setContentSection4({
                                  ...contentSection4,
                                  img_is_center: e.target.checked,
                                  img_is_left: false,
                                  img_is_right: false,
                                })
                              }
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor="position-center"
                              className="ml-2 block text-sm text-gray-900"
                            >
                              Center
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="position"
                              value="right"
                              onChange={(e) =>
                                setContentSection4({
                                  ...contentSection4,
                                  img_is_right: e.target.checked,
                                  img_is_left: false,
                                  img_is_center: false,
                                })
                              }
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor="position-right"
                              className="ml-2 block text-sm text-gray-900"
                            >
                              Right
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CreateSection 5 */}

                    <div className="border m-2 p-5 rounded-lg bg-gray-100">
                      <label
                        htmlFor=""
                        className="text-gray-700 font-sm mb-3 font-bold"
                      >
                        CreateSection 5 Content (Optional)
                      </label>
                      <textarea
                        onChange={(e) =>
                          setContentSection5({
                            ...contentSection5,
                            body: e.target.value,
                          })
                        }
                        className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Type the article content here"
                      ></textarea>
                      <div className="">
                        <label
                          htmlFor=""
                          className="text-gray-700 font-sm mb-3 mt-3"
                        >
                          CreateSection 5 Image
                        </label>
                        <input
                          type="file"
                          autoComplete="section-5-image"
                          onChange={(e) =>
                            setContentSection5({
                              ...contentSection5,
                              image: e.target.files[0],
                            })
                          }
                          className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          placeholder="Cover Image"
                        />
                        <div className="mb-3">
                          <label
                            htmlFor="title"
                            className="text-gray-700 font-sm mb-3 mt-3"
                          >
                            Caption
                          </label>
                          <input
                            type="text"
                            autoComplete="img_caption"
                            onChange={(e) =>
                              setContentSection5({
                                ...contentSection5,
                                img_caption: e.target.value,
                              })
                            }
                            className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Caption"
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="title"
                            className="text-gray-700 font-sm mb-3 mt-3"
                          >
                            Credit
                          </label>
                          <input
                            type="text"
                            autoComplete="img_credit"
                            onChange={(e) =>
                              setContentSection5({
                                ...contentSection5,
                                img_credit: e.target.value,
                              })
                            }
                            className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Credit"
                          />
                        </div>
                        <label
                          htmlFor="position"
                          className="text-gray-700 font-sm mb-3 mt-3"
                        >
                          Image Position
                        </label>
                        <div className="flex items-center gap-10">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="position"
                              value="left"
                              onChange={(e) =>
                                setContentSection5({
                                  ...contentSection5,
                                  img_is_left: e.target.checked,
                                  img_is_center: false,
                                  img_is_right: false,
                                })
                              }
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor="position-left"
                              className="ml-2 block text-sm text-gray-900"
                            >
                              Left
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="position"
                              value="center"
                              onChange={(e) =>
                                setContentSection5({
                                  ...contentSection5,
                                  img_is_center: e.target.checked,
                                  img_is_left: false,
                                  img_is_right: false,
                                })
                              }
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor="position-center"
                              className="ml-2 block text-sm text-gray-900"
                            >
                              Center
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="position"
                              value="right"
                              onChange={(e) =>
                                setContentSection5({
                                  ...contentSection5,
                                  img_is_right: e.target.checked,
                                  img_is_left: false,
                                  img_is_center: false,
                                })
                              }
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor="position-right"
                              className="ml-2 block text-sm text-gray-900"
                            >
                              Right
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 justify-between">
                <button className="group relative flex w-full justify-center border border-solid py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 ">
                  Save as Draft
                </button>
                <button
                  onClick={handleSubmit(handlePreview)}
                  className="group relative flex w-full justify-center border border-solid py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 "
                >
                  Preview
                </button>

                <button
                  type="submit"
                  onClick={handleSubmit(saveArticle)}
                  className={` ${
                    isLoading ? `bg-white` : ` bg-black  hover:bg-gray-800`
                  } group relative flex w-full justify-center border border-transparent py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2`}
                >
                  {isLoading ? (
                    <ThreeDots
                      height="40"
                      width="40"
                      radius="9"
                      color="#black"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      visible={true}
                    />
                  ) : (
                    <span>Publish</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateArticle;
