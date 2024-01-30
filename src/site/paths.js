import { BASE_URL } from './config';

const PREFIX_PHOTO = '/p';
const PREFIX_TAG = '/t';
const PREFIX_ADMIN = '/admin';

const SHARE = 'share';

export const ADMIN_PATHS = [
    {path: `${PREFIX_ADMIN}/home`, name: 'Home'},
  {path: `${PREFIX_ADMIN}/projects`, name: 'Projects'},
  {path: `${PREFIX_ADMIN}/tags`, name: 'Tags'},
];

export const PATH_ADMIN_PHOTOS = `${PREFIX_ADMIN}/photos`;
export const PATH_ADMIN_UPLOAD = `${PREFIX_ADMIN}/uploads`;
export const PATH_ADMIN_UPLOAD_BLOB_HANDLER = `${PATH_ADMIN_UPLOAD}/blob`;

export const ABSOLUTE_PATH_FOR_HOME_IMAGE = `${BASE_URL}/home-image`;

export const pathForPhoto = (photo, tag) =>
    tag ? `${pathForTag(tag)}/${photo.id}` : `${PREFIX_PHOTO}/${photo.id}`;

export const pathForPhotoShare = (photo, tag) =>
    `${pathForPhoto(photo, tag)}/${SHARE}`;

export const pathForPhotoEdit = (photo) =>
    `${PATH_ADMIN_PHOTOS}/${photo.id}/edit`;

export const pathForTag = (tag) => `${PREFIX_TAG}/${tag}`;

export const pathForTagShare = (tag) => `${pathForTag(tag)}/${SHARE}`;

export const absolutePathForPhoto = (photo, tag) =>
    `${BASE_URL}${pathForPhoto(photo, tag)}`;

export const absolutePathForTag = (tag) => `${BASE_URL}${pathForTag(tag)}`;

export const absolutePathForPhotoImage = (photo) =>
    `${absolutePathForPhoto(photo)}/image`;

export const absolutePathForTagImage = (tag) =>
    `${absolutePathForTag(tag)}/image`;

export const isPathPhoto = (pathname = '') => /^\/p\/[^/]+\/?$/.test(pathname);

export const isPathPhotoShare = (pathname = '') =>
    /^\/p\/[^/]+\/share\/?$/.test(pathname);

export const isPathSignIn = (pathname = '') => pathname.startsWith('/sign-in');

export const isPathProtected = (pathname = '') =>
    pathname.startsWith(PREFIX_ADMIN) || pathname === '/checklist';
