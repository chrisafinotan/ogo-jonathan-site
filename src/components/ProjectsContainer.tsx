import Link from 'next/link';
import { getAllProjects } from '@/data/project';

export const ProjectsContainer = async () => {
    const projects = await getAllProjects();
    return (
        <div>
            {projects.map(({ id, title }) => {
                return (
                    <div>
                        <Link key={id} href={`/admin/projects/${id}`}>
                            {title}
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};
