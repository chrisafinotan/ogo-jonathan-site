'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useFieldArray } from 'react-hook-form';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export const ProjectCoverSelector = ({ form, initCover, onClose }) => {
    const isSaved = form.getValues('id');
    const { fields: photoFields } = useFieldArray({
        control: form.control,
        name: 'photos',
        keyName: 'photoId',
    });

    const [selectedCover, setSelectedCover] = useState(initCover);
    const [selectedPreview, setSelectedPreview] = useState('');

    return (
        <>
            {isSaved ? (
                <>
                    <div className='grid grid-cols-3 max-h-96 overflow-auto'>
                        {photoFields.map((photo, index) => {
                            return (
                                <Image
                                    key={`${index}_projectCoverSelector`}
                                    src={photo.url}
                                    alt={photo?.title || ''}
                                    height={320}
                                    width={400}
                                    className={cn(
                                        'bg-transparent rounded-lg object-contain h-full max-h-72',
                                        photo.id === selectedCover?.id
                                            ? 'border-4 border-purple-400 bg-purple-400'
                                            : 'image-hover'
                                    )}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedCover(photo);
                                    }}
                                />
                            );
                        })}
                    </div>
                    <div className='w-full flex justify-end gap-2'>
                        {selectedCover?.id && (
                            <Button
                                variant={'destructive'}
                                onClick={() => {
                                    form.setValue('coverId', null);
                                    setSelectedCover();
                                }}
                            >
                                Clear
                            </Button>
                        )}
                        <Button
                            variant={
                                selectedCover?.id ? 'default' : 'secondary'
                            }
                            onClick={() => {
                                form.setValue('coverId', selectedCover?.id);
                                onClose && onClose();
                            }}
                        >
                            Done
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <div className='grid grid-cols-3 max-h-96 overflow-auto'>
                        {form.getValues('photosPreview').map((field, index) => {
                            const preview = field.photo;
                            return (
                                <div key={`${index}_projectCoverSelectorFiles`}>
                                    <Image
                                        src={preview}
                                        alt='Upload Image preview'
                                        height={320}
                                        width={400}
                                        className={cn(
                                            'bg-transparent rounded-lg object-contain h-full max-h-72',
                                            preview === selectedPreview
                                                ? 'border-4 border-purple-400 bg-purple-400'
                                                : 'image-hover'
                                        )}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSelectedPreview(preview);
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className='w-full flex justify-end gap-2'>
                        {selectedPreview && (
                            <Button
                                variant='destructive'
                                onClick={() => {
                                    form.setValue('coverURL', '');
                                    setSelectedPreview();
                                }}
                            >
                                Clear
                            </Button>
                        )}
                        <Button
                            variant={
                                selectedPreview !== '' ? 'default' : 'secondary'
                            }
                            onClick={() => {
                                form.setValue('coverURL', selectedPreview);
                                onClose && onClose();
                            }}
                        >
                            Done
                        </Button>
                    </div>
                </>
            )}
        </>
    );
};
