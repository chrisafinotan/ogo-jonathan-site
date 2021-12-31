import { projectDB, projectStorage } from "../firebase/fire-config";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

export async function getAllProjectIds() {
    let projectsIDs = [];
    const querySnapshot = await getDocs(collection(projectDB, "projects"));
    querySnapshot.forEach(async (doc) => {
        projectsIDs.push(doc.id);
    });

    return projectsIDs.map((projectID) => {
        return {
            params: {
                id: projectID,
            },
        };
    });
}

export async function getAllProjects() {
    let projectsData = [];
    const querySnapshot = await getDocs(collection(projectDB, "projects"));
    querySnapshot.forEach(async (doc) => {
        let projectObj = {
            name: doc.data().Name,
            id: doc.id,
            cover: doc.data().Cover,
        };
        projectsData.push(projectObj);
    });
    return projectsData;
}

export async function getProjectData(id) {
    let project = [];
    const docRef = doc(projectDB, "projects", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        project = docSnap.data();
        if (docSnap.data().Date) {
            project.Date = docSnap.data().Date.toDate().toJSON();
        }

        if (docSnap.data().Cover) {
            project.Cover = await getDownloadURL(
                ref(projectStorage, docSnap.data().Cover)
            );
        }
    }

    return {
        id,
        ...project,
    };
}
