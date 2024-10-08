import { getShowcasePhotos } from '@/data/photo';
import { Landing } from '@/components/Landing';

export const dynamic = 'force-dynamic';

export default async function Home() {
    const showcasePhotos = await getShowcasePhotos();
    return <Landing showcasePhotos={showcasePhotos} />;
}
