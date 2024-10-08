'use client';

import { cn, isProjectPage } from '@/lib/utils';
import { Nav } from './Nav';

export const HeaderNav = ({
    isOpen,
    toggleMenu,
    closeMenu,
    pathname,
    paths,
}) => {
    return (
        <header className={cn(isProjectPage(pathname) && 'relative')}>
            <Nav
                isOpen={isOpen}
                toggleMenu={toggleMenu}
                closeMenu={closeMenu}
                pathname={pathname}
                paths={paths}
            />
        </header>
    );
};
