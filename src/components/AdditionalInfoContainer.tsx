'use client';

import { Control, Controller, UseFieldArrayRemove } from 'react-hook-form';
import { Icons } from './icons';
import { Button } from './ui/button';
import { Input } from './ui/input';

type TAdditionalInfoContainer = {
    control: Control<any>;
    index: number;
    field: any;
    deleteItem?: UseFieldArrayRemove;
};

export const AdditionalInfoContainer = ({
    control,
    index,
    field,
    deleteItem,
}: TAdditionalInfoContainer) => {
    return (
        <div key={field.id} className='m-2 flex'>
            <Controller
                control={control}
                name={`additionalInfoFields.${index}.key`}
                render={({ field }) => {
                    return <Input placeholder='Camera' {...field}></Input>;
                }}
            />
            <Icons.arrow className='h-auto w-16' />
            <Controller
                name={`additionalInfoFields.${index}.value`}
                render={({ field }) => {
                    return <Input placeholder='Sony A7' {...field}></Input>;
                }}
            />
            <Button
                onClick={() => deleteItem && deleteItem(index)}
                className='col-start-2'
            >
                <Icons.delete />
            </Button>
        </div>
    );
};
