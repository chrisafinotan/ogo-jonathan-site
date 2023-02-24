import _ from 'lodash';
import { compareByDate, compareByOrder, dateFormat } from '../utils/helper';
import { FirebaseController } from './firebaseController';

const PROJECTS_DATA = 'projectsData.json';
const HOME_DATA = 'homeProjectsData.json';

const fb = new FirebaseController();

export async function getAllProjectIds() {
   let projectsIDs = [];
   let data = await fb.getJSON(PROJECTS_DATA);
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
   let data = await fb.getJSON(PROJECTS_DATA);
   for (const project in data) {
      let projectObj = {
         name: data[project].Name,
         id: project,
         desc: data[project].Description,
         cover: data[project].Cover,
         content: await getContent(data[project].Cover),
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
   // projectsData = await Promise.all(projectsData);
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
   const filerefs = await fb.listFiles(filepath);
   const projfiles = await fb.getURLbyRef(filerefs);

   let pictures = projfiles.map((el, index) => {
      return {
         pic: el,
         index: index,
         name: `pic_${filepath}_${index}`,
      };
   });
   return pictures;
}

export async function getAllHomeProjects() {
   let projectsData = [];
   let data = await fb.getJSON(HOME_DATA);

   for (const project in data) {
      let projectObj = {
         id: project,
         file: data[project].File,
         content: await getContent(data[project].File),
         name: data[project].Name,
         size: data[project].Size,
         type: data[project].Type,
         link: String(data[project].Link).replace(/\s/g, ''),
      };
      projectsData.push(projectObj);
   }
   return projectsData;
}

const getContent = async (file) => {
   let content = await fb.getURLbyString(file);
   return content[0];
};
