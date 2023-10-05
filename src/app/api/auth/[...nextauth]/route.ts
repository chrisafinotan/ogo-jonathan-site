import { isPathProtected } from '@/site/paths';
import NextAuth, {
    User,
    type DefaultSession,
    type AuthOptions,
} from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
        } & DefaultSession['user'];
    }
}

export const authOptions: AuthOptions = {
    providers: [
        Credentials({
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize({ email, password }) {
                if (
                    process.env.ADMIN_EMAIL &&
                    process.env.ADMIN_EMAIL === email &&
                    process.env.ADMIN_PASSWORD &&
                    process.env.ADMIN_PASSWORD === password
                ) {
                    const user: User = { id: '1', email, name: 'Admin User' };
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        authorized({ auth, request }) {
            const { pathname } = request.nextUrl;

            const isUrlProtected = isPathProtected(pathname);
            const isUserLoggedIn = !!auth?.user;
            const isRequestAuthorized = !isUrlProtected || isUserLoggedIn;

            return isRequestAuthorized;
        },
    },
    pages: {
        signIn: '/sign-in',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export const generateAuthSecret = () =>
    fetch('https://generate-secret.vercel.app/32', { cache: 'no-cache' }).then(
        (res) => res.text()
    );
