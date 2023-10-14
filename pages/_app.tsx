import "../src/styles/globals.css"
import { Provider } from "react-redux"
import { wrapper } from "../src/redux/Store"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from "next/router"
import Script from "next/script"
import { useEffect } from "react"
import * as gtag from "../src/lib/gtag"
import AppContext from "../src/context/AppContext"

export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url)
    }
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Provider store={store}>
        <AppContext>
          <div className="font-graphik">
            <Script
              id="google-analytics"
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `
              }}
            />
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            />
            <ToastContainer />
            <Component {...pageProps} />
          </div>
        </AppContext>
      </Provider>
    </>
  )
}
