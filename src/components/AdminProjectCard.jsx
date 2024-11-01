'use client';

import Image from 'next/image';
import Link from 'next/link';

// components
import { Icons } from '@/components/icons';
import { ProjectForm } from '@/components/forms/ProjectForm';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import {
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure,
} from '@/components/ui/modal';

export const AdminProjectCard = ({ project, showAsButton = false }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            {showAsButton ? (
                <div
                    id='newProjectContainer'
                    className='w-full h-fit flex justify-center py-4'
                >
                    <Button onClick={onOpen}>NEW PROJECT</Button>
                </div>
            ) : (
                <Card className='w-full justify-self-center grid gap-2 justify-center p-2 relative border-none'>
                    <Link
                        href={`/admin/projects/${project.id}`}
                        className='group flex flex-col relative'
                    >
                        <CardHeader className='p-0 flex flex-row w-full justify-center text-xl absolute inset-0 items-center bg-tranparent '>
                            <div className='p-2 flex flex-row items-center bg-blue-500 mix-blend'>
                                {project.title}
                                <Icons.arrow className='group-hover:-rotate-45 transition-transform' />
                            </div>
                        </CardHeader>

                        {project.cover?.url ? (
                            <Image
                                src={project.cover.url}
                                alt={`Cover photo for ${project.title}`}
                                height={200}
                                width={400}
                                className='rounded-md object-cover max-h-[320px]'
                            />
                        ) : (
                            <div className='grid justify-center'>
                                <Icons.missingPhoto className='justify-self-center h-[120px] w-[120px]' />
                            </div>
                        )}
                    </Link>
                </Card>
            )}

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
                size='5xl'
                backdrop='blur'
                placement='top'
                classNames={{
                    body: 'py-0 px-0',
                    base: 'bg-card text-card-foreground shadow-sm',
                    header: 'border-b-[1px]',
                    footer: 'border-t-[1px]',
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
                        <ModalBody>
                            <ProjectForm onSuccess={onClose} />
                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
