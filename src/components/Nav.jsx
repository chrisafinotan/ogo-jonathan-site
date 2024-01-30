'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { FirebaseAuthContext } from '@/site/FirebaseAuthProvider';
import { ProjectContext } from '@/site/ProjectsProvider';
import { Icons } from '@/components/icons';
import { NavigationMenu } from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn, getProject, getAdjacentProjects } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const components = [
    {
        title: 'Home',
        href: '/',
        icon: <Icons.home />,
    },
    {
        title: 'Projects',
        href: '/projects',
        icon: <Icons.camera />,
    },
    {
        title: 'Search',
        href: '/search',
        icon: <Icons.search />,
    },
    {
        title: 'About',
        href: '/about',
        icon: <Icons.about />,
    },
];

const admincomponents = [
    {
        title: 'Admin',
        href: '/admin/home',
        className: 'hover:scale-110',
    },
];

const NavLink = ({ className, title, icon, children, ...props }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild={true}>
                    <Link
                        className={cn(
                            'block select-none space-y-1 rounded-md p-2 mx-2 leading-none no-underline outline-none transition-all hover:scale-[1.2] hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                            className
                        )}
                        {...props}
                    >
                        <div className='text-sm font-medium leading-none gap-2 items-center flex align-baseline'>
                            {icon || title}
                        </div>
                    </Link>
                </TooltipTrigger>
                {icon && (
                    <TooltipContent>
                        <p> {title}</p>
                        {children}
                    </TooltipContent>
                )}
            </Tooltip>
        </TooltipProvider>
    );
};

const NavMenu = ({ components }) => {
    return (
        <>
            {components.map((component, index) => (
                <NavLink
                    key={`${index}_${component.title}_navMenuListItem`}
                    icon={component.icon}
                    title={component.title}
                    href={component.href}
                >
                    {component.description}
                </NavLink>
            ))}
        </>
    );
};

export const Nav = () => {
    const user = useContext(FirebaseAuthContext);
    const projects = useContext(ProjectContext);
    const pathname = usePathname();
    const isProjectPage = pathname.includes('/projects/');
    const paths = pathname.split('/');
    const projectId = paths[paths.length - 1];
    const { projectIndex } = getProject(projectId, projects);
    const [previous, next] = getAdjacentProjects(projectIndex, projects);
    const basePath = paths.slice(0, -1).join('/');

    const ProjectNav = () => {
        return (
            <div className='w-full flex justify-end self-center items-center gap-4 p-2'>
                <div className='flex gap-2'>
                    {previous?.id && (
                        <NavLink
                            href={`${basePath}/${previous.id}`}
                            className='group flex justify-center items-center'
                            icon={
                                <Icons.arrowLeft className='group-hover:rotate-45 transition-transform' />
                            }
                            title={`Previous: "${previous.title}"`}
                        ></NavLink>
                    )}
                    {next?.id && (
                        <NavLink
                            href={`${basePath}/${next.id}`}
                            className='group flex justify-center items-center'
                            icon={
                                <Icons.arrow className='group-hover:-rotate-45 transition-transform' />
                            }
                            title={`Next: "${next.title}"`}
                        ></NavLink>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className='z-50 flex w-full justify-center fixed bottom-2'>
            <NavigationMenu className='transition-all self-center flex justify-center h-full min-h-[4rem] max-h-[4rem] leading-none  bg-primary-600 bg-blend-color-dodge mix-blend-color-dodge text-primary-foreground rounded-md p-2'>
                <NavMenu components={components} />
                {isProjectPage && (
                    <>
                        <Separator
                            orientation='vertical'
                            className='w-1 h-10 shrink bg-red-600'
                        />
                        <ProjectNav />
                    </>
                )}
                {user && (
                    <>
                        <Separator
                            orientation='vertical'
                            className='w-1 h-10 shrink bg-red-600'
                        />
                        <NavMenu components={admincomponents} />
                    </>
                )}
            </NavigationMenu>
        </div>
    );
};
