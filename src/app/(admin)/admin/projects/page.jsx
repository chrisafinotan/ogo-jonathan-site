import { AdminProjectsContainer } from '@/components/AdminProjectsContainer';
import { getAllProjects } from '@/data/project';

export default async function AdminProjectsPage() {
    const projects = await getAllProjects();
    return <AdminProjectsContainer projects={projects} />;
}
