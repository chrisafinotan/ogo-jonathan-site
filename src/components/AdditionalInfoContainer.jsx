'use client';

import { Controller } from 'react-hook-form';
import { Icons } from './icons';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const AdditionalInfoContainer = ({
    control,
    index,
    field,
    deleteItem,
    readMode,
}) => {
    return (
        <div key={field.id} className='m-2 flex'>
            <Controller
                disabled={readMode}
                control={control}
                name={`additionalInfoFields.${index}.key`}
                render={({ field }) => {
                    return <Input placeholder='Camera' {...field}></Input>;
                }}
            />
            <Icons.arrow className='h-auto w-16' />
            <Controller
                disabled={readMode}
                name={`additionalInfoFields.${index}.value`}
                render={({ field }) => {
                    return <Input placeholder='Sony A7' {...field}></Input>;
                }}
            />
            <Button
                variant='destructive'
                onClick={() => deleteItem && deleteItem(index)}
                className='col-start-2 h-auto w-16'
                disabled={readMode}
            >
                <Icons.delete />
            </Button>
        </div>
    );
};
