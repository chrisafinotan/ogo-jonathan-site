import { ProjectCard } from '@/components/ProjectCard';
import { SearchBar } from '@/components/SearchBar';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { searchProjects } from '@/data/project';

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }) {
    console.log({ searchParams });
    const { q: query } = searchParams;
    const projects = query ? await searchProjects(query) : [];

    return (
        <div className=' w-[80rem] max-w-[100vw]'>
            <SearchBar />
            {query && !projects.length && (
                <CardHeader>
                    <CardTitle>{`No results for \"{query}\"`}</CardTitle>
                </CardHeader>
            )}
            {projects.length ? (
                <>
                    <CardHeader>
                        <CardTitle>
                            {`${projects.length} results for \"{query}\"`}
                        </CardTitle>
                    </CardHeader>
                    <div className='grid gap-2 max-w-7xl m-6'>
                        {projects.map((project) => {
                            return (
                                <ProjectCard
                                    key={`${project.id}_searchResult`}
                                    project={project}
                                />
                            );
                        })}
                    </div>
                </>
            ) : (
                ''
            )}
        </div>
    );
}
