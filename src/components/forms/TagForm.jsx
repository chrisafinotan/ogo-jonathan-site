'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { HexColorPicker, HexColorInput } from 'react-colorful';
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
import { TagTypes } from '@/utility/tag-types.js';

const tagTypes = TagTypes;
const tagDefaultValues = {
    text: '',
    description: '',
    type: tagTypes[0],
    color: '#000000',
};
export const TagForm = ({
    initValues = tagDefaultValues,
    editMode = true,
    onSuccess,
}) => {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(TagFormSchema),
        defaultValues: initValues,
    });
    const [color, setColor] = useState(initValues.color);
    const updateColor = (newColor) => {
        form.setValue('color', newColor);
        setColor(newColor);
    };
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
                        {(editMode || !isSaved) && (
                            <FormField
                                control={form.control}
                                name='color'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Color</FormLabel>
                                        <div className=''>
                                            <HexColorInput
                                                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 mb-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                                                onChange={updateColor}
                                                color={color}
                                                {...field}
                                            />
                                            <HexColorPicker
                                                color={color}
                                                onChange={updateColor}
                                            />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        )}

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
                            {isSaved ? (
                                editMode && (
                                    <Button type='submit'>Submit</Button>
                                )
                            ) : (
                                <Button type='submit'>Create</Button>
                            )}
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </Form>
    );
};
