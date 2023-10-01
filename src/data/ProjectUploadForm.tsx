'use client';

import { ChangeEvent, useState } from 'react';
import Spinner from '@/components/Spinner';
import {
    ACCEPTED_PHOTO_FILE_TYPES,
    uploadPhotoFromClient,
} from '@/services/blob';
import { cc } from '@/utility/css';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
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
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const ProjectFormSchema = z.object({
    files: z.instanceof(FileList),
});
type ProjectFormShape = z.infer<typeof ProjectFormSchema>;

export default function ProjectUploadForm() {
    const [uploadFiles, setUploadFiles] = useState<File[]>([]);
    // const [uploadFiles, setUploadFiles] = useState<Record<string, File> | []>([]);
    // const [files, setFiles] = useState<Record<string, File> | null>(null);
    
    const router = useRouter();
    const form = useForm<ProjectFormShape>({
        resolver: zodResolver(ProjectFormSchema),
    });

    const onSubmit: SubmitHandler<ProjectFormShape> = async (
        data: ProjectFormShape
    ) => {
        console.log({ uploadFiles });
        const uploadPhotosPromises = uploadFiles.map((file) => {
            const extension = file.name.split('.').pop();
            return uploadPhotoFromClient(file, extension);
        });
        try {
            const uploadPhotosResults = await Promise.all(uploadPhotosPromises);
            console.log({ uploadPhotosResults });
            // router.refresh();
            // router.push('/admin/uploads');
        } catch (error) {
            console.log(`Upload Error ${error}`);
        }
    };

    const handleFiles = (e : ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files);
        console.log({ files });
        setUploadFiles(files);

        // const files = e.target.files;
        // const newFiles: Record<string, File> = {};
        // const keys = Object.keys(files);
        
        // for(let i = 0; i < keys.length; i++) {
        //   const file = newFiles[keys[i]];
        //   newFiles[file.name] = file;
        // }

        // setFiles(newFiles);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name='files'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Files</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='example@domain.com'
                                    type='file'
                                    multiple
                                    required={true}
                                    accept={ACCEPTED_PHOTO_FILE_TYPES.join(',')}
                                    {...field}
                                    onChange={handleFiles}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    );
}
