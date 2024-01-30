'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardFooter, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { projects } from '../../prisma/seed-data/projects';

export const ProjectCard = ({ project }) => {
    const router = useRouter();
    return (
        <Card className='group hover:scale-[1.02]' onClick={() => router.push(`/projects/${project.id}`)}>
            <div className='grid grid-cols-[400px_1fr] w-full max-h-64 justify-self-center gap-2 justify-between p-2 relative'>
                <CardTitle className='flex flex-col gap-2'>
                    <div className='flex justify-start'>
                        <Icons.arrowNavigate className='group-hover:rotate-45 transition-transform' />
                        {project.title}
                    </div>
                    <div className=' justify-between'>
                        {project.tags.map((tag) => {
                            return (
                                <Badge variant='outline' className='w-fit'>
                                    {tag.text}
                                </Badge>
                            );
                        })}
                    </div>
                </CardTitle>
                <Image
                    src={project.cover?.url}
                    alt={`Cover photo for ${project.title}`}
                    height={200}
                    width={400}
                    className='rounded-md object-contain max-h-[160px]'
                />
            </div>
            <CardFooter></CardFooter>
        </Card>
    );
};
