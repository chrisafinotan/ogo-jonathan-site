import ThemeProviderClient from '@/site/ThemeProvider';
import NextUIProviderClient from '@/site/NextUIProvider';
import ProjectsProviderClient from '@/site/ProjectsProvider';
import FirebaseAuthProviderClient from '@/site/FirebaseAuthProvider';
import { Inter } from 'next/font/google';
import { Nav } from '@/components/Nav';
import { getAllProjects } from '@/data/project';
import '../site/globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });
// export const dynamic = 'force-dynamic';
export const metadata = {
    title: 'Ogo Jonathan',
    description: 'Photo App',
};

export default async function RootLayout({ children }) {
    const projects = await getAllProjects();

    return (
        <html>
            <body
                className={`${inter.className} light`}
                suppressHydrationWarning={true}
            >
                <NextUIProviderClient>
                    {/* <ThemeProviderClient> */}
                    <FirebaseAuthProviderClient>
                        <ProjectsProviderClient value={projects}>
                            <main>
                                <Nav />
                                {children}
                                <Toaster />
                            </main>
                        </ProjectsProviderClient>
                    </FirebaseAuthProviderClient>
                    {/* </ThemeProviderClient> */}
                </NextUIProviderClient>
            </body>
        </html>
    );
}
