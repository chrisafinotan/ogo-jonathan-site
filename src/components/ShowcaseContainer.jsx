'use client';

import { ShowcaseOrganizer } from '@/components/ShowcaseOrganizer';
import { ShowcasePhotosSelector } from '@/components/ShowcasePhotosSelector';

export const ShowcaseContainer = async ({ showcasePhotos, allProjects }) => {
    return (
        <div className='w-full max-w-7xl'>
            <ShowcasePhotosSelector
                allProjects={allProjects}
                showcasePhotos={showcasePhotos}
            />
            <ShowcaseOrganizer showcasePhotos={showcasePhotos} />
        </div>
    );
};
