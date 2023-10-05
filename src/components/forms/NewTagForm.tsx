'use client';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
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
import { TagFormSchema, TagFormShape } from '@/lib/validation';
import { createTagAction } from '@/data/actions';
import { TagType } from '@prisma/client';

export const NewTagForm = () => {
    const tagTypes = Object.values(TagType);
    const router = useRouter();
    const form = useForm<TagFormShape>({
        resolver: zodResolver(TagFormSchema),
        defaultValues: {
            text: '',
            description: '',
            type: tagTypes[0],
        },
    });

    const createTags = async (data: TagFormShape) => {
        try {
            await createTagAction(data);
        } catch (error) {
            console.log(`Tag Upload ${error}`);
        }
    };

    const onSubmit: SubmitHandler<TagFormShape> = async (
        data: TagFormShape
    ) => {
        await createTags(data);
        router.refresh();
    };

    const onError: SubmitErrorHandler<object> = (errors: object) => {
        console.log('error', { errors, g: form.getValues() });
    };

    return (
        <Form {...form}>
            <Card className='w-2/3'>
                <CardHeader>
                    <CardTitle>Create Tag</CardTitle>
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
                        <CardFooter className='flex justify-center'>
                            <Button type='submit'>Submit</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </Form>
    );
};
