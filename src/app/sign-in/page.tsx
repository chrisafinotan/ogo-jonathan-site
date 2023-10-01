import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { LoginForm } from '@/auth/LoginForm';
import { cc } from '@/utility/css';

export default async function SignInPage() {
    const session = await getServerSession();

    if (session?.user) {
        redirect('/');
    }

    return (
        <div
            className={cc(
                'fixed top-0 left-0 right-0 bottom-0',
                'flex items-center justify-center flex-col gap-8'
            )}
        >
            <LoginForm />
        </div>
    );
}
