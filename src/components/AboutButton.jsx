'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure,
} from '@/components/ui/modal';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { SocialsBar } from '@/components/SocialsBar';
import { Icons } from '@/components/icons';
import { navItemClass } from './Nav';
import { cn } from '@/lib/utils';

export const AboutButton = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild={true}>
                        <Button className={cn(navItemClass, '!border-hidden')} onClick={onOpen}>
                            <Icons.about />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p> Contact & About Me</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size='5xl'
                backdrop='blur'
                placement='auto'
            >
                <ModalContent>
                    {(onClose) => (
                        <ModalBody>
                            ABOUT ME
                            <SocialsBar />
                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};
