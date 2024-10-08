'use client';

import { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Icons } from '@/components/icons';
import { ProjectContext } from '@/site/ProjectsProvider';
import { cn, getProject, getAdjacentProjects } from '@/lib/utils';

export const ProjectView = ({ projectId }) => {
    const router = useRouter();
    const projects = useContext(ProjectContext);
    const { project, projectIndex } = getProject(projectId, projects) || {};
    if (!project) router.push('/');
    const [previous, next] = getAdjacentProjects(projectIndex, projects);
    const { photos, description, title, additionalInfo } = project;

    return (
        <div className='pb-12 flex flex-col flex-1'>
            <div className='flex-1'>
                <div className='relative'>
                    <div className='sm:h-[80vh] h-[80vw] overflow-hidden relative'>
                        <Image
                            src={project.cover.url}
                            alt={`Project photo for ${project.cover.title}`}
                            className={cn('object-cover w-full h-full')}
                            key={'coverProjectImage'}
                            width={1080}
                            height={1280}
                            loading={'lazy'}
                        />
                    </div>
                    <div className='px-2 sm:px-9 pt-2 sm:pt-0'>
                        {/* projectLinksContainer */}
                        <div className='bg-background sm:bg-transparent sticky right-0 sm:sticky flex sm:mb-[calc(100vh-6rem-1px)] sm:top-0 bottom-0 sm:bottom-0 w-full sm:w-auto sm:h-24 p-4 sm:p-0 sm:pt-6 py-0 sm:py-7'>
                            {/* projectLinks */}
                            <div id='projectLinks' className='grid w-full -z-0'>
                                <div className='w-full sm:w-1/2 flex sm:justify-self-start right-0 relative justify-between'>
                                    <div className='hidden sm:flex gap-2'>
                                        <Link
                                            href='/'
                                            className='hover:opacity-50'
                                        >
                                            Home
                                        </Link>
                                        <Link
                                            href='/projects'
                                            className='hover:opacity-50'
                                        >
                                            Projects
                                        </Link>
                                    </div>
                                    <div className='flex grow sm:grow-0 justify-between sm:justify-normal gap-2'>
                                        <Link
                                            href={previous.id}
                                            className='hover:opacity-50'
                                        >
                                            <Icons.arrowLeft className='group-hover:rotate-45 ease-in-out duration-300' />
                                        </Link>
                                        <Link
                                            href={next.id}
                                            className='hover:opacity-50'
                                        >
                                            <Icons.arrow className='group-hover:-rotate-45 ease-in-out duration-300' />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* photosAndTitleContainer */}
                        <div className='sm:grid sm:grid-cols-2 sm:gap-x-9 sm:items-start sm:mt-[calc(-100vh+6rem)]'>
                            {/* 'titleContainer' */}
                            <div
                                id='titleContainer'
                                className='sm:sticky flex flex-col items-center justify-center sm:items-start sm:min-h-[calc(100vh-6rem)] top-[6rem]'
                            >
                                <h1
                                    id='project-title'
                                    className='text-xl text-center sm:text-[5.5rem]/[0.8em] sm:tracking-[-0.025rem] w-full sm:w-[calc(66.67%-1.125rem)]'
                                >
                                    {title.toUpperCase()}
                                </h1>
                                <div
                                    id='description-info'
                                    className='grid w-full p-4 pt-0 mt-auto'
                                >
                                    <span className='mb-8 text-center'>{description}</span>
                                    {Object.entries(additionalInfo).map(
                                        ([key, value]) => {
                                            return (
                                                <div
                                                    key={`${key}_${value}_additionalInfo`}
                                                    className='grid grid-cols-2 border-t border-primary'
                                                >
                                                    <span>{key}:</span>
                                                    <span>{value}</span>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                            {/* photos */}
                            <div
                                id='photosContainer'
                                className='flex flex-wrap gap-9'
                            >
                                {photos.map((photo, index) => {
                                    if (photo.url === project.cover.url) return;
                                    return (
                                        <Image
                                            src={photo.url}
                                            alt={`Project photo for ${photo.title}`}
                                            className={cn(
                                                'object-contain w-full h-full'
                                            )}
                                            key={`${index}_projectImage`}
                                            width={1080}
                                            height={1280}
                                            loading={'lazy'}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
