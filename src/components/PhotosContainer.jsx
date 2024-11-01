'use client';

import Image from 'next/image';
import { useWatch } from 'react-hook-form';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ItemMover } from '@/components/ItemMover';
import { cn } from '@/lib/utils';

export const PhotosContainer = ({
    control,
    index,
    max,
    field,
    swapItem,
    addItem,
    deleteItem,
    readMode,
}) => {
    const coverIdWatch = useWatch({
        control,
        name: 'coverId',
    });
    console.log({ field, coverIdWatch });
    return (
        <div
            key={field.id}
            className={cn(
                'p-2 relative',
                coverIdWatch === field.id &&
                    'border-blue-500 border-solid border-8'
            )}
        >
            <AspectRatio ratio={16 / 9} className={cn('bg-muted')}>
                <Image
                    src={field.url}
                    alt={field.title}
                    height={320}
                    width={400}
                    className='rounded-md object-contain h-full max-h-72'
                    priority={true}
                    disabled={readMode}
                />
            </AspectRatio>
            {/* {coverIdWatch === field.id && (
                <div className='absolute top-0 left-0 bg-green-600 opacity-50 w-full h-full text-white font-extrabold align-middle text-4xl flex justify-center items-center text-center'>
                    Cover
                </div>
            )} */}
            {field.isShowcase && (
                <div className='absolute top-0 left-0 bg-yellow-500 opacity-50 w-full h-full text-white font-extrabold align-middle text-4xl flex justify-center items-center text-center'></div>
            )}
            <ItemMover
                swapItem={swapItem}
                addItem={addItem}
                deleteItem={deleteItem}
                index={index}
                max={max}
                readMode={readMode}
            />
        </div>
    );
};
