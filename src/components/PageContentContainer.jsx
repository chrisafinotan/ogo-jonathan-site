'use client';

import { useState, useEffect } from 'react';
import { HeaderNav } from './HeaderNav';
import { Nav } from './Nav';
import { SocialsBar } from './SocialsBar';
import { Sidebar } from './Sidebar';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn, isProjectPage } from '@/lib/utils';
import { ADMIN_PATHS, PATHS } from '@/site/config';

export function PageContentContainer({ children }) {
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => setOpen(!isOpen);
    const closeMenu = () => setOpen(false);
    useEffect(() => {
        console.log('path change', pathname, searchParams);
        closeMenu();
    }, [pathname, searchParams]);

    return (
        <div
            className={cn(
                'flex flex-col top-0 left-0 fixed sm:relative h-full w-full text-xs font-bold',
                isProjectPage(pathname)
                    ? 'overflow-scroll'
                    : 'overflow-auto sm:overflow-visible',
                isOpen && 'overflow-hidden'
            )}
        >
            <div className='flex flex-1'>
                <div className='flex flex-col flex-1'>
                    <main
                        className='flex-1 relative'
                        onClick={() => isOpen && closeMenu()}
                    >
                        <HeaderNav
                            isOpen={isOpen}
                            toggleMenu={toggleMenu}
                            closeMenu={closeMenu}
                            pathname={pathname}
                            paths={PATHS}
                        />
                        {children}
                    </main>
                    {isProjectPage(pathname) && (
                        <SocialsBar className='hidden sm:flex justify-between mt-4 pt-28 pb-6 px-6' />
                    )}
                </div>
            </div>
        </div>
    );
}

export function AdminPageContentContainer({ children }) {
    const paths = PATHS.concat(ADMIN_PATHS);
    const pathname = usePathname();

    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => setOpen(!isOpen);
    const closeMenu = () => setOpen(false);
    useEffect(closeMenu, [pathname]);

    return (
        <div
            className={cn(
                'flex flex-col top-0 left-0 fixed sm:relative h-full w-full text-xs font-bold',
                isProjectPage(pathname)
                    ? 'overflow-scroll'
                    : 'overflow-auto sm:overflow-visible'
            )}
        >
            <div className='flex flex-1'>
                <div className='flex flex-col flex-1'>
                    <main
                        className='flex-1'
                        onClick={() => isOpen && closeMenu()}
                    >
                        <Nav
                            isOpen={isOpen}
                            toggleMenu={toggleMenu}
                            closeMenu={closeMenu}
                            pathname={pathname}
                            paths={paths}
                        />
                        <div className='min-h-[30rem] grid grid-cols-[150px_1fr] mt-12 h-full relative'>
                            <Sidebar paths={paths} />
                            <div className='h-screen overflow-scroll p-2 pb-20 justify-items-center'>
                                {children}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
