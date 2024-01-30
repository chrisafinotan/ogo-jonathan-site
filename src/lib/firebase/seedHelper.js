import _ from 'lodash';
import path from 'node:path';
import { openAsBlob } from 'node:fs';
import fs from 'node:fs/promises';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './client.js';
import { getAllImages } from './storage.js';

const upload = async (folderRef, { file, name, ext }) => {
    const fileref = ref(folderRef, name);
    const blob = await openAsBlob(file);
    const metadata = { contentType: `image/${ext.substring(1)}` };
    const uploadPromise = new Promise((resolve, reject) => {
        const uploadTask = uploadBytesResumable(fileref, blob, metadata);
        const stateFn = () => {};
        const errorFn = (error) => reject(error);
        const doneFn = () => resolve(name);
        uploadTask.on('state_changed', stateFn, errorFn, doneFn);
    });
    const promiseres = await uploadPromise;
    return promiseres;
};

const putItems = async (folderRef) => {
    const folderPath = 'public/assets';
    const __dirname = path.resolve(path.dirname(''));
    const extensions = ['.jpg', '.jpeg', '.png'];

    const getFileName = (name) => path.join(__dirname, folderPath, name);
    const getFileInfo = (file) => {
        return { name: path.basename(file), ext: path.extname(file), file };
    };
    const isFile = async (fileName) => (await fs.lstat(fileName)).isFile();
    const isImage = ({ ext }) => {
        return extensions.includes(ext.toLowerCase());
    };

    const directoryContent = await fs.readdir(folderPath);
    const filesPromises = directoryContent
        .map(getFileName)
        .filter(isFile)
        .map(getFileInfo)
        .filter(isImage);
    const files = await Promise.all(filesPromises);
    let uploads = 0;
    for (let index = 0; index < files.length; index++) {
        await upload(folderRef, files[index]);
        uploads++;
    }
    console.log(`Uploaded ${uploads} photos to firebase storage`);
};

export async function createImages() {
    const folderRef = ref(storage, '/assets');
    await putItems(folderRef);
    const images = await getAllImages();
    return images;
}
