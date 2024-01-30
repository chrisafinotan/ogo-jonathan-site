import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {PageContentContainer} from '@/components/PageContentContainer';

export default async function RootLayout({ children }) {
    return <PageContentContainer>{children}</PageContentContainer>;
}
