'use client';

import { SITE_TITLE } from '@/site/config';
import { cc } from '@/utility/css';
import { NavMenu } from './NavMenu';
import { AdminMenu } from './AdminMenu';

export const Nav = () => {
    return (
        <div
            className={cc(
                'flex justify-between w-full',
                'min-h-[4rem]',
                'leading-none'
            )}
        >
            <div
                className={cc(
                    'flex justify-between',
                    'min-h-[4rem]',
                    'leading-none'
                )}
            >
                <NavMenu />
                <AdminMenu />
            </div>
            <div
                className={cc(
                    'flex items-center',
                    'min-h-[4rem]',
                    'leading-none'
                )}
            >
                {SITE_TITLE}
            </div>
        </div>
    );
};
