import { ProjectView } from '@/components/ProjectView';

export default async function ProjectPage({ params: { projectId } }) {
    return <ProjectView projectId={projectId} />;
}
