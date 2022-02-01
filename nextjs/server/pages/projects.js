(() => {
var exports = {};
exports.id = 327;
exports.ids = [327];
exports.modules = {

/***/ 7458:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps),
/* harmony export */   "default": () => (/* binding */ Projects)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Breakpoint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(743);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1555);
/* harmony import */ var _components_CDiv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6699);
/* harmony import */ var _lib_projectsLib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1585);
/* harmony import */ var _styles_Projects_module_css__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(6182);
/* harmony import */ var _styles_Projects_module_css__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_styles_Projects_module_css__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _firebase_fire_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2830);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8828);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(firebase_storage__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1664);
/* harmony import */ var _components_CSpan__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(831);
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2156);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4074);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(762);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(framer_motion__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_tooltip__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1067);
/* harmony import */ var react_tooltip__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_tooltip__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swiper_react__WEBPACK_IMPORTED_MODULE_9__, swiper__WEBPACK_IMPORTED_MODULE_10__]);
([swiper_react__WEBPACK_IMPORTED_MODULE_9__, swiper__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__);









 // import Image from "next/image";





 //FRAMER IMPORTS





swiper__WEBPACK_IMPORTED_MODULE_10__.default.use([swiper__WEBPACK_IMPORTED_MODULE_10__.Pagination, swiper__WEBPACK_IMPORTED_MODULE_10__.Navigation, swiper__WEBPACK_IMPORTED_MODULE_10__.Autoplay, swiper__WEBPACK_IMPORTED_MODULE_10__.EffectCreative, swiper__WEBPACK_IMPORTED_MODULE_10__.Keyboard, swiper__WEBPACK_IMPORTED_MODULE_10__.Controller]);
async function getStaticProps() {
  let projects = await (0,_lib_projectsLib__WEBPACK_IMPORTED_MODULE_4__/* .getAllProjects */ .Yw)();
  return {
    props: {
      projects
    }
  };
}
const projectsContainer__motion = {
  show: {
    transition: {
      staggerChildren: 0.4
    }
  }
};
const project__motion = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateX: -90
  },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1.7
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      ease: "easeInOut",
      duration: 0.7
    }
  }
};
function Projects({
  projects
}) {
  const swiperRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const breakpoints = (0,_components_Breakpoint__WEBPACK_IMPORTED_MODULE_1__/* .useBreakpoint */ .G)();
  const {
    0: activeProject,
    1: setactiveProject
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0); //get images from storage

  const {
    0: images,
    1: setimages
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);

  const loadImages = async () => {
    let async_images = await Promise.all(projects.map(async project => {
      return {
        id: project.id,
        pic: await (0,firebase_storage__WEBPACK_IMPORTED_MODULE_6__.getDownloadURL)((0,firebase_storage__WEBPACK_IMPORTED_MODULE_6__.ref)(_firebase_fire_config__WEBPACK_IMPORTED_MODULE_5__/* .projectStorage */ .v, project.cover))
      };
    }));
    setimages(async_images);
  };

  const setCurrent = val => {
    !breakpoints.md && setactiveProject(val);
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    loadImages();
  }, []); // useEffect(() => {
  //     if (swiperRef.current !== null && !breakpoints.md)
  //         swiperRef.current.swiper.slideTo(activeProject, 0, 1);
  // }, [activeProject]);

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx(_components_layout__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z, {
    children: !breakpoints.md ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_11__.motion.div, {
      variants: projectsContainer__motion,
      initial: "hidden",
      animate: "show",
      exit: "exit",
      className: (_styles_Projects_module_css__WEBPACK_IMPORTED_MODULE_14___default().projectWrapper),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_11__.motion.div, {
        variants: project__motion,
        className: (_styles_Projects_module_css__WEBPACK_IMPORTED_MODULE_14___default().projects__swiper),
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx(swiper_react__WEBPACK_IMPORTED_MODULE_9__.Swiper, {
          className: "mySwiperProjects",
          modules: [swiper__WEBPACK_IMPORTED_MODULE_10__.Navigation, swiper__WEBPACK_IMPORTED_MODULE_10__.Pagination, swiper__WEBPACK_IMPORTED_MODULE_10__.Controller, swiper__WEBPACK_IMPORTED_MODULE_10__.Mousewheel, swiper__WEBPACK_IMPORTED_MODULE_10__.Keyboard, swiper__WEBPACK_IMPORTED_MODULE_10__.FreeMode],
          slidesPerView: 3,
          spaceBetween: 50,
          navigation: true // pagination={{ clickable: true }}
          ,
          scrollbar: {
            draggable: true
          },
          ref: swiperRef // freeMode={true}
          ,
          mousewheel: {
            releaseOnEdges: true
          },
          keyboard: {
            enabled: true
          },
          loop: true // loopedSlides={3}
          ,
          centeredSlides: true,
          onSlideChange: swiper => {
            // console.log("slide change", swiper, [
            //     activeProject,
            // ]);
            setactiveProject(swiper.realIndex);
            react_tooltip__WEBPACK_IMPORTED_MODULE_12___default().hide(`tip_${swiper.realIndex}`);
            react_tooltip__WEBPACK_IMPORTED_MODULE_12___default().rebuild();
          },
          children: projects.map((el, index) => {
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(swiper_react__WEBPACK_IMPORTED_MODULE_9__.SwiperSlide, {
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx(next_link__WEBPACK_IMPORTED_MODULE_7__.default, {
                href: `/projects/${el.id}`,
                children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx("a", {
                  className: (_styles_Projects_module_css__WEBPACK_IMPORTED_MODULE_14___default().projects__swiper__name) // onMouseEnter={() =>
                  //     setactiveProject(index)
                  // }
                  // onMouseLeave={() =>
                  //     setactiveProject(
                  //         swiperRef.current.swiper
                  //             .realIndex
                  //     )
                  // }
                  ,
                  "data-tip": index,
                  "data-for": `tip_${index}`,
                  children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx("span", {
                    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx(_components_CSpan__WEBPACK_IMPORTED_MODULE_8__/* .default */ .Z, {
                      text: projects[index].name
                    })
                  })
                })
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx((react_tooltip__WEBPACK_IMPORTED_MODULE_12___default()), {
                id: `tip_${index}`,
                place: "top",
                type: "dark",
                effect: "float",
                disable: index === activeProject,
                getContent: dataTip => {
                  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx("img", {
                    src: images[dataTip] && images[dataTip].pic && images[dataTip].pic,
                    className: (_styles_Projects_module_css__WEBPACK_IMPORTED_MODULE_14___default().projects__preview_image)
                  });
                }
              })]
            }, `${index}_slide_lrg`);
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_11__.motion.div, {
          className: `${(_styles_Projects_module_css__WEBPACK_IMPORTED_MODULE_14___default().projects__background)}`,
          id: "background",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx("img", {
            src: images[activeProject] && images[activeProject].pic && images[activeProject].pic,
            className: (_styles_Projects_module_css__WEBPACK_IMPORTED_MODULE_14___default().projects__background__image)
          }, `show_${activeProject}_pics_lrg`), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)("div", {
            className: (_styles_Projects_module_css__WEBPACK_IMPORTED_MODULE_14___default().projects__background__desc),
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx("div", {
              children: projects[activeProject].desc
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx("div", {
              className: (_styles_Projects_module_css__WEBPACK_IMPORTED_MODULE_14___default().projects__background__desc__count),
              children: `${activeProject + 1}/${projects.length}`
            })]
          })]
        })]
      })
    }) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_11__.motion.div, {
      className: (_styles_Projects_module_css__WEBPACK_IMPORTED_MODULE_14___default().projectWrapper),
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx(swiper_react__WEBPACK_IMPORTED_MODULE_9__.Swiper, {
        cssMode: true,
        className: (_styles_Projects_module_css__WEBPACK_IMPORTED_MODULE_14___default().mySwiper2),
        modules: [swiper__WEBPACK_IMPORTED_MODULE_10__.Navigation, swiper__WEBPACK_IMPORTED_MODULE_10__.Pagination, swiper__WEBPACK_IMPORTED_MODULE_10__.Controller, swiper__WEBPACK_IMPORTED_MODULE_10__.Keyboard],
        slidesPerView: 1,
        navigation: true,
        pagination: true,
        keyboard: {
          enabled: true
        },
        children: images.map((el, index) => {
          return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx(swiper_react__WEBPACK_IMPORTED_MODULE_9__.SwiperSlide, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_11__.motion.div, {
              className: `${(_styles_Projects_module_css__WEBPACK_IMPORTED_MODULE_14___default().projectContainer)}`,
              variants: projectsContainer__motion,
              initial: "hidden",
              animate: "show",
              exit: "exit",
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_11__.motion.div, {
                className: (_styles_Projects_module_css__WEBPACK_IMPORTED_MODULE_14___default().project__content),
                children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_11__.motion.div, {
                  variants: project__motion,
                  children: projects[index].name
                })
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx(next_link__WEBPACK_IMPORTED_MODULE_7__.default, {
                href: `/projects/${el.id}`,
                children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx("a", {
                  children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_13__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_11__.motion.img, {
                    src: el.pic,
                    className: (_styles_Projects_module_css__WEBPACK_IMPORTED_MODULE_14___default().projects__swiper__image),
                    variants: project__motion
                  }, `${el.id}_${index}_pics_med`)
                })
              })]
            }, `${el}_${index}_projects_med`)
          }, `${index}_slide_med`);
        })
      })
    })
  });
}
});

/***/ }),

/***/ 6182:
/***/ ((module) => {

// Exports
module.exports = {
	"projectWrapper": "Projects_projectWrapper__ZlEdB",
	"projectList": "Projects_projectList__1z8ox",
	"projectList2": "Projects_projectList2__KfvgA",
	"projectList__header": "Projects_projectList__header__1CbXB",
	"mySwiper": "Projects_mySwiper__3Uty4",
	"mySwiper2": "Projects_mySwiper2__15GZl",
	"projects__swiper": "Projects_projects__swiper__28laF",
	"projectContainer": "Projects_projectContainer__2vKZR",
	"project": "Projects_project__2H63f",
	"project__content": "Projects_project__content__1Y7k7",
	"projects__swiper__image": "Projects_projects__swiper__image__SQjry",
	"projects__swiper__name": "Projects_projects__swiper__name__2oqz-",
	"projects__preview_image": "Projects_projects__preview_image__PUG4w",
	"projects__background": "Projects_projects__background__SKz5d",
	"projects__background__image": "Projects_projects__background__image__2JWLD",
	"projects__background__desc": "Projects_projects__background__desc__3XVVA",
	"projects__background__desc__count": "Projects_projects__background__desc__count__1B9xr",
	"date": "Projects_date__3Wy93"
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

/***/ 1067:
/***/ ((module) => {

"use strict";
module.exports = require("react-tooltip");

/***/ }),

/***/ 5282:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 4074:
/***/ ((module) => {

"use strict";
module.exports = import("swiper");;

/***/ }),

/***/ 2156:
/***/ ((module) => {

"use strict";
module.exports = import("swiper/react");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [664,743,431,585], () => (__webpack_exec__(7458)));
module.exports = __webpack_exports__;

})();