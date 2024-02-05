'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { navItemClass } from './Nav';

export const SearchButton = () => {
    const router = useRouter();
    const [isOpen, setOpen] = useState(false);
    const { toast } = useToast();
    const [searchText, setSearchText] = useState(null);

    const onChangeHandler = (e) => {
        e.preventDefault();
        const text = e.target.value;
        text && setSearchText(text.trim());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpen(false);
        if (!searchText || searchText.length < 3) {
            toast({
                title: 'Search text is too short',
            });
            return;
        }
        const encodedSearchQuery = encodeURIComponent(searchText);
        const searchUrl = `/search?q=${encodedSearchQuery}`;
        router.push(searchUrl);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSubmit(e);
    };
    return (
        <Popover open={isOpen} onOpenChange={setOpen}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild={true}>
                        <PopoverTrigger asChild={true}>
                            <Button className={navItemClass}>
                                <Icons.search />
                            </Button>
                        </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p> Search</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <PopoverContent className='!w-[100vw] my-4 p-1 border-none shadow-none bg-transparent'>
                <div className='flex justify-center'>
                    <div className='max-w-[80vw] w-[32rem] flex gap-2 justify-center'>
                        <Button
                            onClick={(e) => handleSubmit(e)}
                            className='!border-hidden'
                        >
                            <Icons.search />
                        </Button>
                        <Input
                            type='text'
                            placeholder={'Search for projects, tags, etc'}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => onChangeHandler(e)}
                            tabIndex={0}
                            autoFocus={true}
                        />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};
