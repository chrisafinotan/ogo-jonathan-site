'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
    useWatch,
    Control,
    Controller,
    UseFieldArraySwap,
    UseFieldArrayRemove,
} from 'react-hook-form';
import { AspectRatio } from './ui/aspect-ratio';
import { Icons } from './icons';
import { Button } from './ui/button';
import { clamp } from '@/utility/helper';
type TPhotoPreviewContainer = {
    control: Control<any>;
    index: number;
    max: number;
    field: any;
    swapItem?: UseFieldArraySwap;
    deleteItem?: UseFieldArrayRemove;
};
export const PhotoPreviewContainer = ({
    control,
    index,
    max,
    field,
    swapItem,
    deleteItem,
}: TPhotoPreviewContainer) => {
    const value = useWatch({
        name: 'photosPreview',
        control,
    });
    const file = value?.[index];
    const [preview, setPreview] = useState<string | undefined>();
    useEffect(() => {
        if (!file) {
            setPreview(undefined);
            return;
        }
        console.log('effect', { file });
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        return () => {
            if (!objectUrl) return;
            URL.revokeObjectURL(objectUrl);
        };
    }, [file]);

    return (
        <div key={field.id} className='m-2'>
            <Controller
                name={`photosPreview.${index}`}
                render={({ field }) => {
                    return (
                        <div>
                            {preview && (
                                <AspectRatio
                                    ratio={16 / 9}
                                    className='bg-muted'
                                >
                                    <Image
                                        src={preview}
                                        alt='Upload Image preview'
                                        fill
                                        className='rounded-md object-cover'
                                    />
                                </AspectRatio>
                            )}
                        </div>
                    );
                }}
            />
            <div className='w-full grid grid-cols-3 gap-4'>
                <Button
                    onClick={() =>
                        swapItem && swapItem(index, clamp(index - 1, 0, index))
                    }
                    className='col-start-1'
                    disabled={index === 0}
                >
                    <Icons.chevronLeft />
                </Button>
                <Button
                    onClick={() => deleteItem && deleteItem(index)}
                    className='col-start-2'
                >
                    <Icons.delete />
                </Button>
                <Button
                    onClick={() =>
                        swapItem &&
                        swapItem(index, clamp(index + 1, index, max - 1))
                    }
                    className='col-start-3'
                    disabled={index === max - 1}
                >
                    <Icons.chevronRight />
                </Button>
            </div>
        </div>
    );
};
