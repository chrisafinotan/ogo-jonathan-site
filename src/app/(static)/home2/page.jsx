import { getShowcasePhotos } from '@/data/photo';
import { Landing3 } from '@/components/Landing';

export const dynamic = 'force-dynamic';

export default async function Home() {
    const showcasePhotos = await getShowcasePhotos();
    return <Landing3 showcasePhotos={showcasePhotos} />;
}
