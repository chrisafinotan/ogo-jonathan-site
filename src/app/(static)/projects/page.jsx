import { getAllProjects } from '@/data/project';
import { ProjectsView } from '@/components/ProjectsView';

export default async function ProjectsPage() {
    const projects = await getAllProjects();
    return <ProjectsView projects={projects}/>;
}
