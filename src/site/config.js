export const SITE_TITLE = 'Ogo Jonathan';

export const SITE_EMAIL = 'ogojonathanp@gmail.com';
export const INSTAGRAM_LINK = 'https://www.instagram.com/ogojonathan/';

export const ACCEPTED_PHOTO_FILE_TYPES = [
    'image/jpg',
    'image/jpeg',
    'image/png',
];

export const PATHS = [
    { path: '/', name: '' },
    { path: '/projects', name: 'Projects' },
    { path: '/search', name: 'Search' },
    { path: '/contact', name: 'Contact' },
];

const PREFIX_ADMIN = '/admin';
export const ADMIN_PATHS = [
    { caption: 'Home (Admin)', path: `${PREFIX_ADMIN}/home`, name: 'Home' },
    {
        caption: 'Projects (Admin)',
        path: `${PREFIX_ADMIN}/projects`,
        name: 'Projects',
    },
    { caption: 'Tags (Admin)', path: `${PREFIX_ADMIN}/tags`, name: 'Tags' },
].map((el) => {
    el.isAdmin = true;
    return el;
});
