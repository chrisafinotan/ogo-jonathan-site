import { getProjects } from '@/data/project';
import { ProjectsView } from '@/components/ProjectsView';

export default async function ProjectsPage() {
    const projects = await getProjects();
    return <ProjectsView projects={projects}/>;
}
