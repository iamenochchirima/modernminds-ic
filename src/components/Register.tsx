import { FC, useState } from "react"
import { ThreeDots } from "react-loader-spinner"
import Image from "next/image"
import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { countryListAllIsoData } from "../config"

type FormData = {
  first_name: string
  last_name: string
  email: string
  country: string
  gender: string
}

type Props = {
  setSetup: (setup: boolean) => void
}

const Register: FC<Props> = ({ setSetup}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const schema = z.object({
    first_name: z
      .string()
      .min(2, { message: "First name must be at least 2 characters long" })
      .max(50, { message: "First name must be less than 50 characters long" }),
    last_name: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters long" })
      .max(50, { message: "Last name must be less than 50 characters long" }),
    email: z
      .string()
      .email({ message: "Please provide a valid email address" }),
    country: z
      .string()
      .min(3, { message: "Country name must be at least 3 characters long" })
      .max(40, {
        message: "Country name must be less than 40 characters long"
      })
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const saveProfile = async (data: FormData) => {
    console.log(data)
  }

  if (isSuccess) {
    return (
      <>
        <div className="">
          <Image
            className="mx-auto w-auto"
            src={"/logo.png"}
            alt="Mordern minds logo"
            height="40"
            width="40"
          ></Image>
          <p className="text-center text-teal-800 text-lg mb-10">
            Account have been successfully created, now check your emails we
            have sent a link to verify your email and activate you account, come
            back when you are done.
          </p>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div>
          <Image
            className="mx-auto w-auto"
            src={"/logo.png"}
            alt="Mordern minds logo"
            height="40"
            width="40"
          ></Image>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit(saveProfile)}
        >
          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-3">
                <label htmlFor="first_name" className="sr-only">
                  First name
                </label>
                <input
            
                  type="text"
                  autoComplete="first_name"
                  {...register("first_name")}
                  className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="First name"
                />
                {errors.first_name && (
                  <span className="text-red-600">
                    {errors.first_name.message}
                  </span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="first_name" className="sr-only">
                  Last name
                </label>
                <input
                 
                  type="text"
                  autoComplete="last name"
                  {...register("last_name")}
                  className="relative block w-full appearance-none  rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Last name"
                />
                {errors.last_name && (
                  <span className="text-red-600">
                    {errors.last_name.message}
                  </span>
                )}
              </div>
            </div>
            <div className="">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
              
                autoComplete="email"
                {...register("email")}
                className="relative block w-full appearance-none rounded  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter email"
              />
              {errors.email && (
                <span className="text-red-600">{errors.email.message}</span>
              )}
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium sr-only" htmlFor="country">
                Country
              </label>
              <select
                className="relative block w-full rounded mb-2 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                id="country"
               
                {...register("country")}
              >
                <option value="">Select a country</option>
                {countryListAllIsoData?.map((country, index) => (
                  <option key={index} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.country && (
                <span className="text-red-600">{errors.country.message}</span>
              )}
            </div>
            <div className="flex flex-col space-y-3 pb-3">
              <label className="text-sm font-medium sr-only" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                {...register("gender")}
                className="relative block w-full rounded mb-2 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                name="gender"
              >
                <option value="">Select a gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="nonbinary">Non-binary</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <span className="text-red-600">{errors.gender.message}</span>
              )}
            </div>
          </div>
          <p className="text-xs">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our{" "}
            <Link
              onClick={() => setSetup(false)}
              className="underline"
              href="/policy"
            >
              privacy policy
            </Link>{" "}
            .
          </p>

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
                Register
              </button>
            )}
          </div>
        </form>
      </>
    )
  }
}

export default Register
