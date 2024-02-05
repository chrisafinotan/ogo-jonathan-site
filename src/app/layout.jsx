import ThemeProviderClient from '@/site/ThemeProvider';
import NextUIProviderClient from '@/site/NextUIProvider';
import ProjectsProviderClient from '@/site/ProjectsProvider';
import FirebaseAuthProviderClient from '@/site/FirebaseAuthProvider';
import BreakpointProviderClient from '@/site/BreakPointProvider';
import { Inter } from 'next/font/google';
import { Nav } from '@/components/Nav';
import { getPublishedProjects } from '@/data/project';
import { Toaster } from '@/components/ui/toaster';
import '../site/globals.css';

const inter = Inter({ subsets: ['latin'] });
export const metadata = {
    title: 'Ogo Jonathan',
    description: 'Photo App',
};
export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }) {
    const projects = await getPublishedProjects();

    return (
        <html className>
            <body
                className={`${inter.className} pb-20`}
                suppressHydrationWarning={true}
            >
                <NextUIProviderClient>
                    <ThemeProviderClient>
                        <BreakpointProviderClient>
                            <main className>
                                <FirebaseAuthProviderClient>
                                    <ProjectsProviderClient value={projects}>
                                        <Nav />
                                        {children}
                                        <Toaster />
                                    </ProjectsProviderClient>
                                </FirebaseAuthProviderClient>
                            </main>
                        </BreakpointProviderClient>
                    </ThemeProviderClient>
                </NextUIProviderClient>
            </body>
        </html>
    );
}
