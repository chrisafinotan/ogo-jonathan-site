import { useEffect, useState } from 'react';
import { BreakpointProvider } from '../context/breakpointContext';
import { GlobalProvider } from '../context/globalContext';
import '../styles/globals.css';
import '../fonts/telma/Fonts/WEB/css/telma.css';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import Loading from '../components/loading';

config.autoAddCss = false;

const queries = {
   xs: '(max-width: 320px)',
   sm: '(max-width: 720px)',
   // md: "(max-width: 1024px)",
   md: '(max-width: 840px)',
   lg: '(min-width: 1200px)',
   or: '(orientation: portrait)',
};

function MyApp({ Component, pageProps }) {
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      const appHeight = () => {
         const doc = document.documentElement;
         doc.style.setProperty('--app-height', `${window.innerHeight}px`);
      };
      window.addEventListener('resize', appHeight);
      appHeight();

      return () => {
         window.removeEventListener('resize', appHeight);
      };
   }, []);

   return (
      <AnimatePresence exitBeforeEnter>
         <AnimateSharedLayout>
            <GlobalProvider>
               <BreakpointProvider queries={queries}>
                  <Loading loading={loading} />
                  <Component {...pageProps} setLoading={setLoading} />
               </BreakpointProvider>
            </GlobalProvider>
         </AnimateSharedLayout>
      </AnimatePresence>
   );
}

export default MyApp;
