import { useEffect, useState } from 'react';
import { BreakpointProvider } from '../context/breakpointContext';
import { GlobalProvider } from '../context/globalContext';
import Head from 'next/head';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import Loading from '../components/loading';
import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;

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
               <BreakpointProvider>
                  <Head>
                     <meta
                        name='viewport'
                        content='width=device-width, initial-scale=1.0'
                     />
                  </Head>
                  <Loading loading={loading} />
                  <Component {...pageProps} setLoading={setLoading} />
               </BreakpointProvider>
            </GlobalProvider>
         </AnimateSharedLayout>
      </AnimatePresence>
   );
}

export default MyApp;
