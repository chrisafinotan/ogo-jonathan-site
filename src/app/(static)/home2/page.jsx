import { getShowcasePhotos } from '@/data/photo';
import { Landing2 } from '@/components/Landing';

export default async function Home() {
    const showcasePhotos = await getShowcasePhotos();
    return <Landing2 showcasePhotos={showcasePhotos} />;
}
