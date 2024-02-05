import { AdminPageContentContainer } from '@/components/PageContentContainer';
import { Sidebar } from '@/components/Sidebar';

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }) {
    return (
        <AdminPageContentContainer>
            <Sidebar />
            <div className='h-screen overflow-scroll p-2 pb-20 justify-items-center'>{children}</div>
        </AdminPageContentContainer>
    );
}
