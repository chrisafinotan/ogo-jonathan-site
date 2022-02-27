"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 9882:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(6731);
// EXTERNAL MODULE: ./context/breakpointContext.js
var breakpointContext = __webpack_require__(8890);
// EXTERNAL MODULE: ./context/globalContext.js
var globalContext = __webpack_require__(231);
// EXTERNAL MODULE: ./lib/projectsLib.js + 1 modules
var projectsLib = __webpack_require__(3428);
// EXTERNAL MODULE: ./styles/globalStyles.js
var globalStyles = __webpack_require__(188);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./components/Loading.js




const Loading = ({
  loading
}) => {
  const {
    currentTheme
  } = (0,globalContext/* useGlobalStateContext */.mX)();
  let color;

  switch (currentTheme) {
    case "dark":
      color = "var(--main-bg-black)";
      break;

    case "light":
      color = "var(--main-bg-white)";
      break;

    case "ferhat":
      color = "var(--main-bg-brown)";
      break;
  }

  return /*#__PURE__*/jsx_runtime_.jsx(globalStyles/* LoadingBanner */.yV, {
    loading: loading ? "loading" : "",
    color: color,
    children: /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "row",
      children: /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "text",
        children: "OgoJonathan"
      })
    })
  });
};

/* harmony default export */ const components_Loading = (Loading);
// EXTERNAL MODULE: external "framer-motion"
var external_framer_motion_ = __webpack_require__(762);
;// CONCATENATED MODULE: external "@fortawesome/fontawesome-svg-core"
const fontawesome_svg_core_namespaceObject = require("@fortawesome/fontawesome-svg-core");
;// CONCATENATED MODULE: ./pages/_app.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













fontawesome_svg_core_namespaceObject.config.autoAddCss = false;
const queries = {
  xs: "(max-width: 320px)",
  sm: "(max-width: 720px)",
  md: "(max-width: 1024px)",
  lg: "(min-width: 1200px)",
  or: "(orientation: portrait)"
};

function MyApp({
  Component,
  pageProps
}) {
  const router = (0,router_.useRouter)();
  const {
    0: loading,
    1: setLoading
  } = (0,external_react_.useState)(true);
  (0,external_react_.useEffect)(() => {
    const handleStart = async url => {
      // console.log("i changed it");
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };

    const handleComplete = async url => {
      // console.log("no i did");
      (0,projectsLib/* sleep */._v)(1 * 1000).then(() => {
        setLoading(false);
      });
    };

    router.events.on("routeChangeStart", () => handleStart());
    router.events.on("routeChangeComplete", () => handleComplete());
    router.events.on("routeChangeError", () => handleComplete());
    window.scrollTo(0, 0);
  }, [router]);
  return /*#__PURE__*/jsx_runtime_.jsx(external_framer_motion_.AnimatePresence, {
    exitBeforeEnter: true,
    children: /*#__PURE__*/jsx_runtime_.jsx(external_framer_motion_.AnimateSharedLayout, {
      children: /*#__PURE__*/jsx_runtime_.jsx(globalContext/* GlobalProvider */.R, {
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(breakpointContext/* BreakpointProvider */.q, {
          queries: queries,
          children: [/*#__PURE__*/jsx_runtime_.jsx(components_Loading, {
            loading: loading
          }), /*#__PURE__*/jsx_runtime_.jsx(Component, _objectSpread(_objectSpread({}, pageProps), {}, {
            setLoading: setLoading
          }))]
        })
      })
    })
  });
}

/* harmony default export */ const _app = (MyApp);

/***/ }),

/***/ 9421:
/***/ ((module) => {

module.exports = require("firebase/app");

/***/ }),

/***/ 9714:
/***/ ((module) => {

module.exports = require("firebase/firestore");

/***/ }),

/***/ 8828:
/***/ ((module) => {

module.exports = require("firebase/storage");

/***/ }),

/***/ 762:
/***/ ((module) => {

module.exports = require("framer-motion");

/***/ }),

/***/ 6731:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 9297:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 5282:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 9914:
/***/ ((module) => {

module.exports = require("styled-components");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [709], () => (__webpack_exec__(9882)));
module.exports = __webpack_exports__;

})();