'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const SearchCard = ({ project, index }) => {
    return (
        <div
            className={cn(
                'transition-all duration-700 delay-500 opacity-100 translate-y-0 pointer-events-auto'
            )}
        >
            <Link
                href={`projects/${project.id}`}
                className='group grid grid-cols-12 grid-rows-4 max-h-[50vh]'
            >
                <div className='col-span-1'>
                    {`${index + 1}`.padStart(2, '0')}
                </div>
                <Image
                    src={project.cover.url}
                    alt={`Project project for ${project.title}`}
                    className={cn('object-cover h-full col-span-8 row-span-4')}
                    width={1080}
                    height={1280}
                    loading={'lazy'}
                />
                <div className='px-2 col-span-3 row-span-1 flex shrink-0 justify-between flex-col transition-colors group-hover:text-hover-grey'>
                    <div>{project.title}</div>
                    <div>{project.description}</div>
                </div>
            </Link>
        </div>
    );
};
