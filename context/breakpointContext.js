import { useState, useEffect, createContext, useContext } from "react";
import { queries } from "./queries";
const defaultValue = {};

//Define Context
const BreakpointContext = createContext(defaultValue);

//Provider
const BreakpointProvider = ({ children }) => {
   const [queryMatch, setQueryMatch] = useState({});

   useEffect(() => {
      const mediaQueryLists = {};
      const keys = Object.keys(queries);
      let isAttached = false;

      const handleQueryListener = () => {
         const updatedMatches = keys.reduce((acc, media) => {
            acc[media] = !!(
               mediaQueryLists[media] && mediaQueryLists[media].matches
            );
            return acc;
         }, {});
         setQueryMatch(updatedMatches);
      };

      if (window && window.matchMedia) {
         const matches = {};
         keys.forEach((media) => {
            if (typeof queries[media] === "string") {
               mediaQueryLists[media] = window.matchMedia(queries[media]);
               matches[media] = mediaQueryLists[media].matches;
            } else {
               matches[media] = false;
            }
         });
         setQueryMatch(matches);
         isAttached = true;
         keys.forEach((media) => {
            if (typeof queries[media] === "string") {
               mediaQueryLists[media].addListener(handleQueryListener);
            }
         });
      }

      return () => {
         if (isAttached) {
            keys.forEach((media) => {
               if (typeof queries[media] === "string") {
                  mediaQueryLists[media].removeListener(handleQueryListener);
               }
            });
         }
      };
   }, [queries]);

   return (
      <BreakpointContext.Provider
         value={queryMatch}
        //  style={{
        //     touchAction: "none",
        //  }}
      >
         {children}
      </BreakpointContext.Provider>
   );
};

//custom hook
function useBreakpoint() {
   const context = useContext(BreakpointContext);
   if (context === defaultValue) {
      throw new Error("useBreakpoint must be used within BreakpointProvider");
   }
   return context;
}
export { useBreakpoint, BreakpointProvider };
