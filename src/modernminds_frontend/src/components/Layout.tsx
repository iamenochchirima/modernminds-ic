import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CookieConsent from "react-cookie-consent";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex justify-center items-start font-graphik">
      <div className=" xl:max-w-[1500px] w-full ">
        <Navbar />
        <Outlet />
        <CookieConsent
          style={{
            textAlign: "start",
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
          }}
          buttonStyle={{ background: "#3B82F6", color: "white" }}
          buttonText="Okay"
          expires={150}
        >
          Welcome to Modern Minds Magazine website! We use third-party analytics
          technologies and cookies to to help enhance the user experience. By
          continuing to use our website, you consent to the use of these
          technologies. To learn more please read our{" "}
          <Link className="underline" to="/policy">
          privacy policy
          </Link>{" "}
          and{" "}
          <Link to="/terms" className="underline">
            terms of use
          </Link>
        </CookieConsent>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
