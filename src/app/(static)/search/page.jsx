import { CardHeader, CardTitle } from '@/components/ui/card';
import { SearchBar } from '@/components/SearchBar';
import { SearchCard } from '@/components/SearchCard';
import { searchProjects } from '@/data/project';

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }) {
    const { q: query } = searchParams;
    const projects = query ? await searchProjects(query) : [];

    return (
        <div className='relative grid grid-rows-[auto_1fr] max-h-screen h-full w-full items-center m-auto overflow-scroll'>
            <SearchBar
                query={query}
                className='sticky top-0 !pt-12 max-w-4xl place-self-center z-10 bg-background'
            />
            <div className='h-full w-full max-w-4xl place-self-center overflow-scroll'>
                {query && !projects.length && (
                    <CardHeader>
                        <CardTitle>{`No results for ${query}`}</CardTitle>
                    </CardHeader>
                )}
                {projects.length ? (
                    <>
                        <CardHeader className='bg-background z-9 p-4'>
                            <CardTitle className=''>
                                {`${projects.length} results found`}
                            </CardTitle>
                        </CardHeader>
                        <div className='absolute w-full max-w-4xl grid gap-2 m-auto z-2 p-4 pb-12'>
                            {projects.map((project, index) => {
                                return (
                                    <SearchCard
                                        key={`${project.id}_searchResult`}
                                        project={project}
                                        index={index}
                                    />
                                );
                            })}
                        </div>
                    </>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}
