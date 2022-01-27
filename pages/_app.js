import "../styles/globals.css";

import { BreakpointProvider } from "../components/Breakpoint";

const queries = {
    xs: "(max-width: 320px)",
    sm: "(max-width: 720px)",
    md: "(max-width: 1024px)",
    lg: "(min-width: 1200px)",
    or: "(orientation: portrait)", // we can check orientation also
};

function MyApp({ Component, pageProps }) {
    return (
        <BreakpointProvider queries={queries}>
            <Component {...pageProps} />
        </BreakpointProvider>
    );
}

export default MyApp;
