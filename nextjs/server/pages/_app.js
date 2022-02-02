/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./components/Breakpoint.js":
/*!**********************************!*\
  !*** ./components/Breakpoint.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useBreakpoint\": () => (/* binding */ useBreakpoint),\n/* harmony export */   \"BreakpointProvider\": () => (/* binding */ BreakpointProvider)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\nvar _jsxFileName = \"/Users/itsemisanafinotan/Desktop/ogo-jonathan-site/components/Breakpoint.js\";\n\n\nconst defaultValue = {};\nconst BreakpointContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(defaultValue);\n\nconst BreakpointProvider = ({\n  children,\n  queries\n}) => {\n  const {\n    0: queryMatch,\n    1: setQueryMatch\n  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const mediaQueryLists = {};\n    const keys = Object.keys(queries);\n    let isAttached = false;\n\n    const handleQueryListener = () => {\n      const updatedMatches = keys.reduce((acc, media) => {\n        acc[media] = !!(mediaQueryLists[media] && mediaQueryLists[media].matches);\n        return acc;\n      }, {});\n      setQueryMatch(updatedMatches);\n    };\n\n    if (window && window.matchMedia) {\n      const matches = {};\n      keys.forEach(media => {\n        if (typeof queries[media] === \"string\") {\n          mediaQueryLists[media] = window.matchMedia(queries[media]);\n          matches[media] = mediaQueryLists[media].matches;\n        } else {\n          matches[media] = false;\n        }\n      });\n      setQueryMatch(matches);\n      isAttached = true;\n      keys.forEach(media => {\n        if (typeof queries[media] === \"string\") {\n          mediaQueryLists[media].addListener(handleQueryListener);\n        }\n      });\n    }\n\n    return () => {\n      if (isAttached) {\n        keys.forEach(media => {\n          if (typeof queries[media] === \"string\") {\n            mediaQueryLists[media].removeListener(handleQueryListener);\n          }\n        });\n      }\n    };\n  }, [queries]);\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(BreakpointContext.Provider, {\n    value: queryMatch,\n    children: children\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 58,\n    columnNumber: 9\n  }, undefined);\n};\n\nfunction useBreakpoint() {\n  const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(BreakpointContext);\n\n  if (context === defaultValue) {\n    throw new Error(\"useBreakpoint must be used within BreakpointProvider\");\n  }\n\n  return context;\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ3JCLFFBQU1DLE9BQU8sR0FBR3hCLGlEQUFVLENBQUNFLGlCQUFELENBQTFCOztBQUNBLE1BQUlzQixPQUFPLEtBQUt2QixZQUFoQixFQUE4QjtBQUMxQixVQUFNLElBQUl3QixLQUFKLENBQVUsc0RBQVYsQ0FBTjtBQUNIOztBQUNELFNBQU9ELE9BQVA7QUFDSCIsInNvdXJjZXMiOlsid2VicGFjazovL29nby1qb25hdGhhbi1zaXRlLy4vY29tcG9uZW50cy9CcmVha3BvaW50LmpzPzAxZDUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCB9IGZyb20gXCJyZWFjdFwiO1xuXG5jb25zdCBkZWZhdWx0VmFsdWUgPSB7fTtcblxuY29uc3QgQnJlYWtwb2ludENvbnRleHQgPSBjcmVhdGVDb250ZXh0KGRlZmF1bHRWYWx1ZSk7XG5cbmNvbnN0IEJyZWFrcG9pbnRQcm92aWRlciA9ICh7IGNoaWxkcmVuLCBxdWVyaWVzIH0pID0+IHtcbiAgICBjb25zdCBbcXVlcnlNYXRjaCwgc2V0UXVlcnlNYXRjaF0gPSB1c2VTdGF0ZSh7fSk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBtZWRpYVF1ZXJ5TGlzdHMgPSB7fTtcbiAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHF1ZXJpZXMpO1xuICAgICAgICBsZXQgaXNBdHRhY2hlZCA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IGhhbmRsZVF1ZXJ5TGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkTWF0Y2hlcyA9IGtleXMucmVkdWNlKChhY2MsIG1lZGlhKSA9PiB7XG4gICAgICAgICAgICAgICAgYWNjW21lZGlhXSA9ICEhKFxuICAgICAgICAgICAgICAgICAgICBtZWRpYVF1ZXJ5TGlzdHNbbWVkaWFdICYmIG1lZGlhUXVlcnlMaXN0c1ttZWRpYV0ubWF0Y2hlc1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgICAgIHNldFF1ZXJ5TWF0Y2godXBkYXRlZE1hdGNoZXMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh3aW5kb3cgJiYgd2luZG93Lm1hdGNoTWVkaWEpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoZXMgPSB7fTtcbiAgICAgICAgICAgIGtleXMuZm9yRWFjaCgobWVkaWEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHF1ZXJpZXNbbWVkaWFdID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lZGlhUXVlcnlMaXN0c1ttZWRpYV0gPSB3aW5kb3cubWF0Y2hNZWRpYShxdWVyaWVzW21lZGlhXSk7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZXNbbWVkaWFdID0gbWVkaWFRdWVyeUxpc3RzW21lZGlhXS5tYXRjaGVzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZXNbbWVkaWFdID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXRRdWVyeU1hdGNoKG1hdGNoZXMpO1xuICAgICAgICAgICAgaXNBdHRhY2hlZCA9IHRydWU7XG4gICAgICAgICAgICBrZXlzLmZvckVhY2goKG1lZGlhKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBxdWVyaWVzW21lZGlhXSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICBtZWRpYVF1ZXJ5TGlzdHNbbWVkaWFdLmFkZExpc3RlbmVyKGhhbmRsZVF1ZXJ5TGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGlmIChpc0F0dGFjaGVkKSB7XG4gICAgICAgICAgICAgICAga2V5cy5mb3JFYWNoKChtZWRpYSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHF1ZXJpZXNbbWVkaWFdID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZWRpYVF1ZXJ5TGlzdHNbbWVkaWFdLnJlbW92ZUxpc3RlbmVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVF1ZXJ5TGlzdGVuZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9LCBbcXVlcmllc10pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPEJyZWFrcG9pbnRDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXtxdWVyeU1hdGNofT5cbiAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9CcmVha3BvaW50Q29udGV4dC5Qcm92aWRlcj5cbiAgICApO1xufTtcblxuZnVuY3Rpb24gdXNlQnJlYWtwb2ludCgpIHtcbiAgICBjb25zdCBjb250ZXh0ID0gdXNlQ29udGV4dChCcmVha3BvaW50Q29udGV4dCk7XG4gICAgaWYgKGNvbnRleHQgPT09IGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1c2VCcmVha3BvaW50IG11c3QgYmUgdXNlZCB3aXRoaW4gQnJlYWtwb2ludFByb3ZpZGVyXCIpO1xuICAgIH1cbiAgICByZXR1cm4gY29udGV4dDtcbn1cbmV4cG9ydCB7IHVzZUJyZWFrcG9pbnQsIEJyZWFrcG9pbnRQcm92aWRlciB9O1xuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiY3JlYXRlQ29udGV4dCIsInVzZUNvbnRleHQiLCJkZWZhdWx0VmFsdWUiLCJCcmVha3BvaW50Q29udGV4dCIsIkJyZWFrcG9pbnRQcm92aWRlciIsImNoaWxkcmVuIiwicXVlcmllcyIsInF1ZXJ5TWF0Y2giLCJzZXRRdWVyeU1hdGNoIiwibWVkaWFRdWVyeUxpc3RzIiwia2V5cyIsIk9iamVjdCIsImlzQXR0YWNoZWQiLCJoYW5kbGVRdWVyeUxpc3RlbmVyIiwidXBkYXRlZE1hdGNoZXMiLCJyZWR1Y2UiLCJhY2MiLCJtZWRpYSIsIm1hdGNoZXMiLCJ3aW5kb3ciLCJtYXRjaE1lZGlhIiwiZm9yRWFjaCIsImFkZExpc3RlbmVyIiwicmVtb3ZlTGlzdGVuZXIiLCJ1c2VCcmVha3BvaW50IiwiY29udGV4dCIsIkVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/Breakpoint.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_Breakpoint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Breakpoint */ \"./components/Breakpoint.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__);\nvar _jsxFileName = \"/Users/itsemisanafinotan/Desktop/ogo-jonathan-site/pages/_app.js\";\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\nconst queries = {\n  xs: \"(max-width: 320px)\",\n  sm: \"(max-width: 720px)\",\n  md: \"(max-width: 1024px)\",\n  lg: \"(min-width: 1200px)\",\n  or: \"(orientation: portrait)\" // we can check orientation also\n\n};\n\nfunction MyApp({\n  Component,\n  pageProps\n}) {\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(_components_Breakpoint__WEBPACK_IMPORTED_MODULE_1__.BreakpointProvider, {\n    queries: queries,\n    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(Component, _objectSpread({}, pageProps), void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 16,\n      columnNumber: 13\n    }, this)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 15,\n    columnNumber: 9\n  }, this);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQTs7QUFFQSxNQUFNQyxPQUFPLEdBQUc7QUFDWkMsRUFBQUEsRUFBRSxFQUFFLG9CQURRO0FBRVpDLEVBQUFBLEVBQUUsRUFBRSxvQkFGUTtBQUdaQyxFQUFBQSxFQUFFLEVBQUUscUJBSFE7QUFJWkMsRUFBQUEsRUFBRSxFQUFFLHFCQUpRO0FBS1pDLEVBQUFBLEVBQUUsRUFBRSx5QkFMUSxDQUttQjs7QUFMbkIsQ0FBaEI7O0FBUUEsU0FBU0MsS0FBVCxDQUFlO0FBQUVDLEVBQUFBLFNBQUY7QUFBYUMsRUFBQUE7QUFBYixDQUFmLEVBQXlDO0FBQ3JDLHNCQUNJLDhEQUFDLHNFQUFEO0FBQW9CLFdBQU8sRUFBRVIsT0FBN0I7QUFBQSwyQkFDSSw4REFBQyxTQUFELG9CQUFlUSxTQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFESjtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBREo7QUFLSDs7QUFFRCxpRUFBZUYsS0FBZiIsInNvdXJjZXMiOlsid2VicGFjazovL29nby1qb25hdGhhbi1zaXRlLy4vcGFnZXMvX2FwcC5qcz9kNTMwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4uL3N0eWxlcy9nbG9iYWxzLmNzc1wiO1xuXG5pbXBvcnQgeyBCcmVha3BvaW50UHJvdmlkZXIgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9CcmVha3BvaW50XCI7XG5cbmNvbnN0IHF1ZXJpZXMgPSB7XG4gICAgeHM6IFwiKG1heC13aWR0aDogMzIwcHgpXCIsXG4gICAgc206IFwiKG1heC13aWR0aDogNzIwcHgpXCIsXG4gICAgbWQ6IFwiKG1heC13aWR0aDogMTAyNHB4KVwiLFxuICAgIGxnOiBcIihtaW4td2lkdGg6IDEyMDBweClcIixcbiAgICBvcjogXCIob3JpZW50YXRpb246IHBvcnRyYWl0KVwiLCAvLyB3ZSBjYW4gY2hlY2sgb3JpZW50YXRpb24gYWxzb1xufTtcblxuZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPEJyZWFrcG9pbnRQcm92aWRlciBxdWVyaWVzPXtxdWVyaWVzfT5cbiAgICAgICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICAgICAgPC9CcmVha3BvaW50UHJvdmlkZXI+XG4gICAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7XG4iXSwibmFtZXMiOlsiQnJlYWtwb2ludFByb3ZpZGVyIiwicXVlcmllcyIsInhzIiwic20iLCJtZCIsImxnIiwib3IiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.js"));
module.exports = __webpack_exports__;

})();