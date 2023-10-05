'use client';

import { useRouter } from 'next/navigation';
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

export const TagUploadForm = () => {
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

    const createTags = async (data) => {
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

    const onError = (e) => {
        console.log('error', { e, g: form.getValues() });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className='w-3/6'
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
                                            <SelectItem value={tag}>
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
                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    );
};
