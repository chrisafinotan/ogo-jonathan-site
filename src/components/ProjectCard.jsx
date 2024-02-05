'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { TagItem } from '@/components/TagItem';

export const ProjectCard = ({ project }) => {
    const router = useRouter();
    return (
        <Card
            className='group transition-all w-full'
            onClick={() => router.push(`/projects/${project.id}`)}
        >
            <div className='grid grid-cols-[1fr_1fr] max-h-64 justify-self-center gap-2 justify-between p-2 relative'>
                <div className='flex flex-col gap-1'>
                    <CardTitle className='flex flex-col gap-2'>
                        <div className='flex justify-start'>
                            <Icons.arrow className='group-hover:-rotate-45 ease-in-out duration-300' />
                            {project.title}
                        </div>
                    </CardTitle>
                    <div className='flex justify-start'>
                        {project.description}
                    </div>
                    <div className='flex flex-wrap gap-2 h-fit text-small'>
                        {project.tags.map((tag) => {
                            return (
                                <TagItem
                                    tag={tag}
                                    key={`${tag.id}_projectTag`}
                                />
                            );
                        })}
                    </div>
                </div>

                <Image
                    src={project.cover?.url}
                    alt={`Cover photo for ${project.title}`}
                    height={200}
                    width={400}
                    className='rounded-md object-contain max-h-[160px] group-hover:scale-[1.1] ease-in-out duration-500'
                />
            </div>
        </Card>
    );
};
