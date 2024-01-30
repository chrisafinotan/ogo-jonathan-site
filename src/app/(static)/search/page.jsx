import { ProjectCard } from '@/components/ProjectCard';
import { SearchBar } from '@/components/SearchBar';
import { searchProjects } from '@/data/project';
export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }) {
    const query = searchParams.q || null;
    const projects = query ? await searchProjects(query) : [];

    return (
        <div>
            <SearchBar />
            {projects.length ? (
                <div className='grid gap-2 max-w-7xl border-2 m-6'>
                    {projects.map((project) => {
                        return <ProjectCard project={project} />;
                    })}
                </div>
            ) : (
                ''
            )}
        </div>
    );
}
