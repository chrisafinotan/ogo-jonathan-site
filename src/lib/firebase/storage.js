import _ from 'lodash';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    listAll,
    getMetadata,
} from 'firebase/storage';
import { storage } from './client.js';

export async function uploadImage(projectTitle, image) {
    const filePath = `assets/${_.snakeCase(projectTitle)}/${image.name}`;
    const newImageRef = ref(storage, filePath);
    await uploadBytesResumable(newImageRef, image);

    const url = await getDownloadURL(newImageRef);
    const metadata = await getMetadata(newImageRef);
    return { url, metadata };
}

const getItems = async (listRef) => {
    const files = [];
    const { items, prefixes } = await listAll(listRef);
    files.push(...items);

    const foldersItems = prefixes.map(async (folderRef) => {
        const folderItems = await listAll(folderRef);
        return folderItems.items;
    });
    const allFolderItems = await Promise.all(foldersItems);
    files.push(...allFolderItems.flat());

    return files;
};

export async function getAllImages() {
    const listRef = ref(storage, '/assets');
    try {
        const files = await getItems(listRef);
        if (files.length > 0) {
            const urlPromises = files.map(getDownloadURL);
            const urls = await Promise.all(urlPromises);
            return urls;
        }
        return [];
    } catch (err) {
        console.log(err);
        return null;
    }
}
