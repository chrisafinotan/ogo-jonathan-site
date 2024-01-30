'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const LoginFormSchema = z.object({
    email: z.string().min(2, {
        message: 'email must be at least 2 characters.',
    }),
    password: z.string().min(2, {
        message: 'password must be at least 2 characters.',
    }),
});
type LoginFormShape = z.infer<typeof LoginFormSchema>;

export const LoginForm = () => {
    const [isSigningIn, setIsSigningIn] = useState(false);

    const form = useForm<LoginFormShape>({
        resolver: zodResolver(LoginFormSchema),
    });

    const onSubmit: SubmitHandler<LoginFormShape> = (data: LoginFormShape) => {
        console.log({ data });
        const { email, password } = data;
        setIsSigningIn(true);
        signIn('credentials', {
            email,
            password,
            callbackUrl: '/admin',
        }).catch(() => setIsSigningIn(false));
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='example@domain.com'
                                    type='email'
                                    required={true}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='example@domain.com'
                                    type='password'
                                    required={true}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    );
};
