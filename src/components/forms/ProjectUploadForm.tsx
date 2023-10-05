'use client';

import { useEffect } from 'react';
import {
    ACCEPTED_PHOTO_FILE_TYPES,
    uploadPhotoFromClient,
} from '@/services/blob';
import { useRouter } from 'next/navigation';
import {
    useForm,
    useFieldArray,
    useWatch,
    SubmitHandler,
    SubmitErrorHandler,
} from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormDatePicker } from '@/components/ui/formDatePicker';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectFormSchema as initProjectFormSchema } from '@/lib/validation';
import { createProjectAction } from '@/data/actions';
import { PhotoPreviewContainer } from '../PhotoPreviewContainer';
import { z } from 'zod';
import { PutBlobResult } from '@vercel/blob';

const ProjectFormSchema = initProjectFormSchema.extend({
    photosPreview: z.instanceof(File).array(),
});

type ProjectFormShape = z.infer<typeof ProjectFormSchema>;

export const ProjectUploadForm = () => {
    const router = useRouter();
    const form = useForm<ProjectFormShape>({
        resolver: zodResolver(ProjectFormSchema),
        defaultValues: {
            title: 'a',
            description: 'b',
            projectDate: new Date(),
        },
    });
    const { fields, swap, remove } = useFieldArray({
        control: form.control,
        name: 'photosPreview',
    });

    const filesWatch: File[] = useWatch({
        control: form.control,
        name: 'files',
    });

    const getUploadFiles = () => {
        return form.getValues('photosPreview');
    };

    const createProjectBlobs = async () => {
        const uploadPhotosPromises = getUploadFiles().map((file) => {
            const extension = file.name.split('.').pop();
            return uploadPhotoFromClient(file, extension);
        });
        try {
            const uploadPhotosResults = await Promise.all(uploadPhotosPromises);
            console.log({ uploadPhotosResults });
            return uploadPhotosResults;
        } catch (error) {
            console.log(`Photos Upload Error ${error}`);
        }
    };

    const createProjectData = async (
        data: ProjectFormShape,
        blobs: PutBlobResult[] | undefined
    ) => {
        if (!blobs) return;
        const photoObjects = blobs.map((blob, index) => {
            const { url, contentType } = blob;
            return {
                url,
                extension: contentType.split('/')[1],
                blurData: url,
                title: data.title,
                locationName: 'ottawa',
                isShowcase: false,
                priorityOrder: index,
                hidden: false,
                takenAt: new Date(),
            };
        });
        const uploadData = Object.assign({}, data);
        delete uploadData.files;
        uploadData.photosPreview = [];
        uploadData.photos = photoObjects;
        try {
            const project = await createProjectAction(uploadData);
            form.reset();
            return project;
        } catch (error) {
            console.log(`Project Upload Error ${error}`);
        }
    };

    const onSubmit: SubmitHandler<ProjectFormShape> = async (
        data: ProjectFormShape
    ) => {
        console.log({ data });
        const blobs = await createProjectBlobs();
        const project = await createProjectData(data, blobs);
        router.refresh();
    };

    const onError: SubmitErrorHandler<object> = (errors: object) => {
        console.log('error', { errors });
    };

    useEffect(() => {
        const files = filesWatch ? Array.from(filesWatch) : [];
        const selectedFiles = [...getUploadFiles(), ...files];
        form.setValue('photosPreview', selectedFiles);
    }, [filesWatch]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className='w-3/6 overflow-auto'
            >
                <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='title'
                                    required={true}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='description'
                                    required={true}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='projectDate'
                    render={({ field }) => (
                        <FormItem className='flex flex-col'>
                            <FormLabel>Project Date</FormLabel>
                            <FormDatePicker field={field} />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormItem>
                    <FormLabel>Photos</FormLabel>
                    <FormControl>
                        <Input
                            placeholder='select photos to upload'
                            type='file'
                            multiple
                            accept={ACCEPTED_PHOTO_FILE_TYPES.join(',')}
                            {...form.register('files')}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>

                <FormItem>
                    <div className='grid grid-cols-3'>
                        {fields.map((field, index) => (
                            <div key={field.id}>
                                <PhotoPreviewContainer
                                    key={field.id}
                                    {...{
                                        control: form.control,
                                        index,
                                        max: fields.length,
                                        field,
                                        swapItem: swap,
                                        deleteItem: remove,
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {!!fields.length && (
                        <Button
                            onClick={() => {
                                form.resetField('files');
                                remove();
                            }}
                        >
                            Clear Files
                        </Button>
                    )}
                </FormItem>
                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    );
};
