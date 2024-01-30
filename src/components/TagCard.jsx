'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
} from '@nextui-org/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TagForm } from './forms/TagForm';
import { Icons } from './icons';

export const TagCard = ({ tag, showAsButton = false }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [editMode, setEditMode] = useState(false);

    const { color, type, text, description } = tag || {};
    return (
        <>
            {showAsButton ? (
                <div
                    id='newTagContainer'
                    className='w-full h-fit flex justify-center py-4'
                >
                    <Button onClick={onOpen}>NEW TAG</Button>
                </div>
            ) : (
                <Card
                    className='w-full justify-self-center grid gap-2 p-2 relative'
                    onClick={onOpen}
                >
                    <CardHeader className='flex'>
                        <Badge variant='outline' className='w-min'>
                            {type}
                        </Badge>
                        <CardTitle className='grid gap-2'>{text}</CardTitle>
                    </CardHeader>
                    <CardContent className='relative h-[80px] w-full flex flex-col justify-center'>
                        <div className='grid justify-center'>
                            <span>{description}</span>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
                backdrop='blur'
                placement='top'
                classNames={{
                    body: 'py-0 px-0',
                    // backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                    base: 'bg-card text-card-foreground shadow-sm',
                    header: 'border-b-[1px]',
                    footer: 'border-t-[1px]',
                    // closeButton: 'hover:bg-white/5 active:bg-white/10',
                }}
                closeButton={
                    <Button>
                        <Icons.cancel />
                        CLOSE
                    </Button>
                }
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                {editMode ? (
                                    <Button
                                        variant='destructive'
                                        onClick={() => setEditMode(!editMode)}
                                    >
                                        <Icons.cancel />
                                    </Button>
                                ) : (
                                    <Button
                                        variant='primary'
                                        onClick={() => setEditMode(!editMode)}
                                    >
                                        <Icons.edit />
                                    </Button>
                                )}
                            </ModalHeader>
                            <ModalBody>
                                <TagForm
                                    initValues={tag}
                                    showSubmit={editMode}
                                    onSuccess={onClose}
                                />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
