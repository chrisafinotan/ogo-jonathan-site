"use strict";
exports.id = 743;
exports.ids = [743];
exports.modules = {

/***/ 743:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "G": () => (/* binding */ useBreakpoint),
/* harmony export */   "q": () => (/* binding */ BreakpointProvider)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const defaultValue = {};
const BreakpointContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(defaultValue);

const BreakpointProvider = ({
  children,
  queries
}) => {
  const {
    0: queryMatch,
    1: setQueryMatch
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const mediaQueryLists = {};
    const keys = Object.keys(queries);
    let isAttached = false;

    const handleQueryListener = () => {
      const updatedMatches = keys.reduce((acc, media) => {
        acc[media] = !!(mediaQueryLists[media] && mediaQueryLists[media].matches);
        return acc;
      }, {});
      setQueryMatch(updatedMatches);
    };

    if (window && window.matchMedia) {
      const matches = {};
      keys.forEach(media => {
        if (typeof queries[media] === "string") {
          mediaQueryLists[media] = window.matchMedia(queries[media]);
          matches[media] = mediaQueryLists[media].matches;
        } else {
          matches[media] = false;
        }
      });
      setQueryMatch(matches);
      isAttached = true;
      keys.forEach(media => {
        if (typeof queries[media] === "string") {
          mediaQueryLists[media].addListener(handleQueryListener);
        }
      });
    }

    return () => {
      if (isAttached) {
        keys.forEach(media => {
          if (typeof queries[media] === "string") {
            mediaQueryLists[media].removeListener(handleQueryListener);
          }
        });
      }
    };
  }, [queries]);
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(BreakpointContext.Provider, {
    value: queryMatch,
    children: children
  });
};

function useBreakpoint() {
  const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(BreakpointContext);

  if (context === defaultValue) {
    throw new Error("useBreakpoint must be used within BreakpointProvider");
  }

  return context;
}



/***/ })

};
;