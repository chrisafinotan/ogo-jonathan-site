import { Inter } from 'next/font/google';
import ThemeProviderClient from '@/site/ThemeProvider';
// import NextUIProviderClient from '@/site/NextUIProvider';
import ProjectsProviderClient from '@/site/ProjectsProvider';
import FirebaseAuthProviderClient from '@/site/FirebaseAuthProvider';
import BreakpointProviderClient from '@/site/BreakPointProvider';
import { getPublishedProjects, getAllProjects } from '@/data/project';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import '../site/globals.css';

const inter = Inter({ subsets: ['latin'] });
export const metadata = {
    title: 'Ogo Jonathan',
    description: 'Photo App',
};
export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }) {
    const siteMode = process.env.NODE_ENV;
    const projects =
        siteMode === 'production'
            ? await getPublishedProjects()
            : await getAllProjects();
    return (
        <html>
            <body
                className={cn(
                    inter.className,
                    'fixed overflow-hidden h-full w-full flex flex-col'
                )}
                suppressHydrationWarning={true}
            >
                <ThemeProviderClient>
                    <BreakpointProviderClient>
                        <FirebaseAuthProviderClient>
                            <ProjectsProviderClient value={projects}>
                                {children}
                                <Toaster />
                            </ProjectsProviderClient>
                        </FirebaseAuthProviderClient>
                    </BreakpointProviderClient>
                </ThemeProviderClient>
            </body>
        </html>
    );
}
