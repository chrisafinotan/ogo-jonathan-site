'use client';

import Image from 'next/image';
import { AspectRatio } from './ui/aspect-ratio';
import { ItemMover } from '@/components/ItemMover';

export const PhotoPreviewContainer = ({
    index,
    max,
    field,
    swapItem,
    deleteItem,
}) => {
    const preview = field.value.photo;
    return (
        <div key={field.id} className='m-2'>
            <div>
                {preview && (
                    <AspectRatio ratio={16 / 9} className='bg-muted'>
                        <Image
                            src={preview}
                            alt='Upload Image preview'
                            fill
                            className='rounded-md object-cover'
                        />
                    </AspectRatio>
                )}
            </div>
            <ItemMover
                swapItem={swapItem}
                deleteItem={deleteItem}
                index={index}
                max={max}
            />
        </div>
    );
};
