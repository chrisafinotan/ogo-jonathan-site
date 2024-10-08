'use client';

import { loginUser } from '@/components/forms/helper';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const form = useForm({});
    const { toast } = useToast();
    const router = useRouter();

    async function onSubmit(data) {
        try {
            const loginResult = await loginUser(data);
            if (loginResult.error) {
                toast({
                    title: loginResult.error.message,
                });
            } else {
                router.push('/admin');
            }
        } catch (error) {
            onError(error);
        }
    }

    const onError = (errors) => {
        console.log('error', { errors });
    };

    return (
        <div className='pt-12 w-full max-w-[80rem] flex flex-col items-center justify-center m-auto'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit, onError)}
                    className='grid gap-2 w-96'
                >
                    <FormField
                        name='username'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder='username'
                                        required={true}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name='password'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type='password'
                                        placeholder='password'
                                        required={true}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit'>Login</Button>
                </form>
            </Form>
        </div>
    );
}
