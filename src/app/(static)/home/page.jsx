import { getShowcasePhotos } from '@/data/photo';
import { Landing } from '@/components/Landing';

export default async function Home() {
    const showcasePhotos = await getShowcasePhotos();
    return <Landing showcasePhotos={showcasePhotos} />;
}
