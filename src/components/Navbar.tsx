import { useState, useEffect } from "react"

import Register from "./Register"
import { GrClose } from "react-icons/gr"
import { ThreeDots } from "react-loader-spinner"
import { AiOutlineDown, AiOutlineClose, AiOutlineSearch } from "react-icons/ai"
import { GrMenu } from "react-icons/gr"
import { BsPerson } from "react-icons/bs"
import ExploreModal from "./ExploreModal"
import SetupModal from "./SetUpModal"
import { AuthContext } from "../context/AppContext"
import { User } from "../declarations/modernminds_backend/modernminds_backend.did"
import { initActors } from "../config/storage-config/functions"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null)
  const [letterEmail, setLetterEmail] = useState("")
  const [showNewsletterForm, setShowForm] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [newUser, setNewUser] = useState(false)
  const [setup, setSetup] = useState(false)
  const [hasRegistered, setHasRegistered] = useState(false)

  const [letterLoading, setLetterLoading] = useState(false)
  const [letterSuccess, setLetterSuccess] = useState(false)
  const [signupError, setSignupError] = useState(null)
  const [signupData, setSignupData] = useState(null)

  const {
    login,
    logout,
    isAuthenticated,
    session,
    resetPasswordRequest,
    isExploreOpen,
    setExploreOpen,
    checkAuth,
    backendActor,
    storageInitiated,
    setStorageInitiated
  } = AuthContext()

  useEffect(() => {
    if (session) {
      fetchUser()
    }
  }, [session])

  useEffect(() => {
    checkAuth()
  }, [])

  const fetchUser = async () => {
    try {
      console.log(backendActor)
      const res: Response = await backendActor.getUser(
        session?.identity?.getPrincipal()
      )
      if (res.ok) {
        // setUserInfo(res.ok)
      } else {
        console.log(res)
        setNewUser(true)
      }
    } catch (error) {
      console.log("Error fetchin", error)
    }
  }

  // const [
  //   signupLetter,
  //   {
  //     data: signupData,
  //     isSuccess: letterSuccess,
  //     isLoading: letterLoading,
  //     error: signupError,
  //   },
  // ] = useSignUpNewsletterMutation();
  // const { data, isSuccess, error } = useLoadUserQuery();
  // const [fetchUser, { data: lazyData, isSuccess: success, error: lazyError }] =
  //   useLazyLoadUserQuery();

  const letterBody = {
    email: letterEmail
  }
  const handleSubmitNewsletter = async (event: any) => {
    event.preventDefault()
    if (letterBody) {
      // try {
      //   await signupLetter(letterBody)
      //     .unwrap()
      //     .then((payload) => {
      //       console.log("Success ", payload);
      //     });
      // } catch (err) {
      //   console.error("Failed to sign up for newsletter: ", err);
      //   console.log(signupError, "There have been an error");
      // }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleShowForm = () => {
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
  }

  const handleExploreOpen = () => {
    setMenuOpen(false)
    setExploreOpen(true)
  }

  const handleMobileNewsLetter = () => {
    setMenuOpen(false)
    handleShowForm()
  }

  const handleLogout = () => {
    logout()
    // setUserInfo(null)
  }

  const handleCloseRegister = () => {
    if (hasRegistered) {
      setSetup(false)
      setHasRegistered(false)
    } else {
      setSetup(false)
      setNewUser(true)
    }
  }

  const init = async () => {
    const res = await initActors()
    if (res) {
      setStorageInitiated(true)
    } else {
      console.log("Error init", res)
    }
  }

  useEffect(() => {
    checkAuth()
    init()
  }, [])

  return (
    <div className="flex justify-center items-start ">
      <div
        className={`${
          isSticky ? `py-0 duration-500 shadow-md ` : `py-4 bg-opacity-0`
        } fixed w-full z-20 flex items-center justify-between bg-white px-3 ss:px-10 max-w-[1500px] `}
      >
        <Link to="/">
          <div className="text-black flex items-center gap-2 font-product">
            <div
              className={` ${
                isSticky
                  ? `w-[40px] h-[40px] duration-500`
                  : `w-[50px] h-[50px]`
              } w-[40px] sm:w-[50] h-[40px] sm:h-[50] relative `}
            >
              <img
                src={"/logo.png"}
                style={{
                  objectFit: "cover"
                }}
                className="absolute w-full h-full"
                alt="Mordern minds logo"
              />
            </div>
            <div className=" flex-col hidden xs:flex">
              <h1 className={`font-extrabold text-lg `}>MODERNMINDS</h1>
              <h1 className={` text-base tracking-widest`}>MAGAZINE</h1>
            </div>
          </div>
        </Link>
        <ul className="flex  space-x-1 ss:space-x-2 font-product items-center">
          {!isAuthenticated && (
            <li>
              <button onClick={login}>Signin</button>
            </li>
          )}
          {isAuthenticated && (
            <li className="relative group pr-2">
              <div className="group-hover:block hidden">
                <div className="absolute z-20 left-1/2 transform -translate-x-1/2 top-full w-40 py-2 bg-white rounded-md shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Link
                    to="/userprofile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Account settings
                  </Link>
                  <Link
                    to="manage-subscriptions"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Subscriptions
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
              <button className="flex gap-1 items-center group-hover:text-gray-800">
                <BsPerson />
                {userInfo?.user_body?.[0]?.first_name}
                <AiOutlineDown className="text-sm" />
              </button>
            </li>
          )}
          {userInfo?.user_body?.[0]?.is_staff && (
            <li className="hidden sm:block">
              <Link to="/admin">
                <button>Admin</button>
              </Link>
            </li>
          )}
          <li>
            <Link to="/search">
              <button className="text-xl border py-1 pb-2 px-2 rounded-md">
                <AiOutlineSearch />
              </button>
            </Link>
          </li>
          <li>
            <Link to="/subscribe">
              <button className="text-white bg-yellow-700 px-2 py-1 rounded-md hidden sm:block">
                Subscribe
              </button>
            </Link>
          </li>
          <li>
            <button
              className="text-white bg-black px-2 py-1 rounded-md hidden sm:block"
              onClick={handleShowForm}
            >
              Get The Newsletter
            </button>
            {showNewsletterForm && (
              <div className="fixed z-20 inset-0 overflow-y-auto bg-black bg-opacity-75">
                <div className=" flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                  <div className="bg-white w-full px-6 py-2 max-w-md space-y-8">
                    <div className="flex justify-end">
                      <button onClick={handleCloseForm}>
                        <GrClose className="text-2xl mt-2" />
                      </button>
                    </div>
                    <form onSubmit={handleSubmitNewsletter}>
                      <label
                        htmlFor="email"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Email:
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={letterEmail}
                        onChange={event => setLetterEmail(event.target.value)}
                        placeholder="Enter you email address"
                        required
                        className="border border-gray-400 py-2 px-4 rounded w-full mb-4"
                      />
                      {letterLoading ? (
                        <ThreeDots
                          height="50"
                          width="50"
                          radius="9"
                          color="black"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          visible={true}
                        />
                      ) : (
                        <button
                          type="submit"
                          className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                        >
                          Sign Up
                        </button>
                      )}
                    </form>
                    {letterSuccess &&
                      signupData === "Subscribed, email already verified" && (
                        <div className="bg-green-200 rounded p-2 text-green-800">
                          <p>
                            You have been successfully subscribed to the
                            MordenMinds newsletter. Thank you for subscribing!
                          </p>
                        </div>
                      )}
                    {letterSuccess &&
                      signupData === "Subscribed, verification email sent" && (
                        <div className="bg-green-200 rounded p-2 text-green-800">
                          <p>
                            Check your inbox, we sent you a link to verify your
                            email
                          </p>
                        </div>
                      )}
                    {signupError && (
                      <div className="bg-green-200 rounded p-2 text-green-800">
                        {signupError ===
                          "Email already subscribed to newsletter" && (
                          <p>
                            Your email is already subcribed to the newsletter
                          </p>
                        )}
                      </div>
                    )}
                    <p className="text-sm mt-4">
                      Sign up to our Newsletter to stay updated with special
                      offers and updates for Morden Minds. By signing up, you
                      agree to our{" "}
                      <Link to="/terms" className="underline">
                        Terms of Use
                      </Link>{" "}
                      and acknowledge that you have read our{" "}
                      <Link to="/policy" className="underline">
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </div>
            )}
          </li>
          <li>
            <button
              onClick={() => handleExploreOpen()}
              className="text-white hover:bg-gray-800 bg-black px-2 py-1 rounded-md hidden sm:block"
            >
              Explore
            </button>
            {isExploreOpen && <ExploreModal />}
          </li>
          <li className=" sm:hidden">
            <button onClick={() => setMenuOpen(true)} className="text-2xl">
              <GrMenu />
            </button>
            {menuOpen && (
              <div className="fixed left-0 right-0 top-0 min-h-screen overflow-y-scroll bg-white z-20 ">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl pt-10 pl-20"
                >
                  <AiOutlineClose />
                </button>

                <div className="menu-container h-screen ">
                  <ul className="md:text-center flex flex-col gap-10 pl-20 p-5 text-2xl">
                    {userInfo?.user_body?.[0]?.is_staff && (
                      <li className="hover:scale-110 duration-300">
                        <Link to="/admin">
                          <button>Admin</button>
                        </Link>
                      </li>
                    )}
                    <li className="hover:scale-110 duration-300">
                      <Link to="/subscribe">
                        <button className="">Subscribe</button>
                      </Link>
                    </li>
                    <li className="hover:scale-110 duration-300">
                      <button className="" onClick={handleMobileNewsLetter}>
                        Get The Newsletter
                      </button>
                    </li>
                    <li className="hover:scale-110 duration-300">
                      <button onClick={() => handleExploreOpen()} className="">
                        Explore
                      </button>
                      {isExploreOpen && <ExploreModal />}
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>
      {setup && (
        <div className="fixed z-20 inset-0 overflow-y-scroll bg-black bg-opacity-75">
          <div className=" flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white w-full  px-6 py-2 max-w-md space-y-8">
              <div className="flex justify-end">
                <button className="justify-end" onClick={handleCloseRegister}>
                  <GrClose className="text-2xl mt-2" />
                </button>
              </div>
              <Register {...{ setSetup, setHasRegistered }} />
            </div>
          </div>
        </div>
      )}
      {newUser && (
        <SetupModal {...{ setNewUser, setSetup, setHasRegistered }} />
      )}
    </div>
  )
}

export default Navbar
