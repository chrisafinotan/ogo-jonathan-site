import { createContext, useReducer, useContext } from "react";

//Define Context
const GlobalStateContext = createContext();
const GlobalDispatchContext = createContext();

//Reducer
const globalReducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE_THEME": {
            return {
                ...state,
                currentTheme: action.theme,
            };
        }
        case "CURSOR_TYPE": {
            // console.log("cursor", action.cursorType);
            return {
                ...state,
                cursorType: action.cursorType,
            };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

//Provider
export const GlobalProvider = ({ children }) => {
    // console.log("global provider");
    const [state, dispatch] = useReducer(globalReducer, {
        currentTheme: "dark",
        // currentTheme:
        //     window && (window.localStorage.getItem("theme") == null
        //         ? "dark"
        //         : window.localStorage.getItem("theme")),
        cursorType: false,
        cursorStyles: ["pointer", "pointerinv", "hovered", "locked", "white"],
    });

    return (
        <GlobalDispatchContext.Provider value={dispatch}>
            <GlobalStateContext.Provider value={state}>
                {children}
            </GlobalStateContext.Provider>
        </GlobalDispatchContext.Provider>
    );
};

//custom hooks
export const useGlobalStateContext = () => useContext(GlobalStateContext);

export const useGlobalDispatchContext = () => useContext(GlobalDispatchContext);
