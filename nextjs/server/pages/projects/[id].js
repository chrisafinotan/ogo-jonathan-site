(() => {
var exports = {};
exports.id = 92;
exports.ids = [92];
exports.modules = {

/***/ 1605:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getStaticPaths": () => (/* binding */ getStaticPaths),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps),
/* harmony export */   "default": () => (/* binding */ work)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6731);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Breakpoint__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(743);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1555);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(701);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1664);
/* harmony import */ var _lib_projectsLib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1585);
/* harmony import */ var _styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(1852);
/* harmony import */ var _styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var swiper_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2156);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4074);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(762);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(framer_motion__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([swiper_react__WEBPACK_IMPORTED_MODULE_7__, swiper__WEBPACK_IMPORTED_MODULE_8__]);
([swiper_react__WEBPACK_IMPORTED_MODULE_7__, swiper__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__);












 //FRAMER IMPORTS




swiper__WEBPACK_IMPORTED_MODULE_8__.default.use([swiper__WEBPACK_IMPORTED_MODULE_8__.Navigation, swiper__WEBPACK_IMPORTED_MODULE_8__.Pagination, swiper__WEBPACK_IMPORTED_MODULE_8__.Mousewheel, swiper__WEBPACK_IMPORTED_MODULE_8__.Autoplay, swiper__WEBPACK_IMPORTED_MODULE_8__.FreeMode]);
async function getStaticPaths() {
  const paths = await (0,_lib_projectsLib__WEBPACK_IMPORTED_MODULE_6__/* .getAllProjectIds */ .c6)();
  return {
    paths: paths,
    fallback: false
  };
}
async function getStaticProps(context) {
  const {
    params
  } = context;
  const projectID = params.id;
  const projects = await (0,_lib_projectsLib__WEBPACK_IMPORTED_MODULE_6__/* .getAllProjects */ .Yw)();
  const projectData = await (0,_lib_projectsLib__WEBPACK_IMPORTED_MODULE_6__/* .getProjectData */ .xU)(projectID);
  const projectPictures = await (0,_lib_projectsLib__WEBPACK_IMPORTED_MODULE_6__/* .getAssets */ .Vh)(projectData.Files);
  return {
    props: {
      projectID,
      projects,
      projectData,
      projectPictures
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
function work({
  projectID,
  projects,
  projectData,
  projectPictures
}) {
  const breakpoints = (0,_components_Breakpoint__WEBPACK_IMPORTED_MODULE_2__/* .useBreakpoint */ .G)();
  const elRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const {
    0: projectPics,
    1: setPictures
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const {
    0: nextProj,
    1: showNext
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    0: prevProj,
    1: showPrev
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    0: linkIndex,
    1: setLinkIndex
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  const {
    0: display,
    1: setDisplay
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();

  const getProjectIndex = () => {
    let index = projects.findIndex(el => el.id === projectID);
    showNext(true);
    showPrev(true);

    if (index === 0) {
      showPrev(false);
    }

    if (index === projects.length - 1) {
      showNext(false);
    }

    setLinkIndex(index);
  }; // console.log(breakpoints);
  // console.log(projectPics);
  // console.log('display', display);


  const show = () => {
    projectPics.length > 0 ? setDisplay(true) : setDisplay(false);
  };

  const nextPage = () => {
    window.scrollTo(0, 0);
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setPictures(projectPictures);
    getProjectIndex();
  }, [projectPictures]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    show();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [projectPics]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    console.log("page reload", window.location.href);
  }, []);
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(_components_layout__WEBPACK_IMPORTED_MODULE_3__/* .default */ .Z, {
    children: display ? !breakpoints.md ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("div", {
      className: (_styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11___default().container__lrg),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_9__.motion.div, {
        ref: elRef,
        className: (_styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11___default().projectImagesWrapper__lrg),
        variants: projectsContainer__motion,
        initial: "hidden",
        animate: "show",
        exit: "exit",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(swiper_react__WEBPACK_IMPORTED_MODULE_7__.Swiper, {
          className: "mySwiperID" // className={projectsPageStyles.mySwiper}
          ,
          modules: [swiper__WEBPACK_IMPORTED_MODULE_8__.Navigation, swiper__WEBPACK_IMPORTED_MODULE_8__.Pagination, swiper__WEBPACK_IMPORTED_MODULE_8__.Controller, swiper__WEBPACK_IMPORTED_MODULE_8__.Mousewheel, swiper__WEBPACK_IMPORTED_MODULE_8__.Keyboard, swiper__WEBPACK_IMPORTED_MODULE_8__.FreeMode],
          navigation: true,
          pagination: {
            clickable: true
          },
          scrollbar: {
            draggable: true
          },
          keyboard: {
            enabled: true
          },
          freeMode: true,
          mousewheel: {
            releaseOnEdges: true
          },
          slidesPerView: "auto" // slidesPerView={breakpoints.lg ? 4 : breakpoints.md ? 2 : 1}
          // loop
          ,
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(swiper_react__WEBPACK_IMPORTED_MODULE_7__.SwiperSlide, {
            className: "mySwiperSlideInfo",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_9__.motion.div, {
              className: (_styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11___default().project__info__lrg),
              children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_9__.motion.div, {
                className: (_styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11___default().project__name__lrg),
                variants: project__motion,
                children: projectData.Name
              }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_9__.motion.div, {
                className: (_styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11___default().project__desc__lrg),
                variants: project__motion,
                children: projectData.Description
              })]
            })
          }, `desc_slide_lrg`), projectPics.map((el, index) => {
            return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(swiper_react__WEBPACK_IMPORTED_MODULE_7__.SwiperSlide, {
              className: "mySwiperSlide",
              children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_9__.motion.img, {
                src: el.pic && el.pic,
                className: (_styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11___default().image__lrg),
                variants: project__motion
              }, `${el}_${index}_project_pics_lrg`)
            }, `${index}_slide_lrg`);
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(swiper_react__WEBPACK_IMPORTED_MODULE_7__.SwiperSlide, {
            className: "mySwiperSlide__end",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_9__.motion.div, {
              className: (_styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11___default().project__end)
            })
          }, `desc_slide_lrg_end`)]
        }), prevProj && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(next_link__WEBPACK_IMPORTED_MODULE_5__.default, {
          href: `/projects/${projects[linkIndex - 1].id}`,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("a", {
            className: (_styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11___default().projectNavigator__prev),
            onClick: nextPage,
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("div", {
              children: "PREV"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("div", {
              className: (_styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11___default().projectNavigator__prev__name),
              children: projects[linkIndex - 1].name
            })]
          })
        }), nextProj &&
        /*#__PURE__*/
        // <Link
        //     href={`/projects/${
        //         projects[linkIndex + 1].id
        //     }`}
        // >
        (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("a", {
          className: (_styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11___default().projectNavigator__next),
          href: `/projects/${projects[linkIndex + 1].id}` // onClick={nextPage}
          ,
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("div", {
            children: "NEXT"
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("div", {
            className: (_styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11___default().projectNavigator__prev__name),
            children: projects[linkIndex + 1].name
          })]
        }) // </Link>
        ]
      })
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_9__.motion.div, {
      className: (_styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11___default().container),
      variants: projectsContainer__motion,
      initial: "hidden",
      animate: "show",
      exit: "exit",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_9__.motion.div, {
        className: (_styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11___default().project__info),
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_9__.motion.div, {
          className: (_styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11___default().project__name),
          variants: project__motion,
          children: projectData.Name
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_9__.motion.div, {
          className: (_styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11___default().project__desc),
          variants: project__motion,
          children: projectData.Description
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)(framer_motion__WEBPACK_IMPORTED_MODULE_9__.motion.div, {
        className: (_styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11___default().projectImagesWrapper),
        children: [projectPics.map((el, index) => {
          return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_9__.motion.div, {
            className: (_styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11___default().projectImageWrapper),
            variants: project__motion,
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("img", {
              src: el.pic,
              className: (_styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11___default().image)
            }, `${projectData.Name}_${el.index}_pic`)
          }, `${index}_pic_sml`);
        }), prevProj && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(next_link__WEBPACK_IMPORTED_MODULE_5__.default, {
          href: `/projects/${projects[linkIndex - 1].id}`,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("a", {
            className: (_styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11___default().projectNavigator__prev),
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("div", {
              children: "PREV"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("div", {
              className: (_styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11___default().projectNavigator__prev__name),
              children: projects[linkIndex - 1].name
            })]
          })
        }), nextProj && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx(next_link__WEBPACK_IMPORTED_MODULE_5__.default, {
          href: `/projects/${projects[linkIndex + 1].id}`,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxs)("a", {
            className: (_styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11___default().projectNavigator__next),
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("div", {
              children: "NEXT"
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("div", {
              className: (_styles_ID_module_css__WEBPACK_IMPORTED_MODULE_11___default().projectNavigator__prev__name),
              children: projects[linkIndex + 1].name
            })]
          })
        })]
      })]
    }) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_10__.jsx("div", {
      children: "LOADING"
    })
  });
}
});

/***/ }),

/***/ 1852:
/***/ ((module) => {

// Exports
module.exports = {
	"mySwiper": "ID_mySwiper__ErUl9",
	"swiper-wrapper": "ID_swiper-wrapper__1FH7y",
	"mySwiperSlide": "ID_mySwiperSlide__3OPyL",
	"swiper-slide": "ID_swiper-slide__1mioW",
	"projectNavigator": "ID_projectNavigator__3zEbW",
	"projectNavigator__next": "ID_projectNavigator__next__3nVgf",
	"projectNavigator__prev__name": "ID_projectNavigator__prev__name__2Bmbh",
	"projectNavigator__prev": "ID_projectNavigator__prev__1sV9V",
	"container": "ID_container__29c5s",
	"project__info": "ID_project__info__1Y2Ha",
	"projectImagesWrapper": "ID_projectImagesWrapper__1y_51",
	"projectImageWrapper": "ID_projectImageWrapper__OQuu7",
	"image": "ID_image__2zJpH",
	"container__lrg": "ID_container__lrg__2A5ld",
	"project__info__lrg": "ID_project__info__lrg__2qP_d",
	"project__name__lrg": "ID_project__name__lrg__3VAWZ",
	"project__desc__lrg": "ID_project__desc__lrg__3tPUP",
	"project__end": "ID_project__end__1JcaZ",
	"projectImagesWrapper__lrg": "ID_projectImagesWrapper__lrg__gD9Wo",
	"image__lrg": "ID_image__lrg__1SBjD"
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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [664,743,431,585], () => (__webpack_exec__(1605)));
module.exports = __webpack_exports__;

})();