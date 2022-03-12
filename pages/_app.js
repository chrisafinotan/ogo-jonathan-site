import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { BreakpointProvider } from "../context/breakpointContext";
import { GlobalProvider } from "../context/globalContext";
import { sleep } from "../utils/helper";
import Loading from "../components/Loading";
import "../styles/globals.css";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

const queries = {
    xs: "(max-width: 320px)",
    sm: "(max-width: 720px)",
    md: "(max-width: 1024px)",
    lg: "(min-width: 1200px)",
    or: "(orientation: portrait)",
};

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleStart = async (url) => {
            // console.log("i changed it");
            url !== router.pathname ? setLoading(true) : setLoading(false);
        };
        const handleComplete = async (url) => {
            // console.log("no i did");
            sleep(1 * 1000).then(() => {
                setLoading(false);
            });
        };

        router.events.on("routeChangeStart", () => handleStart());
        router.events.on("routeChangeComplete", () => handleComplete());
        router.events.on("routeChangeError", () => handleComplete());
        window.scrollTo(0, 0);
    }, [router]);

    useEffect(() => {
        const appHeight = () => {
            const doc = document.documentElement;
            doc.style.setProperty("--app-height", `${window.innerHeight}px`);
        };
        window.addEventListener("resize", appHeight);
        appHeight();

        return () => {
            window.removeEventListener("resize", appHeight);
        };
    }, []);

    return (
        <AnimatePresence exitBeforeEnter>
            <AnimateSharedLayout>
                <GlobalProvider>
                    <BreakpointProvider queries={queries}>
                        {/* <Div100vh> */}
                        <Loading loading={loading} />
                        <Component {...pageProps} setLoading={setLoading} />
                        {/* </Div100vh> */}
                    </BreakpointProvider>
                </GlobalProvider>
            </AnimateSharedLayout>
        </AnimatePresence>
    );
}

export default MyApp;
