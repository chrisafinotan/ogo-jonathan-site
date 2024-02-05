'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ADMIN_PATHS } from '../site/config';
import { cn } from '@/lib/utils';

export const Sidebar = () => {
    const pathname = usePathname();
    return (
        <div className='p-2'>
            {ADMIN_PATHS.map((component, index) => {
                return (
                    <SidebarItem
                        key={`sidebarLink_${index}`}
                        component={component}
                        pathname={pathname}
                        index={index}
                    />
                );
            })}
        </div>
    );
};

const SidebarItem = ({ component, pathname, index }) => {
    const { description, name: title, path: href } = component;
    return (
        <Link
            className={cn(
                'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors items-center justify-center font-medium ring-offset-background',
                pathname === href
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 pointer-events-none'
                    : 'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
            )}
            href={href}
        >
            <div className='text-sm font-medium leading-none'>{title}</div>
            <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
                {description}
            </p>
        </Link>
    );
};
