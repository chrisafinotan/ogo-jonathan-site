import { useEffect, Suspense } from "react";
import { BreakpointProvider } from "../context/breakpointContext";
import { GlobalProvider } from "../context/globalContext";
import "../styles/globals.css";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Layout from "../components/layout";
import Loading from "./loading";

config.autoAddCss = false;

const queries = {
   xs: "(max-width: 320px)",
   sm: "(max-width: 720px)",
   // md: "(max-width: 1024px)",
   md: "(max-width: 840px)",
   lg: "(min-width: 1200px)",
   or: "(orientation: portrait)",
};

export default function AppLayout(opts) {
 const { children } = opts;
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
    //   <AnimatePresence exitBeforeEnter>
    //      <AnimateSharedLayout>
    //         <GlobalProvider>
    //            <BreakpointProvider queries={queries}>
                  // <Layout>
                    //  <Suspense fallback={<Loading />}>
                     <div>

                        {children}
                     </div>
                      //  {/* </Suspense> */}
                  //{/* </Layout> */}
    //            </BreakpointProvider>
    //         </GlobalProvider>
    //      </AnimateSharedLayout>
    //   </AnimatePresence>
   );
}

export async function getStaticProps() {
    let navProjects = await getAllProjects();
    return {
       props: { navProjects },
    };
 }