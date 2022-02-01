(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 6124:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps),
/* harmony export */   "default": () => (/* binding */ Home)
/* harmony export */ });
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1555);
/* harmony import */ var animejs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8388);
/* harmony import */ var animejs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(animejs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8409);
/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _lib_projectsLib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1585);
/* harmony import */ var _firebase_fire_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2830);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8828);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(firebase_storage__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_CSpan__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(831);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1664);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

 //ANIME IMPORTS';








 // SwiperCore.use([Navigation, Autoplay]);



async function getStaticProps() {
  const projects = await (0,_lib_projectsLib__WEBPACK_IMPORTED_MODULE_3__/* .getAllHomeProjects */ .e1)();
  return {
    props: {
      projects
    }
  };
}
function Home({
  projects
}) {
  //get images from storage
  const {
    0: images,
    1: setimages
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);

  const loadImages = async () => {
    let async_images = await Promise.all(projects.map(async project => {
      return _objectSpread({
        pic: await (0,firebase_storage__WEBPACK_IMPORTED_MODULE_5__.getDownloadURL)((0,firebase_storage__WEBPACK_IMPORTED_MODULE_5__.ref)(_firebase_fire_config__WEBPACK_IMPORTED_MODULE_4__/* .projectStorage */ .v, project.file))
      }, project);
    }));
    setimages(async_images);
  };

  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    loadImages();
  }, []);
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(_components_layout__WEBPACK_IMPORTED_MODULE_0__/* .default */ .Z, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
      className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_9___default().mainWrapper),
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(_components_CSpan__WEBPACK_IMPORTED_MODULE_6__/* .default */ .Z, {
        text: "Ogo Jonathan",
        className: "ml6"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("div", {
        className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_9___default().scrollWrapper),
        children: images.map((el, index) => {
          return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("div", {
            className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_9___default().imgWrapper),
            style: {
              marginLeft: `${Math.random() * (75 - 20) + 20}vw`
            },
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(next_link__WEBPACK_IMPORTED_MODULE_7__.default, {
              href: `/projects/${el.link}`,
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("a", {
                children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("img", {
                  src: el.pic && el.pic,
                  alt: el.name,
                  className: (_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_9___default().imageComponent)
                })
              })
            })
          }, `${index}_home_image`);
        })
      })]
    })
  });
}

/***/ }),

/***/ 8409:
/***/ ((module) => {

// Exports
module.exports = {
	"mainWrapper": "Home_mainWrapper__37PH3",
	"siteSVG": "Home_siteSVG__1ZFVC",
	"imageComponent": "Home_imageComponent__2IKqe",
	"scrollWrapper": "Home_scrollWrapper__2pK7o",
	"imgWrapper": "Home_imgWrapper__2gLgo"
};


/***/ }),

/***/ 8388:
/***/ ((module) => {

"use strict";
module.exports = require("animejs");

/***/ }),

/***/ 9421:
/***/ ((module) => {

"use strict";
module.exports = require("firebase/app");

/***/ }),

/***/ 9714:
/***/ ((module) => {

"use strict";
module.exports = require("firebase/firestore");

/***/ }),

/***/ 8828:
/***/ ((module) => {

"use strict";
module.exports = require("firebase/storage");

/***/ }),

/***/ 762:
/***/ ((module) => {

"use strict";
module.exports = require("framer-motion");

/***/ }),

/***/ 920:
/***/ ((module) => {

"use strict";
module.exports = require("hamburger-react");

/***/ }),

/***/ 9325:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 5378:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 7162:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 8773:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 2248:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 9372:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 665:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 2747:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 333:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 3456:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 7620:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 701:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ 6731:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 9297:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 5282:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [664,743,431,585], () => (__webpack_exec__(6124)));
module.exports = __webpack_exports__;

})();