const functions = require('firebase-functions');
const path = require('path');
const PROJECTS_DATA = 'projectsData.json';
const HOME_DATA = 'homeProjectsData.json';
const DEPLOYFILES = [PROJECTS_DATA, HOME_DATA];

exports.redeployApp = functions.storage
   .object()
   .onFinalize(async (object) => {
      const filePath = object.name;

      const fileName = path.basename(filePath);
      functions.logger.info(`Firebase: file ${fileName} changed`);
      if (DEPLOYFILES.includes(fileName)) {
         const redeployMsg = await fetch(
            process.env.NEXT_PUBLIC_DEPLOY_HOOK_URL
         );
         if (!redeployMsg)
            functions.logger.error(`Firebase: failed to redeploy`);
         functions.logger.info(
            `Firebase: succesfully redeployed! Reason: file ${fileName} changed`
         );
      }
   });
