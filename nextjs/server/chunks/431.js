exports.id = 431;
exports.ids = [431];
exports.modules = {

/***/ 6699:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(762);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(framer_motion__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_CDiv_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2887);
/* harmony import */ var _styles_CDiv_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_CDiv_module_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);





const CDiv = ({
  text = "empty",
  startFont = "Arial",
  endFont = `'The Nautigal', cursive`,
  startSize = "4.5em",
  endSize = "3em",
  color,
  startColor = "#ffffff",
  className,
  id,
  index,
  onMouseEnter,
  onMouseExit,
  originX = 0,
  originY = 0
}) => {
  const controls = (0,framer_motion__WEBPACK_IMPORTED_MODULE_1__.useAnimation)();
  const {
    0: isAnimationPlaying,
    1: setIsAnimationPlaying
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  let ncolor = "#0028ff";
  const fontChange = {
    init: {
      // scale: 1,
      transition: {
        duration: 0.2
      },
      // backgroundColor: "inherit",
      filter: "invert(1)"
    },
    anim: {
      filter: "invert(0)",
      originX: originX,
      originY: originY,
      // scale: 1.2,
      backgroundColor: ncolor,
      transition: {
        duration: 0.2
      }
    }
  };
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.div, {
    className: `${(_styles_CDiv_module_css__WEBPACK_IMPORTED_MODULE_3___default().cdiv)}`,
    id: id,
    "data-index": index,
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.span, {
      variants: fontChange,
      whileHover: "anim",
      className: className,
      index: index,
      children: text
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CDiv);

/***/ }),

/***/ 831:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var animejs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8388);
/* harmony import */ var animejs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(animejs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);




const CSpan = ({
  text,
  className
}) => {
  const {
    0: animation,
    1: setanimation
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const {
    0: loaded,
    1: setloaded
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const myRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();

  const set = target => {
    setanimation([animejs__WEBPACK_IMPORTED_MODULE_1___default().timeline({
      targets: target,
      autoplay: false
    }).add({
      duration: 100,
      delay: animejs__WEBPACK_IMPORTED_MODULE_1___default().stagger(30),
      easing: "easeOutSine",
      opacity: 1,
      rotateY: [90, 0],
      color: "#F00"
    }), animejs__WEBPACK_IMPORTED_MODULE_1___default().timeline({
      targets: target,
      autoplay: false
    }).add({
      duration: 100,
      delay: animejs__WEBPACK_IMPORTED_MODULE_1___default().stagger(30, {
        direction: "reverse"
      }),
      easing: "easeOutSine",
      opacity: 1,
      color: "#FFF",
      rotateY: [-90, 0]
    })]);
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    myRef.current.innerHTML = myRef.current.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    setloaded(true);
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (loaded) {
      let target = `.text_${String(text).replace(/\s+/g, "")} .letter`;
      set(target);
    }
  }, [loaded]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    animation && animation[0] && animation[1].play();
  }, [animation]);

  const play = e => {
    animation && animation[0].play();
  };

  const playEnd = e => {
    animation && animation[1].play();
  };

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
    className: className,
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
      // className="text-wrapper"
      className: `text_${String(text).replace(/\s+/g, "")}`,
      onMouseEnter: play,
      onMouseLeave: playEnd,
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
        ref: myRef,
        className: "letters",
        children: text
      })
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CSpan);

/***/ }),

/***/ 1555:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Layout)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "framer-motion"
var external_framer_motion_ = __webpack_require__(762);
// EXTERNAL MODULE: ./styles/Navbar.module.css
var Navbar_module = __webpack_require__(4643);
var Navbar_module_default = /*#__PURE__*/__webpack_require__.n(Navbar_module);
// EXTERNAL MODULE: ./components/CDiv.js
var CDiv = __webpack_require__(6699);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(6731);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./components/CLink.js
const _excluded = ["activeClassName", "children", "router"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





const CLink = (0,router_.withRouter)(_ref => {
  let {
    activeClassName = "activeLink",
    children,
    router
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  const child = external_react_.Children.only(children);
  let className = child.props.className || "";
  const linkPathname = typeof props.href === "string" ? props.href : props.href.pathname || null;

  if (router.pathname === linkPathname) {
    className += ` ${activeClassName}`;
  } else if (linkPathname !== "/" && String(router.pathname).includes(linkPathname)) {
    className += ` ${activeClassName}`;
  }

  return /*#__PURE__*/jsx_runtime_.jsx(next_link.default, _objectSpread(_objectSpread({}, props), {}, {
    children: /*#__PURE__*/(0,external_react_.cloneElement)(child, {
      className
    })
  }));
});
/* harmony default export */ const components_CLink = (CLink);
// EXTERNAL MODULE: external "hamburger-react"
var external_hamburger_react_ = __webpack_require__(920);
// EXTERNAL MODULE: ./components/Breakpoint.js
var Breakpoint = __webpack_require__(743);
// EXTERNAL MODULE: ./components/CSpan.js
var CSpan = __webpack_require__(831);
;// CONCATENATED MODULE: ./components/navbar.js
//REACT IMPORTS
 //NEXT IMPORTS

 //FRAMER IMPORTS

 //STYLE IMPORTS










const colors = ["#3addcd", "#3524a3", "#af4778", "#b5c762", "#dcb450", "#e91c1c" // "#000000",
];
const container = {
  show: {
    transition: {
      staggerChildren: 0.5
    }
  },
  exit: {
    transition: {
      staggerChildren: 1
    }
  }
};
const links = {
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
      duration: 0.7
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      ease: "easeInOut",
      duration: 0.7,
      when: "afterChildren"
    }
  }
};
const wrapper = {
  hidden: {
    opacity: 0
  },
  exit: {
    opacity: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.75
    }
  }
};
function Navbar() {
  const breakpoints = (0,Breakpoint/* useBreakpoint */.G)();
  const {
    0: menuOpen,
    1: setmenuOpen
  } = (0,external_react_.useState)(false);
  const {
    0: color,
    1: setcolor
  } = (0,external_react_.useState)("none");

  const handleClick = () => {
    setmenuOpen(false);
    setcolor();
  };

  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    className: (Navbar_module_default()).navbarWrapper,
    children: !breakpoints.md ? /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
      children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
        className: `${(Navbar_module_default()).navbar__home}`,
        children: /*#__PURE__*/jsx_runtime_.jsx(components_CLink, {
          href: "/",
          children: /*#__PURE__*/jsx_runtime_.jsx("a", {
            className: (Navbar_module_default()).navbar__link,
            children: /*#__PURE__*/jsx_runtime_.jsx(CSpan/* default */.Z, {
              text: "OJ"
            })
          })
        })
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_framer_motion_.motion.div, {
        className: (Navbar_module_default()).navbar__lrg,
        onClick: handleClick,
        children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
          className: `${(Navbar_module_default()).page__lrg}`,
          children: /*#__PURE__*/jsx_runtime_.jsx(components_CLink, {
            href: "/projects",
            children: /*#__PURE__*/jsx_runtime_.jsx("a", {
              children: /*#__PURE__*/jsx_runtime_.jsx(CSpan/* default */.Z, {
                text: "PROJECTS"
              })
            })
          })
        }, "navbar-link-projects-motion__lrg"), /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: `${(Navbar_module_default()).page__lrg}`,
          children: /*#__PURE__*/jsx_runtime_.jsx(components_CLink, {
            href: "/about",
            children: /*#__PURE__*/jsx_runtime_.jsx("a", {
              children: /*#__PURE__*/jsx_runtime_.jsx(CSpan/* default */.Z, {
                text: "ABOUT"
              })
            })
          })
        }, "navbar-link-about-motion__lrg"), /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: `${(Navbar_module_default()).page__lrg}`,
          children: /*#__PURE__*/jsx_runtime_.jsx(components_CLink, {
            href: "/contact",
            children: /*#__PURE__*/jsx_runtime_.jsx("a", {
              children: /*#__PURE__*/jsx_runtime_.jsx(CSpan/* default */.Z, {
                text: "CONTACT"
              })
            })
          })
        }, "navbar-link-contact-motion")]
      })]
    }) : /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
      children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
        className: (Navbar_module_default()).header__wrapper,
        children: /*#__PURE__*/jsx_runtime_.jsx(external_hamburger_react_.Slant, {
          toggled: menuOpen,
          onToggle: toggled => {
            if (toggled) {
              setcolor(colors[Math.floor(Math.random() * colors.length)]);
              setmenuOpen(true);
            } else {
              setcolor("white");
              setmenuOpen(false);
            }
          },
          distance: "lg"
        })
      }), menuOpen && /*#__PURE__*/jsx_runtime_.jsx(external_framer_motion_.motion.div, {
        className: (Navbar_module_default()).navbar,
        children: /*#__PURE__*/jsx_runtime_.jsx(external_framer_motion_.AnimatePresence, {
          children: /*#__PURE__*/jsx_runtime_.jsx(external_framer_motion_.motion.div, {
            variants: wrapper,
            initial: "hidden",
            animate: {
              opacity: 1,
              backgroundColor: color
            },
            exit: "exit",
            className: (Navbar_module_default()).navbarContent,
            onClick: handleClick,
            children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_framer_motion_.motion.div, {
              variants: container,
              style: {
                originY: 0
              },
              initial: "hidden",
              animate: "show",
              exit: "exit",
              className: (Navbar_module_default()).navbarLinks,
              children: [/*#__PURE__*/jsx_runtime_.jsx(external_framer_motion_.motion.div, {
                variants: links,
                className: `${(Navbar_module_default()).page}`,
                children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
                  href: "/",
                  children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                    className: (Navbar_module_default()).navbar__link,
                    children: /*#__PURE__*/jsx_runtime_.jsx(CDiv/* default */.Z, {
                      className: `${(Navbar_module_default()).home}`,
                      text: "OGO JONATHAN",
                      color: color
                    })
                  })
                })
              }, "navbar-link-home-motion"), /*#__PURE__*/jsx_runtime_.jsx(external_framer_motion_.motion.div, {
                variants: links,
                className: `${(Navbar_module_default()).page}`,
                children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
                  href: "/projects",
                  children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                    children: /*#__PURE__*/jsx_runtime_.jsx(CDiv/* default */.Z, {
                      className: `${(Navbar_module_default()).projects}`,
                      text: "PROJECTS",
                      color: color
                    })
                  })
                })
              }, "navbar-link-projects-motion"), /*#__PURE__*/jsx_runtime_.jsx(external_framer_motion_.motion.div, {
                variants: links,
                className: `${(Navbar_module_default()).page}`,
                children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
                  href: "/about",
                  children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                    children: /*#__PURE__*/jsx_runtime_.jsx(CDiv/* default */.Z, {
                      className: `${(Navbar_module_default()).about}`,
                      text: "ABOUT",
                      color: color
                    })
                  })
                })
              }, "navbar-link-about-motion"), /*#__PURE__*/jsx_runtime_.jsx(external_framer_motion_.motion.div, {
                variants: links,
                className: `${(Navbar_module_default()).page}`,
                children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
                  href: "/contact",
                  children: /*#__PURE__*/jsx_runtime_.jsx("a", {
                    children: /*#__PURE__*/jsx_runtime_.jsx(CDiv/* default */.Z, {
                      className: `${(Navbar_module_default()).contact}`,
                      text: "CONTACT",
                      color: color
                    })
                  })
                })
              }, "navbar-link-contact-motion")]
            }, "navbar-links-container-motion")
          }, "navbar-wrapper-motion")
        })
      })]
    })
  });
}
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(701);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
;// CONCATENATED MODULE: ./components/layout.js





function Layout({
  children
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    style: {
      position: "relative"
    },
    children: [/*#__PURE__*/jsx_runtime_.jsx((head_default()), {
      children: /*#__PURE__*/jsx_runtime_.jsx("title", {
        children: "Ogo Jonathan"
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(Navbar, {}), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "siteContent",
      children: children
    })]
  });
}

/***/ }),

/***/ 2887:
/***/ ((module) => {

// Exports
module.exports = {
	"cdiv": "CDiv_cdiv__2GigB"
};


/***/ }),

/***/ 4643:
/***/ ((module) => {

// Exports
module.exports = {
	"navbarWrapper": "Navbar_navbarWrapper__nulNp",
	"navbar": "Navbar_navbar__3KWoz",
	"navbarContent": "Navbar_navbarContent__h-opP",
	"navbarLinks": "Navbar_navbarLinks__lx-ld",
	"navbar__home": "Navbar_navbar__home__3ixT8",
	"navbar__link": "Navbar_navbar__link__2Y4Ip",
	"page": "Navbar_page__sWHhG",
	"menuBtnWrapper": "Navbar_menuBtnWrapper__289jW",
	"homepage": "Navbar_homepage__2S5RT",
	"svgt": "Navbar_svgt__2lQLn",
	"header__wrapper": "Navbar_header__wrapper__czRe3",
	"navbar__lrg": "Navbar_navbar__lrg__313DS",
	"page__lrg": "Navbar_page__lrg__2O__x",
	"left": "Navbar_left__2otBb"
};


/***/ }),

/***/ 2431:
/***/ (() => {

/* (ignored) */

/***/ })

};
;