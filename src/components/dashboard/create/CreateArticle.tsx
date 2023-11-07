import { FC, useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { GrClose } from "react-icons/gr"

type FormData = {
  title: string
  author: string
  category: string
  editor: string
  status: string
}

type SectionImage = {
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

  const [coverfile, setCoverFile] = useState<File | null>(null)
  const [contentBody1, setContentBody1] = useState("")
  const [contentBody1Image, setContentBody1Image] = useState<File | null>(null)
  const [contentBody2, setContentBody2] = useState("")
  const [contentBody2Image, setContentBody2Image] = useState<File | null>(null)
  const [contentBody3, setContentBody3] = useState("")
  const [contentBody3Image, setContentBody3Image] = useState<File | null>(null)
  const [contentBody4, setContentBody4] = useState("")
  const [contentBody4Image, setContentBody4Image] = useState<File | null>(null)

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
                <div className="mb-[100px]">
                  <label htmlFor="" className="">
                    Content
                  </label>
                  <textarea
                    className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Content"
                  ></textarea>
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
