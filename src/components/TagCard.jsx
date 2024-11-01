'use client';

import { useState } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
} from '@nextui-org/react';
import { Card, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TagForm } from './forms/TagForm';
import { Icons } from './icons';
import { cn } from '@/lib/utils';

export const TagCard = ({ tag, showAsButton = false }) => {
    const { id, color, type, text, description } = tag || {};
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [editMode, setEditMode] = useState(false);

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
                    className={cn(
                        'w-full justify-self-center flex flex-auto flex-col basis-96 gap-2 p-2 relative'
                    )}
                    style={{ backgroundColor: color }}
                    onClick={onOpen}
                >
                    <CardTitle className='grid gap-2'>{text}</CardTitle>
                    <Badge variant='outline' className='w-min bg-background text-primary'>
                        {type}
                    </Badge>
                    <div className='relative h-full max-h-[80px] w-full flex flex-col py-0 overflow-scroll'>
                        {description}
                    </div>
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
                            {id && (
                                <ModalHeader>
                                    {editMode ? (
                                        <Button
                                            variant='destructive'
                                            onClick={() =>
                                                setEditMode(!editMode)
                                            }
                                        >
                                            Cancel
                                            <Icons.cancel />
                                        </Button>
                                    ) : (
                                        <Button
                                            variant='primary'
                                            onClick={() =>
                                                setEditMode(!editMode)
                                            }
                                        >
                                            Edit &nbsp;
                                            <Icons.edit />
                                        </Button>
                                    )}
                                </ModalHeader>
                            )}
                            <ModalBody>
                                <TagForm
                                    initValues={tag}
                                    editMode={editMode}
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
