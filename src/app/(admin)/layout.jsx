import { AdminPageContentContainer } from '@/components/PageContentContainer';

export default async function RootLayout({ children }) {
    return <AdminPageContentContainer>{children}</AdminPageContentContainer>;
}
