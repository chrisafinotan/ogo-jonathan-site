import { projectDB, projectStorage } from "../firebase/fire-config";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL, listAll } from "firebase/storage";

const dateFormat = (date) => {
    let mm = date.getMonth() + 1;
    let yy = date.getFullYear().toString().substr(-2);
    return `${mm}-${yy}`;
};

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
            date: doc.data().Date && doc.data().Date.toDate().toDateString(),
            formatdate: dateFormat(doc.data().Date && doc.data().Date.toDate()),
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

export async function getAssets(path) {
    const pathRef = ref(projectStorage, `${path}`);
    // const pathRef = ref(projectStorage, `/assets/project1`);
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
            // Uh-oh, an error occurred!
            console.log(error);
        });
    return pictures;
}
