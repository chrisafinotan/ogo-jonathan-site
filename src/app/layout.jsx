import { Inter } from 'next/font/google';
import ThemeProviderClient from '@/site/ThemeProvider';
import FirebaseAuthProviderClient from '@/site/FirebaseAuthProvider';
import BreakpointProviderClient from '@/site/BreakPointProvider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import '../site/globals.css';

const inter = Inter({ subsets: ['latin'] });
export const metadata = {
    title: 'Ogo Jonathan',
    description: 'Photo App',
};
export const dynamic = 'force-dynamic'

export default async function RootLayout({ children }) {
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
                            {children}
                            <Toaster />
                        </FirebaseAuthProviderClient>
                    </BreakpointProviderClient>
                </ThemeProviderClient>
            </body>
        </html>
    );
}
