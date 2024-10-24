import { AdminProjectsContainer } from '@/components/AdminProjectsContainer';
import { getAllProjects } from '@/data/project';

// export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
    const projects = await getAllProjects();
    return <AdminProjectsContainer projects={projects} />;
}
