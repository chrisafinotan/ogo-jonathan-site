import _ from 'lodash';
import fetch from 'node-fetch';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import storage from '../firebase';

export class FirebaseController {
   constructor(opts = {}) {
      this.projectFolder = opts.projectFolder || 'assets';
      this.appData = {};
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

   async downloadFileFromURL(url, filename) {
      try {
         const response = await fetch(url);
         if (!response.ok) {
            throw new Error(`unexpected response ${response.statusText}`);
         }
         this.appData[filename] = await response.json();
      } catch (err) {
         console.log(`Error downloading/parsing ${filename}`, err);
         return err;
      }
      return this.appData[filename];
   }

   async downloadFile(filename) {
      const storageRef = await this.getRef(filename);
      const url = await this.getURLbyRef(storageRef);
      if (!url) return new Error('could not find url');
      return this.downloadFileFromURL(url, `./${filename}`);
   }

   async getJSON(filename) {
      if (!filename) return;
      let data = this.appData[filename];
      if (data) return data;
      try {
         data = await this.downloadFile(filename);
      } catch (err) {
         console.log(`Error getting ${filename}`, err);
         return;
      }
      return data;
   }
}
