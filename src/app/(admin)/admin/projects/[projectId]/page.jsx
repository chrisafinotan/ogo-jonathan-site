import { ProjectForm } from '@/components/forms/ProjectForm.jsx';
import { getProjectById } from '@/data/project';
import { getAllTags } from '@/data/tag';

export default async function AdminProjectPage({ params: { projectId } }) {
    const project = (await getProjectById(projectId)) || undefined;
    const tags = await getAllTags();
    return <ProjectForm initValues={project} tags={tags} />;
}
