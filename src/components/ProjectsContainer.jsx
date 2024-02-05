'use client';

import { useContext } from 'react';
import { ProjectContext } from '@/site/ProjectsProvider';
import { ProjectCard } from '@/components/ProjectCard';
import { CardTitle } from '@/components/ui/card';

export const ProjectsContainer = async () => {
    const projects = useContext(ProjectContext);

    return (
        <div className='grid gap-2 w-[80rem] max-w-[100vw] box-border p-6'>
            <CardTitle className='flex sm:justify-start justify-center mb-4'>
                {`All Projects (${projects.length})`}
            </CardTitle>
            {projects.map((project) => {
                return (
                    <ProjectCard
                        key={`${project.id}_projectCard`}
                        project={project}
                    />
                );
            })}
        </div>
    );
};
