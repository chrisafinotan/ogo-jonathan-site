'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Form, FormItem } from '@/components/ui/form';
import { Icons } from '@/components/icons';
import { ItemMover } from '@/components/ItemMover';
import { updateShowcaseData } from './forms/helper';

export const ShowcaseOrganizer = ({ showcasePhotos }) => {
    const [editMode, setEditMode] = useState(false);
    const form = useForm({
        defaultValues: { photos: showcasePhotos },
    });

    const {
        fields,
        swap: swapItem,
        remove: deleteItem,
    } = useFieldArray({
        control: form.control,
        name: 'photos',
    });
    const onSubmit = async (data) => {
        try {
            await updateShowcaseData({
                finalShowcase: data.photos,
                initShowcase: showcasePhotos,
            });
        } catch (error) {
            onError(error);
        }
    };

    const onError = (errors) => {
        console.log('error', { errors });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                <div className='w-full flex justify-end my-2'>
                    {editMode ? (
                        <>
                            <Button type='submit'>
                                <Icons.save />
                            </Button>
                            <Button
                                type='button'
                                variant='destructive'
                                onClick={() => setEditMode(!editMode)}
                            >
                                <Icons.cancel />
                            </Button>
                        </>
                    ) : (
                        <Button
                            type='button'
                            onClick={() => setEditMode(!editMode)}
                        >
                            <Icons.edit />
                        </Button>
                    )}
                </div>
                <FormItem>
                    <div className='grid grid-cols-3 gap-2 '>
                        {fields.map((photoInfo, index) => {
                            const photoProjectInfo = photoInfo.Project;
                            if (!photoProjectInfo.id) return <></>;
                            const max = fields.length;
                            return (
                                <div key={`showcaseElement_${photoInfo.id}`}>
                                    <Card className='w-full justify-self-center grid gap-2 justify-center p-2 relative'>
                                        <Link
                                            href={`/admin/projects/${photoProjectInfo.id}`}
                                            className='group flex flex-col'
                                        >
                                            <CardHeader className='p-0 flex flex-row w-full justify-between text-xl'>
                                                {photoProjectInfo.title}
                                                <Icons.arrow className='group-hover:-rotate-45 transition-transform' />
                                            </CardHeader>
                                            {photoInfo.url && (
                                                <Image
                                                    src={photoInfo.url}
                                                    alt={`Showcase photo for ${photoInfo.title}`}
                                                    height={200}
                                                    width={500}
                                                    className='rounded-md object-contain h-72 justify-self-center'
                                                />
                                            )}
                                        </Link>
                                        {editMode && (
                                            <CardFooter className='p-0 grid'>
                                                <ItemMover
                                                    swapItem={swapItem}
                                                    deleteItem={deleteItem}
                                                    index={index}
                                                    max={max}
                                                />
                                            </CardFooter>
                                        )}
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </FormItem>
            </form>
        </Form>
    );
};
