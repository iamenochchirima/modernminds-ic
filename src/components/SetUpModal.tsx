import React, { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { ThreeCircles } from "react-loader-spinner";
import { AuthContext } from "../context/AppContext";

const SetupModal = ({ setNewUser, setSetup }) => {
  const {backendActor} = AuthContext();
  const [selectedOption, setSelectedOption] = useState("");
  const [saving, setSaving] = useState(false);

  const handleContinue = async () => {
    setSaving(true);
    if (selectedOption === "setup") {
        setSetup(true);
        setNewUser(false);
        setSaving(false);
    } else {
      try {
        const result = await backendActor?.setAnonymous();
        console.log(result);
        setSaving(false);
      } catch (err) {
        console.error("Failed to set anonymous: ", err);
      }
    }
  }


  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl text-gray-600 font-semibold">
                Welcome to Modern Minds Magazine
              </h3>
            </div>
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-xl text-slate-500 leading-relaxed">
                Would you to continue as Anonymous user or setup a profile?
              </p>
            </div>
            <div className="flex items-center justify-between px-6 rounded-b">
              <div className="flex flex-col w-full gap-2">
                <button
                  onClick={() => setSelectedOption("setup")}
                  className={` ${
                    selectedOption === "setup"
                      ? "bg-gray-700 text-white"
                      : "bg-blue-400 text-white hover:bg-blue-500"
                  } w-full py-2 rounded-lg flex justify-center items-center gap-3`}
                >
                  <span> Set up profile</span>
                  {selectedOption === "setup" && (
                    <span>
                      <AiOutlineCheck size={20} />
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setSelectedOption("anonymous")}
                  className={`
                  ${
                    selectedOption === "anonymous"
                      ? "bg-gray-700 text-white"
                      : "bg-blue-400 text-white hover:bg-blue-500"
                  }
                  w-full py-2 flex justify-center items-center gap-3 rounded-lg`}
                >
                  <span> Continue as anonymous </span>
                  {selectedOption === "anonymous" && (
                    <span>
                      <AiOutlineCheck size={20} />
                    </span>
                  )}
                </button>
        
              </div>
            </div>

            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <div className="flex">
                <button
                  className={`
                  ${
                    selectedOption === ""
                      ? "bg-gray-300 text-white"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }
                    text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                  type="button"
                 onClick={handleContinue}
                >
                  {saving ? (
                    <ThreeCircles
                      height="20"
                      width="20"
                      color="#fff"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="three-circles-rotating"
                      outerCircleColor=""
                      innerCircleColor=""
                      middleCircleColor=""
                    />
                  ) : (
                    <span>Continue</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default SetupModal;