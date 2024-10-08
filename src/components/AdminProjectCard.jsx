'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

// components
import { Icons } from '@/components/icons';
import { ProjectForm } from '@/components/forms/ProjectForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure,
} from '@/components/ui/modal';

export const AdminProjectCard = ({ project, showAsButton = false }) => {
    const router = useRouter();
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
                <Card
                    className='w-full justify-self-center grid gap-2 justify-center p-2 relative'
                    onClick={() => router.push(`/admin/projects/${project.id}`)}
                >
                    <CardHeader className='flex'>
                        <CardTitle className='flex justify-between'>
                            {project.title}
                            <Icons.arrowNavigate />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='relative h-[320px] w-full flex flex-col justify-center'>
                        {project.cover?.url ? (
                            <Image
                                src={project.cover.url}
                                alt={`Cover photo for ${project.title}`}
                                height={200}
                                width={400}
                                className='rounded-md object-contain max-h-[320px]'
                            />
                        ) : (
                            <div className='grid justify-center'>
                                <Icons.missingPhoto className='justify-self-center h-[120px] w-[120px]' />
                            </div>
                        )}
                    </CardContent>
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
