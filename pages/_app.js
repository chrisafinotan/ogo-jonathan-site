import "../styles/globals.css";

import { BreakpointProvider } from "../context/breakpointContext";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { GlobalProvider } from "../context/globalContext";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const queries = {
    xs: "(max-width: 320px)",
    sm: "(max-width: 720px)",
    md: "(max-width: 1024px)",
    lg: "(min-width: 1200px)",
    or: "(orientation: portrait)", // we can check orientation also
};

function MyApp({ Component, pageProps }) {
    return (
        <AnimatePresence exitBeforeEnter>
            <AnimateSharedLayout>
                <GlobalProvider>
                    <BreakpointProvider queries={queries}>
                        <Component {...pageProps} />
                    </BreakpointProvider>
                </GlobalProvider>
            </AnimateSharedLayout>
        </AnimatePresence>
    );
}

export default MyApp;
