import "../styles/globals.css";

import { BreakpointProvider } from "../context/breakpointContext";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { GlobalProvider } from "../context/globalContext";

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
