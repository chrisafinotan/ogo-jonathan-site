import Link from 'next/link';
import { getShowcasePhotos, getProjectUrl } from '@/data/photo';
import { PhotoContainer } from '@/components/PhotoContainer';


export default async function Home() {
    const showcasePhotos = await getShowcasePhotos();
    console.log({ showcasePhotos });

    return (
        <div>
            SHOWCASE
            {showcasePhotos.map((photo) => {
                const { id, url, blurData, takenAt, title, projectId } = photo;
                return (
                    <div key={id}>
                        <PhotoContainer
                            url={url}
                            alt={`show cased photo. Title: ${title}`}
                        >
                            {projectId ? (
                                <Link href={getProjectUrl(projectId)}></Link>
                            ) : (
                                ''
                            )}
                        </PhotoContainer>
                    </div>
                );
            })}
        </div>
    );
}
