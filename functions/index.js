// const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const { join } = require("path");
const { https } = require("firebase-functions");
const { default: next } = require("next");

const nextjsDistDir = join("src", require("../next.config.js").distDir);

const nextjsServer = next({
    dev: false,
    conf: {
        distDir: nextjsDistDir,
    },
});
const nextjsHandle = nextjsServer.getRequestHandler();

exports.nextjsFunc = https.onRequest((req, res) => {
    return nextjsServer.prepare().then(() => nextjsHandle(req, res));
});