import Image from 'next/image';
// import logoSrc from '@/app/public/logo.png';
// const logo = ({ width, height }) => (
//     <Image src={logoSrc} width={width} height={height} alt='Logo' />
// ),
import {
    CheckIcon,
    GitHubLogoIcon,
    MoonIcon,
    SunIcon,
} from '@radix-ui/react-icons';
import { Loader, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export const Icons = {
    userImage: ({ width, height, src }) => (
        <Image
            src={src}
            width={width}
            height={height}
            alt='User Profile Image'
            className='rounded-full '
        />
    ),
    check: CheckIcon,
    github: GitHubLogoIcon,
    darkMode: MoonIcon,
    lightMode: SunIcon,
    spinner: Loader,
    calendar: Calendar,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
};
