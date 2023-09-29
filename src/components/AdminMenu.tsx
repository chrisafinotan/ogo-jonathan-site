import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { ListItem } from './NavMenu';

const components: { title: string; href: string; description: string }[] = [
    {
        title: 'Home',
        href: '/admin/',
        description:
            'A modal dialog that interrupts the user with important content and expects a response.',
    },
    {
        title: 'Manage Projects',
        href: '/admin/projects',
        description:
            'For sighted users to preview content available behind a link.',
    },
];

export const AdminMenu = () => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <span className='h-6 w-6'>Admin</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};
