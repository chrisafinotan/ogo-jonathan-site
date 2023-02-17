import fs from 'fs';
import fsExtra from 'fs-extra';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';
import path from 'path';
import { storage } from '../firebase';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import fetch from 'node-fetch';
import { compareByDate, compareByOrder, dateFormat } from '../utils/helper';

const OUT_DIR = './data';
const PROJECTS_DATA = 'projectsData.json';
const HOME_DATA = 'homeProjectsData.json';

async function downloadFileFromURL(url, writePath) {
   const file = fs.createWriteStream(path.join(OUT_DIR, writePath));
   try {
      const streamPipeline = promisify(pipeline);
      const response = await fetch(url);
      if (!response.ok)
         throw new Error(`unexpected response ${response.statusText}`);
      await streamPipeline(response.body, file);
   } catch (err) {
      return err;
   }
   return file.path;
}

async function getURLSFirebase(refs = []) {
   let urls = refs.map((ref) => getDownloadURL(ref));
   urls = await Promise.all(urls);
   return urls;
}

async function getFileURLFirebase(filename) {
   const storageRef = ref(storage, `assets/${filename}`);
   const url = await getDownloadURL(storageRef);
   if (!url) throw new Error('could not find url');
   return downloadFileFromURL(url, `./${filename}`);
}

async function listFolderFilesFirebase(foldername) {
   const storageRef = ref(storage, `assets/${foldername}`);
   const folderfiles = await listAll(storageRef);

   return folderfiles.items;
}

export async function getFireBaseConfigData(files = []) {
   if (files.length < 1) return;
   const res = await Promise.all(files.map((path) => getFileURLFirebase(path)));
   return res;
}

export async function getAllProjectIds() {
   let projectsIDs = [];
   const dataPath = await getFireBaseConfigData([PROJECTS_DATA]);
   let data = await getJSON(dataPath[0]);
   for (const project in data) {
      let obj = {
         id: project,
         date: data[project].Date && new Date(data[project].Date),
      };
      projectsIDs.push(obj);
   }

   return projectsIDs.sort(compareByDate).map((projectID) => {
      return {
         params: {
            id: projectID.id,
         },
      };
   });
}

export async function getAllProjects() {
   let projectsData = [];
   const dataPath = await getFireBaseConfigData([PROJECTS_DATA]);
   let data = await getJSON(dataPath[0]);

   for (const project in data) {
      let projectObj = {
         name: data[project].Name,
         id: project,
         desc: data[project].Description,
         cover: data[project].Cover,
         content: `/projects/${data[project].Cover}`,
         type: data[project].CoverType ? data[project].CoverType : 'image',
         date: data[project].Date,
         formatdate: dateFormat(
            data[project].Date && new Date(data[project].Date)
         ),
         files: data[project].Files,
         category: data[project].Category
            ? data[project].Category
            : 'Photoshoot',
         tag: data[project].Tag ? data[project].Tag : null,
         order: data[project].Order ? data[project].Order : 100,
      };
      projectsData.push(projectObj);
   }
   projectsData.sort(compareByOrder);
   return projectsData;
}

export async function getProjectData(id, array = []) {
   let index = array.findIndex((obj) => obj.id === id);
   if (index !== -1) {
      return array[index];
   }
}

export async function getAssets(filepath) {
   const filerefs = await listFolderFilesFirebase(filepath);
   const projfiles = await getURLSFirebase(filerefs);

   let pictures = projfiles.map((el, index) => {
      return {
         pic: el,
         index: index,
         name: `pic_${filepath}_${index}`,
      };
   });
   return pictures;
}

async function getJSON(file) {
   if (!file) return;
   let data;
   try {
      data = await fsExtra.readJson(file);
   } catch (err) {
      return err;
   }
   return data;
}

export async function getAllHomeProjects() {
   let projectsData = [];
   const dataPath = await getFireBaseConfigData([HOME_DATA]);
   let data = await getJSON(dataPath[0]);

   for (const project in data) {
      let projectObj = {
         id: project,
         file: data[project].File,
         content: `projects/${data[project].File}`,
         name: data[project].Name,
         size: data[project].Size,
         type: data[project].Type,
         link: String(data[project].Link).replace(/\s/g, ''),
      };
      projectsData.push(projectObj);
   }
   return projectsData;
}
