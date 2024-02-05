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
import { SearchButton } from './SearchButton';
import { AboutButton } from './AboutButton';
import { ThemeToggle } from '@/components/ThemeToggle';

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
];

const admincomponents = [
    {
        title: 'Admin',
        href: '/admin/home',
        className: 'hover:scale-110',
    },
];

export const navItemClass =
    'block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-all hover:scale-[1.2] bg-transparent hover:bg-accent hover:text-accent-foreground focus:border-primary focus:border-2 shrink text-inherit';
const c2 =
    'bg-transparent block select-none space-y-1 rounded-md p-2 text-inherit leading-none no-underline outline-none transition-all hover:scale-[1.2] hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground';
const NavLink = ({ className, title, icon, children, ...props }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild={true}>
                    <Link className={cn(navItemClass, className)} {...props}>
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
            {components.map((component, index) => {
                return (
                    <NavLink
                        key={`${index}_${component.title}_navMenuListItem`}
                        icon={component.icon}
                        title={component.title}
                        href={component.href}
                    >
                        {component.description}
                    </NavLink>
                );
            })}
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
            <div className='flex justify-end self-center items-center'>
                <div className='flex'>
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
        <div className='z-50 flex w-full max-w-[100svw] justify-center fixed bottom-2 bg-transparent'>
            <NavigationMenu className='transition-all self-center flex justify-center h-full w-max min-h-[4rem]  max-h-[4rem] leading-none bg-background rounded-md p-2 border-primary border-2'>
                <NavMenu components={components} />
                <SearchButton />
                {isProjectPage && <ProjectNav />}
                <AboutButton />
                <ThemeToggle />
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
