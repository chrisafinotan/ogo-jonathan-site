'use client';

import Image from 'next/image';
import Link from 'next/link';

// components
import { Icons } from '@/components/icons';
import { ProjectForm } from '@/components/forms/ProjectForm';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure,
} from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const AdminProjectCard = ({ project, showAsButton = false }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' });
    const formattedDate = formatter.format(project?.projectDate);
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
                        <div className='p-0 flex flex-row w-full  text-xl absolute inset-0 items-end bg-tranparent'>
                            <div className='p-2 flex flex-col items-center bg-background rounded-tr-md mix-blend'>
                                <h2 className=''>{project.title}</h2>
                                <span className='text-sm'>{formattedDate}</span>
                                <Badge
                                    variant={cn('outline')}
                                    className={cn(
                                        'w-min text-primary',
                                        project.isPublished
                                            ? 'bg-success'
                                            : 'bg-danger'
                                    )}
                                >
                                    {project.isPublished
                                        ? 'Published'
                                        : 'Unpublished'}
                                </Badge>
                            </div>
                        </div>

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
