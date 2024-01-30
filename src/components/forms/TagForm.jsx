'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { TagFormSchema } from '@/lib/validation';
import { createTagData, updateTagData } from './helper';
import { TagType } from '@prisma/client';
const tagTypes = Object.values(TagType);

const tagDefaultValues = {
    text: '',
    description: '',
    type: tagTypes[0],
};
export const TagForm = ({
    initValues = tagDefaultValues,
    showSubmit = true,
    onSuccess,
}) => {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(TagFormSchema),
        defaultValues: initValues,
    });
    const isSaved = form.getValues('id');
    const onSubmit = async (data) => {
        try {
            await (!data.id ? createTagData(data) : updateTagData(data));
            if (onSuccess) onSuccess();
        } catch (error) {
            onError(error);
        }
    };

    const onError = (errors) => console.log({ errors, g: form.getValues() });

    return (
        <Form {...form}>
            <Card className='w-full'>
                <CardHeader>
                    {isSaved ? (
                        <CardTitle>{form.getValues('text')}</CardTitle>
                    ) : (
                        <CardTitle>Create Tag</CardTitle>
                    )}
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={form.handleSubmit(onSubmit, onError)}
                        className='grid gap-4'
                    >
                        <FormField
                            control={form.control}
                            name='text'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tag</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='i.e sponsored'
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
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='please enter short tag description'
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
                            name='type'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select a type for the tag' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {tagTypes.map((tag) => {
                                                return (
                                                    <SelectItem
                                                        key={`${tag}_id`}
                                                        value={tag}
                                                    >
                                                        {tag}
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {showSubmit && (
                            <CardFooter className='flex justify-center'>
                                <Button type='submit'>Submit</Button>
                            </CardFooter>
                        )}
                    </form>
                </CardContent>
            </Card>
        </Form>
    );
};
