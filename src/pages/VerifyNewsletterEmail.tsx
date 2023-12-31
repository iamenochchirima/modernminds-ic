import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { Oval, ThreeDots } from "react-loader-spinner";
// import { useVerifyNewsletterEmailMutation } from "../../src/redux/api/generalApi";
import { GrClose } from "react-icons/gr";
import Layout from "../../src/components/Layout";
import Articles from "../../src/components/SpecialArticles";
import { Link, useNavigate, useParams } from "react-router-dom";

const VerifyNewsletterEmail = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  // const [verifyEmail, { isSuccess, isLoading, isError, error }] =
  //   useVerifyNewsletterEmailMutation();

  const verifyEmail = async (body: any) => {
    console.log("body", body);
  };

  useEffect(() => {
    try {
      verifyEmail({ token });
    } catch (err) {
      console.error("Failed to verify email: ", err);
    }
  }, [token, verifyEmail]);

  return (
    <Layout>
      <Articles />
      <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-500 bg-opacity-75">
        <div className=" flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white w-full rounded-lg px-6 py-2 max-w-md space-y-8">
            <div className="flex justify-end bg">
              <button onClick={() => navigate("/")}>
                <GrClose className="text-2xl mt-2" />
              </button>
            </div>
            {isSuccess && (
              <>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  ModernMinds Newsletter
                </h2>
                <div className="pb-5 text-center">
                  <span className="text-center text-lg">
                    You&apos;ve been successfully added to our mailing list.
                    Thank you for subscribing!
                  </span>
                </div>
              </>
            )}{" "}
            {isError && (
              <>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  ModernMinds Newsletter
                </h2>
                <div className="pb-5 text-center">
                  <span className="text-center text-lg">
                    You weren&apos;t added to our list because your token is
                    invalid. Please{" "}
                    <Link to="/" className="underline">
                      subscribe again
                    </Link>{" "}
                    to generate a new token.
                  </span>
                </div>
              </>
            )}
            {isLoading && (
              <div className="flex justify-center pb-10">
                {" "}
                <ThreeDots
                  height="60"
                  width="60"
                  radius="9"
                  color="#black"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={true}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VerifyNewsletterEmail;
