'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

export const SearchBar = ({ className, query = null, placeholder = 'Search for projects, tags, etc'}) => {
    const [searchText, setSearchText] = useState(query);
    const router = useRouter();
    const { toast } = useToast();

    const onChangeHandler = (e) => {
        e.preventDefault();
        const text = e.target.value;
        text && setSearchText(text.trim());
    };

    const onSearch = (e) => {
        e.preventDefault();
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

    return (
        <form
            onSubmit={(e) => onSearch(e)}
            className={cn(className, 'flex justify-center w-full p-4 gap-2')}
        >
            <Button type='submit'>
                <Icons.search />
            </Button>
            <Input
                placeholder={placeholder}
                className='flex text-zinc-400'
                id='searchBarInput'
                onChange={(e) => onChangeHandler(e)}
                defaultValue={searchText}
            />
        </form>
    );
};
