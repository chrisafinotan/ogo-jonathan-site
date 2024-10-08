'use client';

import { concat, differenceBy } from 'lodash';
import {
    createProjectAction,
    updateProjectAction,
    publishProjectAction,
    updateTagAction,
    createTagAction,
    updateShowcaseAction,
    addShowcasePhotosAction,
    createManyPhotosAction,
    loginAction,
} from '@/data/actions';
import {
    ProjectFormShape as ClientProjectFormShape,
    ShowcaseFormShape,
    ShowcaseUpdateArrayShape,
    AdditionalInfoShape,
    UploadResultShape,
} from './helperSchemas';
import {
    ProjectPhotoShape,
    ProjectFormShape,
    FinalProjectFormShape,
} from '@/lib/validation';
import { uploadImage as uploadToFirebase } from '@/lib/firebase/storage';

const parseResponse = async (res: any) => {
    const { data, error } = await res;
    console.log('parse', { data, error });
    if (error) {
        return { isError: true, error, message: error.message };
    }
    return { data };
};

const uploadFilesToStore = (
    photoObjects: File[] | undefined,
    title: string
) => {
    return photoObjects?.map((file) => {
        return uploadToFirebase(title, file);
    });
};

const createProjectBlobs = (
    photoObjects: File[] | undefined,
    title: string
) => {
    const uploadPhotosPromises = uploadFilesToStore(photoObjects, title);
    if (!uploadPhotosPromises) return;
    const blobs = Promise.all(uploadPhotosPromises);
    return blobs;
};

const formatSaveData = (data: ClientProjectFormShape) => {
    delete data.photosPreview;
    delete data.additionalInfoFields;
    return data;
};

const createProjectData = (
    data: ClientProjectFormShape,
    blobs: UploadResultShape
) => {
    if (!blobs) return;
    const photoObjects = blobs.map((blob, index) => {
        const { url, metadata } = blob;
        return {
            url,
            extension: metadata.contentType?.split('/')[1] || 'jpeg',
            blurData: url,
            title: data.title,
            locationName: 'ottawa',
            isShowcase: false,
            priorityOrder: index,
            hidden: false,
            takenAt: new Date(),
        };
    });

    const additionalInfoObject: AdditionalInfoShape = {};
    data.additionalInfoFields?.forEach(({ key, value }) => {
        additionalInfoObject[key] = value as string;
    });
    const uploadData: ProjectFormShape = formatSaveData({
        ...data,
        photos: photoObjects,
        additionalInfo: additionalInfoObject,
    });

    const response = createProjectAction(uploadData);
    return parseResponse(response);
};

const updateProjectCover = (
    data: ProjectFormShape,
    initialData: ClientProjectFormShape,
    coverIndex?: number
) => {
    const uploadData = Object.assign({}, data);
    console.log('update project cover');
    uploadData.coverId =
        data.photos?.find((photo) => photo.priorityOrder == coverIndex)?.id ||
        null;
    const response = updateProjectAction(uploadData, initialData);
    return parseResponse(response);
};

const updateProjectData = (
    data: ClientProjectFormShape,
    initialData: ClientProjectFormShape
) => {
    const additionalInfoObject: AdditionalInfoShape = {};
    data.additionalInfoFields?.forEach(({ key, value }) => {
        additionalInfoObject[key] = value as string;
    });
    data.photosOrder = data.photos?.map((el) => el.id as string);
    console.log('update project data', data);
    const uploadData: ProjectFormShape = formatSaveData({
        ...data,
        additionalInfo: additionalInfoObject,
        additionalInfoString: JSON.stringify(additionalInfoObject),
    });
    const response = updateProjectAction(uploadData, initialData);
    return parseResponse(response);
};

const publishProject = (data: FinalProjectFormShape) => {
    const response = publishProjectAction(data);
    return parseResponse(response);
};

const createPhotoData = (data: ProjectFormShape, blobs: UploadResultShape) => {
    const startingIndex = data.photos?.length || 0;
    const photoObjects = blobs.map((blob, index) => {
        const { url, metadata } = blob;
        return {
            url,
            extension: metadata.contentType?.split('/')[1] || 'jpeg',
            blurData: url,
            title: data.title,
            locationName: 'ottawa',
            isShowcase: false,
            priorityOrder: startingIndex + index,
            hidden: false,
            takenAt: new Date(),
        };
    });
    const response = createManyPhotosAction(photoObjects);
    console.log('update many', { response });
    return parseResponse(response);
};

const linkPhotosToProject = (
    data: ProjectPhotoShape[],
    project: ClientProjectFormShape,
    initialData: ClientProjectFormShape
) => {
    console.log('link project data');
    const uploadData: ProjectFormShape = formatSaveData({
        ...project,
        photos: data,
    });
    const response = updateProjectAction(uploadData, initialData);
    return parseResponse(response);
};

const createTagData = (data: any) => {
    const response = createTagAction(data);
    return parseResponse(response);
};

const updateTagData = (data: any) => {
    const response = updateTagAction(data);
    return parseResponse(response);
};

const updateShowcaseData = (opts: ShowcaseFormShape) => {
    const { initShowcase, finalShowcase } = opts;
    const showcasePhotosToRemove = differenceBy(
        initShowcase,
        finalShowcase,
        'id'
    );
    const toRemove: ShowcaseUpdateArrayShape = showcasePhotosToRemove.map(
        (el) => [el.id, false, null]
    );
    const toUpdate: ShowcaseUpdateArrayShape = finalShowcase.map(
        (el, index) => [el.id, true, index + 1]
    );

    const updateData = concat(toUpdate, toRemove);
    const response = updateShowcaseAction(updateData);
    return parseResponse(response);
};

const addShowcaseData = (data: ProjectPhotoShape[]) => {
    const ids = data.map((el) => el.id);
    if (ids.length == 0) return;
    const response = addShowcasePhotosAction(ids);
    return parseResponse(response);
};

const loginUser = async (data) => {
    return loginAction(data);
    // console.log({ loginResult });
}

export {
    createProjectBlobs,
    createProjectData,
    updateProjectCover,
    updateProjectData,
    createTagData,
    updateTagData,
    updateShowcaseData,
    addShowcaseData,
    createPhotoData,
    linkPhotosToProject,
    uploadFilesToStore,
    publishProject,
    loginUser,
};
