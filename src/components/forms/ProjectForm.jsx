'use client';

// hooks
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
// functions
import {
    createProjectBlobs,
    createProjectData,
    deleteProjectData,
    updateProjectData,
    updateProjectCover,
    createPhotoData,
    linkPhotosToProject,
    publishProject,
} from './helper';
import { ProjectFormSchema } from './helperSchemas';

// components
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure,
    ModalHeader,
    ModalFooter,
} from '@/components/ui/modal';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormDatePicker } from '@/components/formDatePicker';
import { useToast } from '@/components/ui/use-toast';
import { AdditionalInfoContainer } from '@/components/AdditionalInfoContainer';
import { PhotoPreviewContainer } from '@/components/PhotoPreviewContainer';
import { PhotosContainer } from '@/components/PhotosContainer';
import { ProjectCoverSelector } from '@/components/ProjectCoverSelector';
import { ProjectTagSelector } from '@/components/ProjectTagSelector';
import { Icons } from '@/components/icons';

// utils
import { cn } from '@/lib/utils';
import { ACCEPTED_PHOTO_FILE_TYPES } from '@/site/config';
import { ProjectChecklist } from '@/components/ProjectChecklist';

const formDefaultValues = {
    title: '',
    description: '',
    projectDate: new Date(),
    isPublished: false,
    displayOrder: null,
    additionalInfoFields: undefined,
};

const createAdditionalInfoFields = (initValues) => {
    if (initValues.additionalInfo) {
        initValues.additionalInfoFields = Object.entries(
            initValues.additionalInfo
        ).map(([key, value]) => {
            return {
                key,
                value: value,
            };
        });
    }
    return initValues;
};

export const ProjectForm = ({ initValues, tags = [] }) => {
    const isNew = isEmpty(initValues);
    if (isNew) initValues = formDefaultValues;
    createAdditionalInfoFields(initValues);
    const router = useRouter();
    const { toast } = useToast();

    const publishProjectDisclosure = useDisclosure();
    const deleteProjectDisclosure = useDisclosure();
    const uploadPhotosDisclosure = useDisclosure();
    const selectCoverDisclosure = useDisclosure();
    const { isOpen, onOpen, onOpenChange } = selectCoverDisclosure;

    const form = useForm({
        resolver: zodResolver(ProjectFormSchema),
        defaultValues: initValues,
        criteriaMode: 'all',
    });
    console.log({ form, initValues, a: form.getValues() });

    const {
        fields: photosToPreview,
        swap,
        remove,
    } = useFieldArray({
        control: form.control,
        name: 'photosPreview',
    });

    const {
        fields: photoFields,
        append: photosAppend,
        swap: photosSwap,
        remove: photosRemove,
    } = useFieldArray({
        control: form.control,
        name: 'photos',
        keyName: 'photoFieldId',
    });

    const {
        fields: additionalInfos,
        append: additionalAppend,
        remove: additionalRemove,
    } = useFieldArray({
        control: form.control,
        name: 'additionalInfoFields',
    });

    const checkResponse = (response, opts) => {
        const { successMessage } = opts;
        const { data, error } = response;
        if (error) {
            toast({
                variant: 'destructive',
                title: error.message,
            });
            return;
        }
        if (successMessage) {
            toast({
                variant: 'default',
                title: successMessage,
            });
        }
        return data;
    };

    const setDirectoryFiles = (e) => {
        const files = Array.from(e.target.files);
        setFiles(files);
    };

    const parseFileToPhoto = (file) => {
        const objectUrl = URL.createObjectURL(file);
        if (!objectUrl) {
            URL.revokeObjectURL(objectUrl);
            return;
        }
        return { photo: objectUrl, name: file.name, file };
    };

    const getUploadFiles = () => {
        return form.getValues('photosPreview');
    };

    const getCoverIndex = () => {
        const coverURL = form.getValues('coverURL');
        const coverIndex = form
            .getValues('photos')
            .findIndex((el) => el === coverURL);
        if (coverIndex > -1) return coverIndex;
    };

    const createProject = async (data) => {
        try {
            const photosToUpload = getUploadFiles();
            const coverIndex = getCoverIndex();
            console.log({ photosToUpload, coverIndex });
            const blobs = await createProjectBlobs(photosToUpload, data.title);
            console.log('created blobs', { blobs });
            const { data: project } = await createProjectData(data, blobs);
            console.log('created project', { project, initValues });
            const projectWithCover = await updateProjectCover(
                project,
                initValues,
                coverIndex
            );
            return projectWithCover;
        } catch (e) {
            console.log('create err', e);
        }
    };

    const deleteProject = async (data) => {
        try {
            const { id } = data;
            const res = await deleteProjectData(id);
            console.log('deleted project', data, id, res);
            return res;
        } catch (e) {
            console.log('delete error', e);
        }
    };

    const updateProject = async (data) => {
        try {
            return updateProjectData(data, initValues);
        } catch (e) {
            console.error(e);
        }
    };

    const uploadPhotos = async (e) => {
        try {
            e.preventDefault();
            const photosToUpload = _.map(getUploadFiles(), 'file');
            const project = form.getValues();
            const blobs = await createProjectBlobs(
                photosToUpload,
                project.title
            );

            const photoData = await createPhotoData(project, blobs);
            const photos = checkResponse(photoData, { reload: false });

            const updatedProject = await linkPhotosToProject(
                photos,
                project,
                initValues
            );
            checkResponse(updatedProject, {
                successMessage: 'Photos uploaded',
            });
            setReadMode(true);
        } catch (e) {
            console.error(e);
        }
    };

    const onPublish = async (e) => {
        try {
            e.preventDefault();
            const project = form.getValues();
            const response = await publishProject(project);
            checkResponse(response, {
                successMessage: 'Project published',
            });
            router.refresh();
        } catch (e) {
            console.error(e);
        }
    };

    // use hook form allows for async function
    const onUpdateProject = async (xdata) => {
        try {
            const data = form.getValues();
            const response = await updateProject(data);
            console.log({ data, xdata, response });
            checkResponse(response, {
                successMessage: 'Project updated',
            });
            if (response?.data?.id) {
                setReadMode(true);
                // router.refresh();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const onCreateProject = async (xdata) => {
        try {
            const data = form.getValues();
            console.log('create 1', { data });
            const response = await createProject(data);
            console.log('create 2', { data, xdata, response });
            checkResponse(response, {
                successMessage: 'Project created',
            });
            router.push(`/admin/projects/${response.data.id}`);
            // if (response?.data?.id) {
            // setReadMode(true);
            // router.refresh();
            // }
        } catch (e) {
            console.error(e);
        }
    };

    const onDeleteProject = async (data) => {
        try {
            console.log(form, data);
            const response = await deleteProject(data);
            checkResponse(response, {
                successMessage: 'Project deleted',
            });
            router.push(`/admin/projects`);
        } catch (e) {
            console.error(e);
        }
    };

    const isSaved = form.getValues('id');
    const [files, setFiles] = useState([]);
    const [readMode, setReadMode] = useState(isSaved ? true : false);
    const photosToPreviewMax = photosToPreview.length;
    const photosToPreviewOpts = {
        control: form.control,
        max: photosToPreviewMax,
        swapItem: swap,
        deleteItem: remove,
    };
    const photosMax = photoFields.length;
    const photosOpts = {
        control: form.control,
        max: photosMax,
        appendItem: photosAppend,
        swapItem: photosSwap,
        deleteItem: photosRemove,
    };

    useEffect(() => {
        const newPhotos = files.map((file) => parseFileToPhoto(file));
        const currentPhotos = getUploadFiles() || [];
        const allSelectedPhotos = _.uniqBy(
            [...currentPhotos, ...newPhotos],
            'name'
        );
        form.setValue('photosPreview', allSelectedPhotos);
        console.log('changing files', allSelectedPhotos, files);
    }, [files]);

    const AddPhotosLabel = () => {
        return (
            <Label
                htmlFor='addPhotosInput'
                className={cn(
                    buttonVariants({
                        variant: 'default',
                    })
                )}
            >
                <Icons.plus />
                <Input
                    placeholder='add photos'
                    type='file'
                    className='hidden'
                    id='addPhotosInput'
                    multiple
                    accept={ACCEPTED_PHOTO_FILE_TYPES.join(',')}
                    onChange={(e) => setDirectoryFiles(e)}
                />
            </Label>
        );
    };

    const UploadPhotosButtonComponent = ({ readMode }) => {
        const { isOpen, onOpen, onOpenChange } = uploadPhotosDisclosure;
        return (
            <>
                <Button disabled={readMode} onClick={onOpen}>
                    Select Photos to Upload
                </Button>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    size='5xl'
                    backdrop='blur'
                    placement='top'
                    classNames={{
                        body: 'min-h-[50vh]',
                        base: 'bg-card text-card-foreground shadow-sm',
                    }}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader>Add Photos</ModalHeader>
                                <ModalBody>
                                    <AddPhotosLabel form={form} />
                                    <div className='grid grid-cols-3 m-0'>
                                        {photosToPreview.map((field, index) => (
                                            <PhotoPreviewContainer
                                                key={field.id}
                                                {...{
                                                    index,
                                                    field,
                                                    ...photosToPreviewOpts,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <div className='w-full flex justify-between'>
                                        <Button
                                            variant='destructive'
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant='default'
                                            type='submit'
                                            onClick={(e) => uploadPhotos(e)}
                                        >
                                            Upload Photos
                                        </Button>
                                    </div>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>
        );
    };

    const DeleteProjectButtonComponent = () => {
        const { isOpen, onOpen, onOpenChange } = deleteProjectDisclosure;
        console.log({ form, a: form.getValues() });
        return (
            <>
                <Button
                    onClick={onOpen}
                    // type='submit'
                    variant='destructive'
                >
                    Delete Project &nbsp;
                    <Icons.delete />
                </Button>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    size='sm'
                    backdrop='blur'
                    // placement='top'
                    classNames={{
                        // body: 'min-h-[50vh]',
                        base: 'bg-card text-card-foreground shadow-sm',
                    }}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader>Delete Project</ModalHeader>
                                <ModalBody>
                                    <div className='m-0'>
                                        Are you sure you want to delete the
                                        project ?
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <div className='w-full flex justify-between'>
                                        <Button
                                            variant='default'
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant='destructive'
                                            // type='submit'
                                            onClick={(e) => {
                                                const data = form.getValues();
                                                onDeleteProject(data);
                                                onClose();
                                                e.preventDefault();
                                            }}
                                        >
                                            Confirm
                                        </Button>
                                    </div>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>
        );
    };

    const PublishProjectButtonComponent = () => {
        const { isOpen, onOpen, onOpenChange } = publishProjectDisclosure;
        console.log({ form, a: form.getValues() });
        return (
            <>
                <Button
                    onClick={onOpen}
                    // type='submit'
                    variant='sparkle'
                >
                    Publish Project &nbsp;
                    <Icons.publish />
                </Button>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    size='sm'
                    backdrop='blur'
                    // placement='top'
                    classNames={{
                        // body: 'min-h-[50vh]',
                        base: 'bg-card text-card-foreground shadow-sm',
                    }}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader>Publish Project</ModalHeader>
                                <ModalBody>
                                    <div className='m-0'>
                                        Are you sure you want to publish the
                                        project ?
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <div className='w-full flex justify-between'>
                                        <Button
                                            variant='default'
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant='sparkle'
                                            // type='submit'
                                            // onClick={(e) => {
                                            //     const data = form.getValues();
                                            //     onDeleteProject(data);
                                            //     onClose();
                                            //     e.preventDefault();
                                            // }}
                                        >
                                            Confirm
                                        </Button>
                                    </div>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>
        );
    };

    return (
        <Form {...form}>
            <Card className='w-full'>
                <CardHeader>
                    {isSaved ? (
                        <CardTitle>
                            {readMode ? initValues.title : 'Editing Project'}
                        </CardTitle>
                    ) : (
                        <CardTitle>Create Project</CardTitle>
                    )}
                </CardHeader>
                <CardContent>
                    <form>
                        <div className='overflow-auto grid gap-4 grid-cols-2'>
                            <div className='flex flex-col gap-2'>
                                <FormField
                                    disabled={readMode}
                                    name='title'
                                    control={form.control}
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
                                    disabled={readMode}
                                    name='description'
                                    control={form.control}
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
                                    disabled={readMode}
                                    control={form.control}
                                    name='projectDate'
                                    render={({ field }) => (
                                        <FormItem className='grid'>
                                            <FormLabel>Project Date</FormLabel>
                                            <FormControl>
                                                <FormDatePicker
                                                    readMode={readMode}
                                                    field={field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormItem>
                                    <FormLabel>Additional Info</FormLabel>
                                    <div className='grid grid-cols-1 m-0'>
                                        {additionalInfos.map((field, index) => (
                                            <div key={field.id}>
                                                <AdditionalInfoContainer
                                                    readMode={readMode}
                                                    key={field.id}
                                                    {...{
                                                        control: form.control,
                                                        index,
                                                        field,
                                                        deleteItem:
                                                            additionalRemove,
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        disabled={readMode}
                                        type='button'
                                        variant='secondary'
                                        onClick={() => {
                                            additionalAppend({
                                                key: '',
                                                value: '',
                                            });
                                        }}
                                    >
                                        Add Info
                                    </Button>
                                </FormItem>
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <ProjectTagSelector
                                        form={form}
                                        allTags={tags}
                                        readMode={readMode}
                                    />
                                </FormItem>
                            </div>
                            <div>
                                <FormItem>
                                    <FormLabel>Photos</FormLabel>
                                    {!isSaved ? (
                                        <>
                                            <AddPhotosLabel form={form} />
                                            {!!photosToPreview.length && (
                                                <Button
                                                    onClick={() => {
                                                        form.resetField(
                                                            'photosPreview'
                                                        );
                                                        setFiles([]);
                                                        remove();
                                                    }}
                                                >
                                                    Clear All
                                                </Button>
                                            )}
                                            <FormMessage />
                                            <FormItem>
                                                <div className='grid grid-cols-3 m-0'>
                                                    {photosToPreview.map(
                                                        (field, index) => (
                                                            <PhotoPreviewContainer
                                                                key={field.id}
                                                                {...{
                                                                    index,
                                                                    field,
                                                                    ...photosToPreviewOpts,
                                                                }}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </FormItem>
                                        </>
                                    ) : (
                                        <div className='flex flex-col justify-center'>
                                            <UploadPhotosButtonComponent
                                                readMode={readMode}
                                            />
                                            <div className='grid grid-cols-3 m-0'>
                                                {photoFields.map(
                                                    (field, index) => (
                                                        <PhotosContainer
                                                            readMode={readMode}
                                                            key={`${field.id}__savedProjectPhotos`}
                                                            {...{
                                                                index,
                                                                field,
                                                                ...photosOpts,
                                                            }}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button
                                        variant='secondary'
                                        type='button'
                                        onClick={onOpen}
                                        disabled={readMode}
                                    >
                                        {form.getValues('cover')
                                            ? 'Change'
                                            : 'Select'}{' '}
                                        Cover
                                    </Button>
                                    <Modal
                                        isOpen={isOpen}
                                        onOpenChange={onOpenChange}
                                        size='5xl'
                                        backdrop='blur'
                                        placement='top'
                                        classNames={{
                                            body: 'min-h-[50vh]',
                                            base: 'bg-card text-card-foreground shadow-sm',
                                        }}
                                    >
                                        <ModalContent className='max-w-7xl max-h-fit'>
                                            {(onClose) => (
                                                <>
                                                    <ModalHeader>
                                                        {form.getValues('cover')
                                                            ? 'Change'
                                                            : 'Select'}{' '}
                                                        Cover
                                                    </ModalHeader>
                                                    <ModalBody>
                                                        <ProjectCoverSelector
                                                            form={form}
                                                            initCover={form.getValues(
                                                                'cover'
                                                            )}
                                                            onClose={onClose}
                                                        />
                                                    </ModalBody>
                                                </>
                                            )}
                                        </ModalContent>
                                    </Modal>
                                </FormItem>
                            </div>
                        </div>
                        <CardFooter className='block m-2'>
                            <div className='flex gap-4 justify-between'>
                                {isSaved ? (
                                    <div className='flex gap-4 justify-center w-full'>
                                        <div className='w-fit flex gap-4 justify-between'>
                                            {readMode && (
                                                <PublishProjectButtonComponent />
                                            )}
                                            <Button
                                                // type='submit'
                                                variant='default'
                                                disabled={readMode}
                                                onClick={(e) => {
                                                    const data =
                                                        form.getValues();
                                                    console.log(
                                                        'trying submit',
                                                        form,
                                                        data
                                                    );
                                                    onUpdateProject(data);
                                                    // form.handleSubmit(
                                                    //     onUpdateProject
                                                    // );
                                                    e.preventDefault();
                                                }}
                                            >
                                                Update Project &nbsp;
                                                <Icons.save />
                                            </Button>
                                            <Button
                                                type='button'
                                                variant='secondary'
                                                onClick={(e) => {
                                                    console.log('');
                                                    e.preventDefault();
                                                    setReadMode(!readMode);
                                                }}
                                            >
                                                {readMode ? (
                                                    <>
                                                        Edit &nbsp;
                                                        <Icons.edit />
                                                    </>
                                                ) : (
                                                    <>
                                                        Done &nbsp;
                                                        <Icons.check className='scale-[2.5]' />
                                                    </>
                                                )}
                                            </Button>
                                            {readMode && (
                                                <DeleteProjectButtonComponent />
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <Button
                                        // type='submit'
                                        variant='default'
                                        // disabled={readMode}
                                        onClick={(e) => {
                                            const data = form.getValues();
                                            console.log('click', form, data);
                                            onCreateProject(data);
                                            // form.handleSubmit(
                                            //     onCreateProject
                                            // );
                                            e.preventDefault();
                                        }}
                                    >
                                        Create Project &nbsp;
                                        <Icons.save />
                                    </Button>
                                )}
                            </div>
                        </CardFooter>
                    </form>

                    {/* <ProjectChecklist
                        readMode={readMode}
                        onPublish={onPublish}
                    /> */}
                </CardContent>
            </Card>
        </Form>
    );
};
