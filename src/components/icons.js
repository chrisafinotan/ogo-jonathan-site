import Image from 'next/image';
import {
    CheckIcon,
    GitHubLogoIcon,
    MoonIcon,
    StopIcon,
    SunIcon,
} from '@radix-ui/react-icons';
import {
    ArrowUpRight,
    AlertCircle,
    AlertTriangle,
    Calendar,
    Camera,
    ChevronLeft,
    ChevronRight,
    Circle,
    ImageOff,
    HelpCircle,
    Home,
    Loader,
    MoveRight,
    MoveLeft,
    Pencil,
    Play,
    Plus,
    Save,
    Search,
    Sparkles,
    Trash2,
    UserIcon,
    X,
} from 'lucide-react';

export const Icons = {
    about: UserIcon,
    alert: AlertTriangle,
    arrow: MoveRight,
    arrowLeft: MoveLeft,
    arrowNavigate: ArrowUpRight,
    calendar: Calendar,
    camera: Camera,
    cancel: X,
    check: CheckIcon,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    darkMode: MoonIcon,
    delete: Trash2,
    dot: Circle,
    edit: Pencil,
    github: GitHubLogoIcon,
    home: Home,
    lightMode: SunIcon,
    missingPhoto: ImageOff,
    optional: HelpCircle,
    play: Play,
    plus: Plus,
    publish: Sparkles,
    required: AlertCircle,
    save: Save,
    search: Search,
    spinner: Loader,
    stop: StopIcon,
    userImage: ({ width, height, src }) => (
        <Image
            src={src}
            width={width}
            height={height}
            alt='User Profile Image'
            className='rounded-full '
        />
    ),
};
