import { ProjectForm } from '@/components/forms/ProjectForm.jsx';
import { getProjectById } from '@/data/project';
import { getAllTags } from '@/data/tag';
import { redirect } from 'next/navigation';

export default async function AdminProjectPage({ params: { projectId } }) {
    const project = await getProjectById(projectId);
    if (!project) redirect('/admin/projects');
    const tags = await getAllTags();
    return <ProjectForm initValues={project} tags={tags} />;
}
