import { projectDB, projectStorage } from "../firebase/fire-config";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL, listAll } from "firebase/storage";

const dateFormat = (date) => {
    // let mm = (date.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    // let yy = date.getFullYear().toString().substr(-2);
    let mm = date.toLocaleString("default", { month: "short" });
    let yy = date.getFullYear().toString();
    return `${mm}-${yy}`;
};

export async function getAllProjectIds() {
    let projectsIDs = [];
    let date;
    const querySnapshot = await getDocs(collection(projectDB, "projects"));
    querySnapshot.forEach(async (doc) => {
        let obj = {
            id: doc.id,
            date: doc.data().Date && doc.data().Date.toDate().toDateString(),
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

    return projectsIDs.sort(compare).map((projectID) => {
        return {
            params: {
                id: projectID.id,
            },
        };
    });
}

export async function getAllProjects() {
    let projectsData = [];
    const querySnapshot = await getDocs(collection(projectDB, "projects"));
    // const querySnapshot = await projectDB.collection("projects").get();
    querySnapshot.forEach(async (doc) => {
        let projectObj = {
            name: doc.data().Name,
            id: doc.id,
            desc: doc.data().Description,
            cover: doc.data().Cover,
            type: doc.data().CoverType,
            date: doc.data().Date && doc.data().Date.toDate().toDateString(),
            formatdate: dateFormat(doc.data().Date && doc.data().Date.toDate()),
            files: doc.data().Files,
        };
        projectsData.push(projectObj);
    });

    await Promise.all(
        projectsData.map(async (projData) => {
            projData.content =
                projData.cover &&
                (await getDownloadURL(ref(projectStorage, projData.cover)));
            return projData;
        })
    );

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

export async function getProjectData(id, array = []) {
    let index = array.findIndex((obj) => obj.id === id);
    if (index !== -1) {
        return array[index];
    }
}

export async function getAssets(path) {
    const pathRef = ref(projectStorage, `${path}`);
    // Find all the prefixes and items.
    let pictures = [];
    await listAll(pathRef)
        .then(async (res) => {
            pictures = await Promise.all(
                res.items.map(async (itemRef, index) => {
                    // All the items under pathRef.
                    return { pic: await getDownloadURL(itemRef), index: index };
                })
            );
        })
        .catch((error) => {
            console.log(error);
        });
    return pictures;
}

export async function getAllHomeProjects() {
    let projectsData = [];
    const querySnapshot = await getDocs(collection(projectDB, "home"));
    querySnapshot.forEach(async (doc) => {
        let projectObj = {
            id: doc.id,
            file: doc.data().File,
            name: doc.data().Name,
            size: doc.data().Size,
            type: doc.data().Type,
            link: doc.data().Link,
        };
        // console.log(projectObj);
        projectsData.push(projectObj);
    });

    return projectsData;
    // return [];
}

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
