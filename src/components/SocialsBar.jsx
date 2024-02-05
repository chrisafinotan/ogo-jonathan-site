'use client';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Icons } from '@/components/icons';
import { SITE_EMAIL, INSTAGRAM_LINK } from '@/site/config';
import { cn } from '@/lib/utils';

const socialLinks = [
    {
        title: 'Instagram',
        href: INSTAGRAM_LINK,
        icon: <Icons.insta />,
    },
    {
        title: 'Mail',
        email: true,
    },
];

const Mailto = ({ subject = '', body = '' }) => {
    let params = subject || body ? '?' : '';
    if (subject) params += `subject=${encodeURIComponent(subject)}`;
    if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;

    return (
        <TooltipTrigger asChild={true}>
            <a href={`mailto:${SITE_EMAIL}${params}`}>
                <Icons.mail />
            </a>
        </TooltipTrigger>
    );
};

export const SocialsBar = ({ className }) => {
    return (
        <div className={(cn('flex gap-2 justify-center w-full', className))}>
            {socialLinks.map(({ href, icon, title, email }, index) => {
                return (
                    <TooltipProvider key={`${index}_socialsLink`}>
                        <Tooltip>
                            {email ? (
                                <Mailto />
                            ) : (
                                <TooltipTrigger asChild={true}>
                                    <a href={href} target='_blank'>
                                        {icon}
                                    </a>
                                </TooltipTrigger>
                            )}
                            <TooltipContent>
                                <p> {title}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                );
            })}
        </div>
    );
};
