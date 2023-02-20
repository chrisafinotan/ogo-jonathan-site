import { createContext, useReducer, useContext } from "react";

//Define Context
const GlobalStateContext = createContext();
const GlobalDispatchContext = createContext();

//Reducer
const globalReducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE_THEME": {
            if (typeof window !== undefined) {
                window.localStorage.setItem("theme", action.theme);
            }
            return {
                ...state,
                currentTheme: action.theme,
            };
        }
        case "CURSOR_TYPE": {
            return {
                ...state,
                cursorType: action.cursorType,
                cursorText: action.cursorText,
            };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

//Provider
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, {
        currentTheme: "dark",
        cursorType: false,
        cursorStyles: [
            "pointer",
            "pointertheme",
            "pointerinv",
            "hovered",
            "locked",
            "white",
            "wrapped",
        ],
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
