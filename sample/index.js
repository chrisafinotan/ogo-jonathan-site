import fs from 'fs';
import path from 'path';

const data = require('./projectsData.json');
const homedata = require('./homeProjectsData.json');

const allowedFiles = ['.jpg', '.jpeg', '.img']
export async function getAllProjectsLocal() {
   return data;
}

export async function getAssetsLocal(filepath) {
   let projfiles = fs.readdirSync(path.join('public/', filepath));
   let pictures = projfiles.filter(el => allowedFiles.includes(path.extname(el).toLowerCase())).map((el, index) => {
      return {
         pic: `/${filepath}/${el}`,
         index: index,
         name: `pic_${filepath}_${index}`,
      };
   });
   return pictures;
}

export async function getHomeProjectsLocal() {
   return homedata;
}
