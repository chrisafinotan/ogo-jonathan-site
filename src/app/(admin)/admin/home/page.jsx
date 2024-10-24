import { ShowcaseContainer } from '@/components/ShowcaseContainer';
import { getShowcasePhotos } from '@/data/photo';
import { getAllProjects } from '@/data/project';

// export const dynamic = 'force-dynamic';

export default async function Showcase() {
    const showcasePhotos = await getShowcasePhotos();
    const allProjects = await getAllProjects();
    return (
        <ShowcaseContainer
            showcasePhotos={showcasePhotos}
            allProjects={allProjects}
        />
    );
}
