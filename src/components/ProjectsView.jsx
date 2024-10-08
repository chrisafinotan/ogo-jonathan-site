'use client';

import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProjectContext } from '@/site/ProjectsProvider';
import { cn } from '@/lib/utils';

export const ProjectsView = () => {
    const projects = useContext(ProjectContext);
    return (
        <div className='pb-12 flex flex-col flex-1'>
            <div className='flex-1'>
                <div className='px-9 pt-9 sm:pt-[calc(2.25rem+3rem)] sm:pb-9 fixed top-0 h-screen w-full pointer-events-none'>
                    <div className='pt-3 pb-28 h-full flex flex-wrap justify-between overflow-scroll no-scrollbar ml-auto w-1/2 gap-2'>
                        {projects.map((project, index) => {
                            return (
                                <div
                                    className={cn(
                                        'transition-all duration-700 delay-500 opacity-100 translate-y-0 pointer-events-auto'
                                    )}
                                >
                                    <Link
                                        href={`projects/${project.id}`}
                                        className='group grid grid-rows-12 h-[40vh]'
                                    >
                                        <Image
                                            src={project.cover.url}
                                            alt={`Project project for ${project.title}`}
                                            className={cn(
                                                'object-cover h-full row-span-11'
                                            )}
                                            key={`${index}_projects`}
                                            width={1080}
                                            height={1280}
                                            loading={'lazy'}
                                        />
                                        <div className='flex shrink-0 justify-between flex-row-reverse transition-colors group-hover:text-hover-grey'>
                                            <div>
                                                {`${index + 1}`.padStart(
                                                    2,
                                                    '0'
                                                )}
                                            </div>
                                            <div>{project.title}</div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
