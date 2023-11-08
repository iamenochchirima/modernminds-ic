import { FC, useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import { z } from "zod"
import { set, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { GrClose } from "react-icons/gr"
import { IoMdAdd } from "react-icons/io"

type FormData = {
  title: string
  author: string
  category: string
  editor: string
  status: string
}

type SectionImage = {
  image: File
  caption: string
  credit: string
  is_left: boolean
  is_center: boolean
  is_right: boolean
}

type Props = {
  setOpenCreateModal: (value: boolean) => void
}

const CreateArticle: FC<Props> = ({ setOpenCreateModal }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [addMore, setAddMore] = useState(false)

  const [coverfile, setCoverFile] = useState<File | null>(null)
  const [contentBody1, setContentBody1] = useState("")
  const [contentBody1Image, setContentBody1Image] =
    useState<SectionImage | null>(null)
  const [contentBody2, setContentBody2] = useState("")
  const [contentBody2Image, setContentBody2Image] =
    useState<SectionImage | null>(null)
  const [contentBody3, setContentBody3] = useState("")
  const [contentBody3Image, setContentBody3Image] =
    useState<SectionImage | null>(null)
  const [contentBody4, setContentBody4] = useState("")
  const [contentBody4Image, setContentBody4Image] =
    useState<SectionImage | null>(null)
  const [contentBody5, setContentBody5] = useState("")
  const [contentBody5Image, setContentBody5Image] =
    useState<SectionImage | null>(null)

  const schema = z.object({
    title: z
      .string()
      .min(5, { message: "t must be at least 5 characters long" })
      .max(100, {
        message: "t must be less than 50 characters long"
      }),
    author: z
      .string()
      .min(1, { message: "au must be at least 5 characters long" })
      .max(50, {
        message: "au must be less than 50 characters long"
      }),
    category: z
      .string()
      .min(3, { message: "cate must be at least 3 characters long" })
      .max(40, {
        message: "cate must be less than 40 characters long"
      }),
    editor: z
      .string()
      .min(3, { message: "ed must be at least 3 characters long" })
      .max(40, {
        message: "ed must be less than 40 characters long"
      }),
    status: z
      .string()
      .min(3, { message: "st must be at least 3 characters long" })
      .max(40, {
        message: "st must be less than 40 characters long"
      })
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const saveArticle = async (data: FormData) => {
    console.log(data)
    setIsLoading(true)
  }

  const slugify = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

  console.log(contentBody1Image)

  return (
    <>
      <div className="fixed z-20 inset-0 overflow-y-scroll bg-black bg-opacity-75">
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
            <form
              className="mt-8 space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit(saveArticle)}
            >
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
                  <label htmlFor="cover-image" className="">
                    Cover Image
                  </label>
                  <input
                    type="file"
                    autoComplete="cover-image"
                    onChange={e => setCoverFile(e.target.files[0])}
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
              <div className="mb-4 ">
                <label htmlFor="" className="font-bold">
                  Content
                </label>
                <div className="border m-2 p-5 rounded-lg bg-gray-100">
                  <label
                    htmlFor=""
                    className="text-gray-700 font-sm mb-3 font-bold"
                  >
                    Section 1 Content
                  </label>
                  <textarea
                    onChange={e => setContentBody1(e.target.value)}
                    className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Type the article content here"
                  ></textarea>
                  <div className="">
                    <label
                      htmlFor=""
                      className="text-gray-700 font-sm mb-3 mt-3"
                    >
                      Section 1 Image
                    </label>
                    <input
                      type="file"
                      autoComplete="section-1-image"
                      onChange={e =>
                        setContentBody1Image({
                          ...contentBody1Image,
                          image: e.target.files[0]
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
                        onChange={e =>
                          setContentBody1Image({
                            ...contentBody1Image,
                            caption: e.target.value
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
                        onChange={e =>
                          setContentBody1Image({
                            ...contentBody1Image,
                            credit: e.target.value
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
                          onChange={e =>
                            setContentBody1Image({
                              ...contentBody1Image,
                              is_left: e.target.checked,
                              is_center: false,
                              is_right: false
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
                          onChange={e =>
                            setContentBody1Image({
                              ...contentBody1Image,
                              is_center: e.target.checked,
                              is_left: false,
                              is_right: false
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
                          onChange={e =>
                            setContentBody1Image({
                              ...contentBody1Image,
                              is_right: e.target.checked,
                              is_left: false,
                              is_center: false
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
                  onClick={e => {
                    e.preventDefault()
                    setAddMore(true)
                  }}
                  className="flex items-center m-2 gap-1 bg-gray-200 border rounded-lg mt-5 p-2 hover:bg-white"
                >
                  <IoMdAdd size={21} />
                  <span>Add more sections</span>
                </button>
                {addMore && (
                  <>
                    {/* Section 2 */}
                    <div className="border m-2 p-5 rounded-lg bg-gray-100">
                      <label
                        htmlFor=""
                        className="text-gray-700 font-sm mb-3 font-bold"
                      >
                        Section 2 Content (Optional)
                      </label>
                      <textarea
                        onChange={e => setContentBody2(e.target.value)}
                        className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Type the article content here"
                      ></textarea>
                      <div className="">
                        <label
                          htmlFor=""
                          className="text-gray-700 font-sm mb-3 mt-3"
                        >
                          Section 2 Image
                        </label>
                        <input
                          type="file"
                          autoComplete="section-2-image"
                          onChange={e =>
                            setContentBody2Image({
                              ...contentBody2Image,
                              image: e.target.files[0]
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
                            onChange={e =>
                              setContentBody2Image({
                                ...contentBody2Image,
                                caption: e.target.value
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
                            onChange={e =>
                              setContentBody2Image({
                                ...contentBody2Image,
                                credit: e.target.value
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
                              onChange={e =>
                                setContentBody2Image({
                                  ...contentBody2Image,
                                  is_left: e.target.checked,
                                  is_center: false,
                                  is_right: false
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
                              onChange={e =>
                                setContentBody2Image({
                                  ...contentBody1Image,
                                  is_center: e.target.checked,
                                  is_left: false,
                                  is_right: false
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
                              onChange={e =>
                                setContentBody2Image({
                                  ...contentBody1Image,
                                  is_right: e.target.checked,
                                  is_left: false,
                                  is_center: false
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
                    {/* Section 3 */}
                    <div className="border m-2 p-5 rounded-lg bg-gray-100">
                      <label
                        htmlFor=""
                        className="text-gray-700 font-sm mb-3 font-bold"
                      >
                        Section 3 Content (Optional)
                      </label>
                      <textarea
                        onChange={e => setContentBody3(e.target.value)}
                        className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Type the article content here"
                      ></textarea>
                      <div className="">
                        <label
                          htmlFor=""
                          className="text-gray-700 font-sm mb-3 mt-3"
                        >
                          Section 3 Image
                        </label>
                        <input
                          type="file"
                          autoComplete="section-2-image"
                          onChange={e =>
                            setContentBody3Image({
                              ...contentBody3Image,
                              image: e.target.files[0]
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
                            onChange={e =>
                              setContentBody3Image({
                                ...contentBody3Image,
                                caption: e.target.value
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
                            onChange={e =>
                              setContentBody3Image({
                                ...contentBody3Image,
                                credit: e.target.value
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
                              onChange={e =>
                                setContentBody3Image({
                                  ...contentBody3Image,
                                  is_left: e.target.checked,
                                  is_center: false,
                                  is_right: false
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
                              onChange={e =>
                                setContentBody3Image({
                                  ...contentBody3Image,
                                  is_center: e.target.checked,
                                  is_left: false,
                                  is_right: false
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
                              onChange={e =>
                                setContentBody3Image({
                                  ...contentBody3Image,
                                  is_right: e.target.checked,
                                  is_left: false,
                                  is_center: false
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

                    {/* Section 4 */}
                    <div className="border m-2 p-5 rounded-lg bg-gray-100">
                      <label
                        htmlFor=""
                        className="text-gray-700 font-sm mb-3 font-bold"
                      >
                        Section 4 Content (Optional)
                      </label>
                      <textarea
                        onChange={e => setContentBody4(e.target.value)}
                        className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Type the article content here"
                      ></textarea>
                      <div className="">
                        <label
                          htmlFor=""
                          className="text-gray-700 font-sm mb-3 mt-3"
                        >
                          Section 4 Image
                        </label>
                        <input
                          type="file"
                          autoComplete="section-4-image"
                          onChange={e =>
                            setContentBody4Image({
                              ...contentBody4Image,
                              image: e.target.files[0]
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
                            onChange={e =>
                              setContentBody4Image({
                                ...contentBody4Image,
                                caption: e.target.value
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
                            onChange={e =>
                              setContentBody4Image({
                                ...contentBody4Image,
                                credit: e.target.value
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
                              onChange={e =>
                                setContentBody4Image({
                                  ...contentBody4Image,
                                  is_left: e.target.checked,
                                  is_center: false,
                                  is_right: false
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
                              onChange={e =>
                                setContentBody4Image({
                                  ...contentBody4Image,
                                  is_center: e.target.checked,
                                  is_left: false,
                                  is_right: false
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
                              onChange={e =>
                                setContentBody4Image({
                                  ...contentBody4Image,
                                  is_right: e.target.checked,
                                  is_left: false,
                                  is_center: false
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

                    {/* Section 5 */}

                    <div className="border m-2 p-5 rounded-lg bg-gray-100">
                      <label
                        htmlFor=""
                        className="text-gray-700 font-sm mb-3 font-bold"
                      >
                        Section 5 Content (Optional)
                      </label>
                      <textarea
                        onChange={e => setContentBody5(e.target.value)}
                        className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Type the article content here"
                      ></textarea>
                      <div className="">
                        <label
                          htmlFor=""
                          className="text-gray-700 font-sm mb-3 mt-3"
                        >
                          Section 5 Image
                        </label>
                        <input
                          type="file"
                          autoComplete="section-5-image"
                          onChange={e =>
                            setContentBody5Image({
                              ...contentBody5Image,
                              image: e.target.files[0]
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
                            onChange={e =>
                              setContentBody5Image({
                                ...contentBody5Image,
                                caption: e.target.value
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
                            onChange={e =>
                              setContentBody5Image({
                                ...contentBody5Image,
                                credit: e.target.value
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
                              onChange={e =>
                                setContentBody5Image({
                                  ...contentBody5Image,
                                  is_left: e.target.checked,
                                  is_center: false,
                                  is_right: false
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
                              onChange={e =>
                                setContentBody5Image({
                                  ...contentBody5Image,
                                  is_center: e.target.checked,
                                  is_left: false,
                                  is_right: false
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
                              onChange={e =>
                                setContentBody5Image({
                                  ...contentBody5Image,
                                  is_right: e.target.checked,
                                  is_left: false,
                                  is_center: false
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

              <div>
                {isLoading ? (
                  <div className="flex justify-center my-5">
                    <ThreeDots
                      height="50"
                      width="50"
                      radius="9"
                      color="#black"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      visible={true}
                    />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center border border-transparent bg-black  hover:bg-gray-800 py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 "
                  >
                    CreateArticle
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateArticle
