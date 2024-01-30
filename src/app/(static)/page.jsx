import Link from 'next/link';
import { getShowcasePhotos, getProjectUrl } from '@/data/photo';
import { PhotoContainer } from '@/components/PhotoContainer';

export default async function Home() {
    const showcasePhotos = await getShowcasePhotos();
    return (
        <div className='grid grid-cols-2 gap-1 p-2'>
            {showcasePhotos.map((photo) => {
                const { id, url, title, projectId } = photo;
                return (
                    <div key={`showcase_${id}`}>
                        {projectId && (
                            <Link href={getProjectUrl(projectId)}>
                                <PhotoContainer
                                    url={url}
                                    alt={`Showcase photo. Title: ${title}`}
                                ></PhotoContainer>
                            </Link>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
