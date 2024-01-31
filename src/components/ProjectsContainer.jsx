'use client';

import { useContext } from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectContext } from '@/site/ProjectsProvider';

export const ProjectsContainer = async () => {
    const projects = useContext(ProjectContext);

    return (
        <div className='grid gap-2 max-w-7xl m-6'>
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
