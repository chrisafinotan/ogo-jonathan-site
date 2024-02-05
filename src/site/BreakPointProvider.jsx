'use client';

import { useState, useEffect, createContext, useContext } from 'react';

const queries = {
    xs: '(max-width: 320px)',
    sm: '(max-width: 640px)',
    md: '(max-width: 7680px)',
    lg: '(max-width: 1024px)',
    xl: '(max-width: 1280px)',
    or: '(orientation: portrait)',
};
const defaultValue = {};
const BreakpointContext = createContext(defaultValue);

export default function BreakpointProviderClient({ children }) {
    const [queryMatch, setQueryMatch] = useState({});

    useEffect(() => {
        const mediaQueryLists = {};
        const keys = Object.keys(queries);
        let isAttached = false;

        function handleQueryListener() {
            const updatedMatches = keys.reduce((acc, media) => {
                acc[media] = !!(
                    mediaQueryLists[media] && mediaQueryLists[media].matches
                );
                return acc;
            }, {});
            setQueryMatch(updatedMatches);
        }

        if (window && window.matchMedia) {
            const matches = {};
            keys.forEach((media) => {
                if (typeof queries[media] === 'string') {
                    mediaQueryLists[media] = window.matchMedia(queries[media]);
                    matches[media] = mediaQueryLists[media].matches;
                } else {
                    matches[media] = false;
                }
            });
            setQueryMatch(matches);
            isAttached = true;
            keys.forEach((media) => {
                if (typeof queries[media] === 'string') {
                    mediaQueryLists[media].addListener(handleQueryListener);
                }
            });
        }

        return () => {
            if (isAttached) {
                keys.forEach((media) => {
                    if (typeof queries[media] === 'string') {
                        mediaQueryLists[media].removeListener(
                            handleQueryListener
                        );
                    }
                });
            }
        };
    }, [queries]);

    return (
        <BreakpointContext.Provider value={queryMatch}>
            {children}
        </BreakpointContext.Provider>
    );
}

export function useBreakpoint() {
    const context = useContext(BreakpointContext);
    if (context === defaultValue) {
        throw new Error(
            'useBreakpoint must be used within BreakpointProviderClient'
        );
    }
    return context;
}
