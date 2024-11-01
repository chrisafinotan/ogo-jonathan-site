import { ProjectView } from '@/components/ProjectView';
import { getAllProjects } from '@/data/project';
import { getProject, getAdjacentProjects } from '@/lib/utils';
import { redirect } from 'next/navigation';

export default async function ProjectPage({ params: { projectId } }) {
    const projects = await getAllProjects();
    const project = projects.find((project) => project.id === projectId)
    const { projectIndex } = getProject(projectId, projects) || {};
    if (!project) redirect('/');
    const [previous, next] = getAdjacentProjects(projectIndex, projects);
    return <ProjectView project={project} previous={previous} next={next} />;
}
