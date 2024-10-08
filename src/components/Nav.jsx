'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { SITE_EMAIL, INSTAGRAM_LINK } from '@/site/config';
import { keyBy } from 'lodash';
import { SearchBar } from './SearchBar';

export const Nav = ({ isOpen, toggleMenu, pathname, paths }) => {
    const keyedPaths = keyBy(paths, 'path');
    const navItem = keyedPaths[pathname];
    const caption = navItem?.caption || navItem?.name;

    const SearchLink = () => {
        const path = '/search';
        const navItem = keyedPaths[path];
        const caption = navItem.caption || navItem.name;
        function preventNav(e) {
            e.stopPropagation();
        }

        function preventClick(e) {
            if (pathname == path) {
                e.preventDefault();
                preventNav(e);
            }
        }

        return (
            <li
                className='flex justify-between border-t border-b border-primary py-[0.5rem]'
                aria-disabled={pathname == path}
                onClick={preventClick}
            >
                <Link
                    className={cn(pathname == path && 'opacity-20')}
                    href={path}
                >
                    {caption.toUpperCase()}
                </Link>
                <div
                    onClick={preventNav}
                    className='flex-1 max-w-96 mx-4 self-center'
                >
                    <SearchBar
                        className={'flex flex-row-reverse !p-0'}
                        placeholder=''
                    />
                </div>
            </li>
        );
    };

    const NavMenuLink = ({ path, children, className }) => {
        const navItem = keyedPaths[path];
        const caption = navItem.caption || navItem.name;
        function preventClick(e) {
            if (pathname == path) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
        return (
            <li
                className={cn(
                    'border-t border-b border-primary pb-[0.5rem]',
                    className
                )}
                onClick={preventClick}
                aria-disabled={pathname == path}
            >
                {children || (
                    <Link
                        className={cn(pathname == path && 'opacity-20')}
                        href={path}
                    >
                        {caption.toUpperCase()}
                    </Link>
                )}
            </li>
        );
    };

    return (
        <>
            <nav className='pt-2 sm:pt-0 pb-6 sm:pb-0 bottom-0 sm:top-0 w-full h-auto sm:h-0 z-20 fixed bg-background'>
                <div
                    className={cn(
                        'px-2 pt-0 sm:pt-6 sm:px-9 top-0 right-0 flex justify-center sm:grid sm:grid-cols-6 w-full z-10',
                        isOpen ? 'bg-background' : 'bg-transparent'
                    )}
                >
                    <div className='col-start-5 justify-self-end'>
                        {caption}
                    </div>
                    <button
                        onClick={toggleMenu}
                        className='sm:col-start-6 justify-self-end z-10'
                    >
                        {isOpen ? 'CLOSE' : 'MENU'}
                    </button>
                </div>
                <div
                    className={cn(
                        'overflow-hidden bg-background relative z-20',
                        isOpen ? 'h-auto bottom-0' : 'h-0'
                    )}
                >
                    <ul className='relative col-span-12 sm:text-[5rem]/[1] text-[2rem]/[1.1] '>
                        <NavMenuLink path={'/'}>
                            <Link
                                href={'/'}
                                className={cn(
                                    pathname == '/' &&
                                        'pointer-events-none opacity-20'
                                )}
                            >
                                HOME
                            </Link>
                        </NavMenuLink>
                        <NavMenuLink path={'/projects'} />
                        <SearchLink />
                        <NavMenuLink
                            path={'/contact'}
                            className={
                                'flex flex-col sm:flex-row justify-between gap-4'
                            }
                        >
                            <Link
                                href={'/contact'}
                                className={cn(
                                    pathname == '/contact' &&
                                        'pointer-events-none opacity-20'
                                )}
                            >
                                CONTACT
                            </Link>
                            <div className='hidden sm:flex flex-row sm:flex-col gap-4 justify-between items-end text-2xl'>
                                <Link href={`mailto:${SITE_EMAIL}`}>
                                    email: {SITE_EMAIL}
                                </Link>
                                <Link href={INSTAGRAM_LINK} target='_blank'>
                                    instagram: /ogojonathan
                                </Link>
                            </div>
                        </NavMenuLink>
                    </ul>
                </div>
            </nav>
            <div
                className={cn(
                    'bg-white/30 backdrop-blur-3xl backdrop-opacity-90 w-screen absolute top-0 left-0 z-[5]',
                    isOpen ? 'h-screen' : 'h-0 pointer-events-none'
                )}
            ></div>
        </>
    );
};
