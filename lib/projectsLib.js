import fs from "fs";
import path from "path";
import { compareByDate, dateFormat } from "../utils/helper";

const data = require("../data/projectsData.json");
const homedata = require("../data/homeProjectsData.json");

export async function getAllProjectIds() {
    let projectsIDs = [];
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

    for (const project in data) {
        let projectObj = {
            name: data[project].Name,
            id: project,
            desc: data[project].Description,
            cover: data[project].Cover,
            content: `/projects/${data[project].Cover}`,
            type: data[project].CoverType ? data[project].CoverType : "image",
            date: data[project].Date,
            formatdate: dateFormat(
                data[project].Date && new Date(data[project].Date)
            ),
            files: data[project].Files,
            category: data[project].Category ? data[project].Category : 'Photoshoot',
            tag: data[project].Tag ? data[project].Tag : null,
        };
        projectsData.push(projectObj);
    }
    projectsData.sort(compareByDate);
    return projectsData;
}

export async function getProjectData(id, array = []) {
    let index = array.findIndex((obj) => obj.id === id);
    if (index !== -1) {
        return array[index];
    }
}

export async function getAssets(filepath) {
    let projfiles = fs.readdirSync(path.join("public/projects/", filepath));
    let pictures = projfiles.map((el, index) => {
        return { pic: `/projects/${filepath}/${el}`, index: index };
    });
    return pictures;
}

export async function getAllHomeProjects() {
    let projectsData = [];
    let data = homedata;
    for (const project in data) {
        let projectObj = {
            id: project,
            file: data[project].File,
            content: `projects/${data[project].File}`,
            name: data[project].Name,
            size: data[project].Size,
            type: data[project].Type,
            link: String(data[project].Link).replace(/\s/g, ""),
        };
        projectsData.push(projectObj);
    }
    return projectsData;
}
