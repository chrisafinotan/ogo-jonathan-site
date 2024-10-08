import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { indexOf, sortBy } from 'lodash';

export const isProjectPage = (pathname) => /projects\//gm.test(pathname);

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const getProject = (id, projects) => {
    const projectIndex = projects.findIndex((el) => el.id === id);
    const project = projects[projectIndex];
    return {project, projectIndex};
};

export const getAdjacentProjects = (index, projects) => {
    const previousIndex = index - 1 < 0 ? projects.length - 1 : index - 1;
    const nextIndex = index + 1 === projects.length ? 0 : index + 1;
    return [projects[previousIndex], projects[nextIndex]];
};

export const reorder = (arr, indexArr) => {
    return sortBy(arr, [
        (el) => {
            if (indexArr.length === 0) return 0;
            const index = indexOf(indexArr, el.id);
            if (index < 0) return;
            return index + 1;
        },
    ]);
};

export const orderPhotos = (project) => {
    project.photos = reorder(project.photos, project.photosOrder);
    return project;
};
