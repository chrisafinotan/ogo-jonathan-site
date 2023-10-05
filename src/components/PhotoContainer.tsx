'use client';

import Image from 'next/image';
import { AspectRatio } from './ui/aspect-ratio';

export const PhotoContainer = ({ url, alt, ...props }) => {
    console.log('hey', url);
    return (
        <AspectRatio ratio={16 / 9} className='bg-muted'>
            <Image
                src={url}
                alt={alt}
                fill
                className='rounded-md object-cover'
            />
        </AspectRatio>
    );
};
