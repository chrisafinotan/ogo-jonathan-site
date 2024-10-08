import { AdminPageContentContainer } from '@/components/PageContentContainer';

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }) {
    return <AdminPageContentContainer>{children}</AdminPageContentContainer>;
}
