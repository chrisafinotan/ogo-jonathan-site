import { pipeline } from 'node:stream';
import { promisify } from 'node:util';
import path from 'path';
import fsExtra from 'fs-extra';
import _ from 'lodash';
import fetch from 'node-fetch';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import storage from '../firebase';

const OUT_DIR = './data';

export class FirebaseController {
   constructor(opts = {}) {
      this.projectFolder = opts.projectFolder || 'assets';
   }

   async getRef(name) {
      const firebaseRef = await ref(storage, `${this.projectFolder}/${name}`);
      return firebaseRef;
   }

   async getURLbyRef(ref = []) {
      ref = _.isArray(ref) ? ref : [ref];
      let urls = ref.map((r) => getDownloadURL(r));
      urls = await Promise.all(urls);
      if (!urls) return new Error('could not find url');
      return urls;
   }

   async getURLbyString(filename) {
      const storageRef = await this.getRef(filename);
      const url = await this.getURLbyRef(storageRef);
      if (!url) return new Error('could not find url');
      return url;
   }

   async listFiles(dir) {
      const folderRef = await this.getRef(dir);
      const folderfiles = await listAll(folderRef);
      if (!folderfiles) return new Error('could not list files');
      return folderfiles.items;
   }

   async downloadFileFromURL(url, writePath) {
      const filepath = path.join(OUT_DIR, writePath);
      const file = fsExtra.createWriteStream(filepath);
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

   async downloadFile(filename) {
      const storageRef = await this.getRef(filename);
      const url = await this.getURLbyRef(storageRef);
      if (!url) return new Error('could not find url');
      return this.downloadFileFromURL(url, `./${filename}`);
   }

   async getFile(filename) {
      let filepath = path.join(OUT_DIR, filename);
      const fileExists = await fsExtra.access(filepath);
      if (fileExists) return filepath;
      filepath = await this.downloadFile(filename);
      return filepath;
   }

   async getJSON(filepath) {
      if (!filepath) return;
      let data;
      try {
         data = await fsExtra.readJson(filepath);
      } catch (err) {
         return err;
      }
      return data;
   }
}
