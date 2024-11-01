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
    ProjectFormSchema as ClientProjectFormSchema,
    ShowcaseFormShape,
    ShowcaseUpdateArrayShape,
    AdditionalInfoShape,
    UploadResultShape,
} from './helperSchemas';
import {
    ProjectPhotoShape,
    NewProjectFormShape,
    NewProjectFormSchema,
    ProjectFormShape,
    ProjectFormSchema,
    FinalProjectFormShape,
    FinalProjectFormSchema,
} from '@/lib/validation';
import { uploadImage as uploadToFirebase } from '@/lib/firebase/storage';

const parseResponse = async (res: any) => {
    const { data, error } = await res;
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
    const photos = blobs.map((blob, index) => {
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
    data.photos = photos;
    data.additionalInfoString = JSON.stringify(additionalInfoObject);
    const formattedData: ProjectFormShape = formatSaveData(data);
    NewProjectFormSchema.parse(formattedData);
    const response = createProjectAction(formattedData);
    return parseResponse(response);
};

const updateProjectCover = (
    data: ProjectFormShape,
    initialData: ClientProjectFormShape,
    coverIndex?: number
) => {
    data.photosOrder = data.photos?.map((el) => el.id as string).join();
    data.coverId =
        data.photos?.find((photo) => photo.priorityOrder == coverIndex)?.id ||
        null;
    const formattedData: ProjectFormShape = formatSaveData(data);
    ProjectFormSchema.parse(formattedData);
    // ClientProjectFormSchema.parse(initialData);
    const response = updateProjectAction(formattedData, initialData);
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
    data.additionalInfoString = JSON.stringify(additionalInfoObject);
    data.photosOrder = data.photos?.map((el) => el.id as string).join();
    const formattedData: ProjectFormShape = formatSaveData(data);
    ClientProjectFormSchema.parse(formattedData);
    const response = updateProjectAction(formattedData, initialData);
    return parseResponse(response);
};

const publishProject = (data: FinalProjectFormShape) => {
    FinalProjectFormSchema.parse(data);
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
    return parseResponse(response);
};

const linkPhotosToProject = (
    photos: ProjectPhotoShape[],
    project: ClientProjectFormShape,
    initialData: ClientProjectFormShape
) => {
    project.photos = photos;
    const formattedData: ProjectFormShape = formatSaveData(project);
    ClientProjectFormSchema.parse(formattedData);
    ClientProjectFormSchema.parse(initialData);
    const response = updateProjectAction(formattedData, initialData);
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

const loginUser = async (data: any) => {
    return loginAction(data);
};

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
