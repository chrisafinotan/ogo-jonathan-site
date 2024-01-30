'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export const SearchBar = () => {
    const [searchText, setSearchText] = useState(null);
    const router = useRouter();

    const onChangeHandler = (e) => {
        e.preventDefault();
        setSearchText(e.target.value);
    };

    const onSearch = (e) => {
        e.preventDefault();
        const encodedSearchQuery = encodeURIComponent(searchText);
        const searchUrl = `/search?q=${encodedSearchQuery}`;
        router.push(searchUrl);
    };

    return (
        <form onSubmit={(e) => onSearch(e)} className='flex w-full p-4 gap-2'>
             <Button type='submit'>
                <Icons.search />
            </Button>
            <Input
                placeholder='Search for projects, tags, etc'
                className='flex text-zinc-400'
                id='searchBarInput'
                onChange={(e) => onChangeHandler(e)}
            />
           
        </form>
    );
};

// import * as React from 'react';
// import {
//     CalendarIcon,
//     EnvelopeClosedIcon,
//     FaceIcon,
//     GearIcon,
//     PersonIcon,
//     RocketIcon,
// } from '@radix-ui/react-icons';

// import {
//     CommandDialog,
//     CommandEmpty,
//     CommandGroup,
//     CommandInput,
//     CommandItem,
//     CommandList,
//     CommandSeparator,
//     CommandShortcut,
// } from '@/components/ui/command';

// export function CommandDialogDemo() {
//     const [open, setOpen] = React.useState(false);

//     React.useEffect(() => {
//         const down = (e) => {
//             if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
//                 e.preventDefault();
//                 setOpen((open) => !open);
//             }
//         };

//         document.addEventListener('keydown', down);
//         return () => document.removeEventListener('keydown', down);
//     }, []);

//     return (
//         <>
//             <p className='text-sm text-muted-foreground'>
//                 Press{' '}
//                 <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
//                     <span className='text-xs'>⌘</span>J
//                 </kbd>
//             </p>
//             <CommandDialog open={open} onOpenChange={setOpen}>
//                 <CommandInput placeholder='Type a command or search...' />
//                 <CommandList>
//                     <CommandEmpty>No results found.</CommandEmpty>
//                     <CommandGroup heading='Suggestions'>
//                         <CommandItem>
//                             <CalendarIcon className='mr-2 h-4 w-4' />
//                             <span>Calendar</span>
//                         </CommandItem>
//                         <CommandItem>
//                             <FaceIcon className='mr-2 h-4 w-4' />
//                             <span>Search Emoji</span>
//                         </CommandItem>
//                         <CommandItem>
//                             <RocketIcon className='mr-2 h-4 w-4' />
//                             <span>Launch</span>
//                         </CommandItem>
//                     </CommandGroup>
//                     <CommandSeparator />
//                 </CommandList>
//             </CommandDialog>
//         </>
//     );
// }
