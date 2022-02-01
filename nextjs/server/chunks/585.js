"use strict";
exports.id = 585;
exports.ids = [585];
exports.modules = {

/***/ 2830:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "m": () => (/* binding */ projectDB),
/* harmony export */   "v": () => (/* binding */ projectStorage)
/* harmony export */ });
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9421);
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8828);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_storage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9714);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase_firestore__WEBPACK_IMPORTED_MODULE_2__);



const firebaseConfig = {
  apiKey: "AIzaSyB4wO7kB8hXOqADR9-zl8MqxcTZaWJ8rgw",
  authDomain: "next-ogo-jonathan.firebaseapp.com",
  projectId: "next-ogo-jonathan",
  storageBucket: "next-ogo-jonathan.appspot.com",
  messagingSenderId: "150279783676",
  appId: "1:150279783676:web:b63f225f592689b006c379"
};
const app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);
const projectDB = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getFirestore)(app);
const projectStorage = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_1__.getStorage)();


/***/ }),

/***/ 1585:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c6": () => (/* binding */ getAllProjectIds),
/* harmony export */   "Yw": () => (/* binding */ getAllProjects),
/* harmony export */   "xU": () => (/* binding */ getProjectData),
/* harmony export */   "Vh": () => (/* binding */ getAssets),
/* harmony export */   "e1": () => (/* binding */ getAllHomeProjects)
/* harmony export */ });
/* harmony import */ var _firebase_fire_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2830);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9714);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_firestore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8828);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase_storage__WEBPACK_IMPORTED_MODULE_2__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const dateFormat = date => {
  // let mm = (date.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  // let yy = date.getFullYear().toString().substr(-2);
  let mm = date.toLocaleString("default", {
    month: "short"
  });
  let yy = date.getFullYear().toString();
  return `${mm}-${yy}`;
};

async function getAllProjectIds() {
  let projectsIDs = [];
  let date;
  const querySnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDocs)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(_firebase_fire_config__WEBPACK_IMPORTED_MODULE_0__/* .projectDB */ .m, "projects"));
  querySnapshot.forEach(async doc => {
    let obj = {
      id: doc.id,
      date: doc.data().Date && doc.data().Date.toDate().toDateString()
    };
    projectsIDs.push(obj);
  });

  function compare(a, b) {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    }

    if (new Date(a.date) > new Date(b.date)) {
      return -1;
    }

    return 0;
  }

  return projectsIDs.sort(compare).map(projectID => {
    return {
      params: {
        id: projectID.id
      }
    };
  });
}
async function getAllProjects() {
  let projectsData = [];
  const querySnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDocs)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(_firebase_fire_config__WEBPACK_IMPORTED_MODULE_0__/* .projectDB */ .m, "projects"));
  querySnapshot.forEach(async doc => {
    let projectObj = {
      name: doc.data().Name,
      id: doc.id,
      desc: doc.data().Description,
      cover: doc.data().Cover,
      date: doc.data().Date && doc.data().Date.toDate().toDateString(),
      formatdate: dateFormat(doc.data().Date && doc.data().Date.toDate())
    };
    projectsData.push(projectObj);
  });

  function compare(a, b) {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    }

    if (new Date(a.date) > new Date(b.date)) {
      return -1;
    }

    return 0;
  }

  projectsData.sort(compare);
  return projectsData;
}
async function getProjectData(id) {
  let project = [];
  const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(_firebase_fire_config__WEBPACK_IMPORTED_MODULE_0__/* .projectDB */ .m, "projects", id);
  const docSnap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDoc)(docRef);

  if (docSnap.exists()) {
    project = docSnap.data();

    if (docSnap.data().Date) {
      project.Date = docSnap.data().Date.toDate().toJSON();
    }

    if (docSnap.data().Cover) {
      project.Cover = await (0,firebase_storage__WEBPACK_IMPORTED_MODULE_2__.getDownloadURL)((0,firebase_storage__WEBPACK_IMPORTED_MODULE_2__.ref)(_firebase_fire_config__WEBPACK_IMPORTED_MODULE_0__/* .projectStorage */ .v, docSnap.data().Cover));
    }
  }

  return _objectSpread({
    id
  }, project);
}
async function getAssets(path) {
  const pathRef = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_2__.ref)(_firebase_fire_config__WEBPACK_IMPORTED_MODULE_0__/* .projectStorage */ .v, `${path}`); // const pathRef = ref(projectStorage, `/assets/project1`);
  // Find all the prefixes and items.

  let pictures = [];
  await (0,firebase_storage__WEBPACK_IMPORTED_MODULE_2__.listAll)(pathRef).then(async res => {
    pictures = await Promise.all(res.items.map(async (itemRef, index) => {
      // All the items under pathRef.
      return {
        pic: await (0,firebase_storage__WEBPACK_IMPORTED_MODULE_2__.getDownloadURL)(itemRef),
        index: index
      };
    }));
  }).catch(error => {
    console.log(error);
  });
  return pictures;
}
async function getAllHomeProjects() {
  let projectsData = [];
  const querySnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDocs)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(_firebase_fire_config__WEBPACK_IMPORTED_MODULE_0__/* .projectDB */ .m, "home"));
  querySnapshot.forEach(async doc => {
    let projectObj = {
      id: doc.id,
      file: doc.data().File,
      name: doc.data().Name,
      size: doc.data().Size,
      type: doc.data().Type,
      link: doc.data().Link
    }; // console.log(projectObj);

    projectsData.push(projectObj);
  });
  return projectsData; // return [];
}

/***/ })

};
;