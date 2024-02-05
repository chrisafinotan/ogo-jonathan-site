'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Icons } from '@/components/icons';

import { Button } from '@/components/ui/button';
import { navItemClass } from './Nav';

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme = 'light', setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    const themes = {
        light: {
            icon: (
                <Icons.lightMode />
            ),
            next: 'dark',
        },
        dark: {
            icon: <Icons.darkMode />,
            next: 'light',
        },
    };
    const nextTheme = themes[theme]?.next || 'light';
    const setNext = () => {
        const n = themes[nextTheme];
        if (n) setTheme(nextTheme);
    };
    return (
        <Button
            className={navItemClass}
            onClick={() => setNext()}
        >
            {themes[theme]?.icon}
        </Button>
    );
}
