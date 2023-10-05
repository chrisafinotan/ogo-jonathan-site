'use server';

import { prisma } from '@/services/prisma';
import { ZodTypeAny, z } from 'zod';
import { ProjectFormSchema, TagFormSchema } from '@/lib/validation';

const zodParse = (formData, schema: ZodTypeAny) => {
    const { success, data, error } = schema.safeParse(formData);
    if (success) {
        return data;
    } else {
        console.log(error, data);
        return null;
    }
};

export const createProjectAction = async (formData) => {
    const data = zodParse(formData, ProjectFormSchema);
    if (!data) return;
    const { photos } = data;
    data.isPublished = false;
    data.photos = {
        create: photos,
    };
    return await prisma.project.create({
        data: data,
    });
};

export const createTagAction = async (formData) => {
    const data = zodParse(formData, TagFormSchema);
    if (!data) return;
    return await prisma.tag.create({
        data: data,
    });
};
