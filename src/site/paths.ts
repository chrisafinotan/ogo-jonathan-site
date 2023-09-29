const PREFIX_ADMIN = '/admin';

export const isPathProtected = (pathname = '') => {
    pathname.startsWith(PREFIX_ADMIN) || pathname === '/checklist';
};
