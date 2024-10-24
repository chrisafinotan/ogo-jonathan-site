import { getShowcasePhotos } from '@/data/photo';
import { Landing3 } from '@/components/Landing';

export const dynamic = 'force-static';

export default async function Home() {
    const showcasePhotos = await getShowcasePhotos();
    return <Landing3 showcasePhotos={showcasePhotos} />;
}
