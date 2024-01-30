'use client';

import { differenceBy } from 'lodash';
import { useFieldArray } from 'react-hook-form';
import { Button } from '@/components//ui/button';
import { TagItem } from '@/components/TagItem';
import { ItemMover } from '@/components/ItemMover';
import {
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure,
    ModalHeader,
    ModalFooter,
} from '@/components/ui/modal';
import { cn } from '@/lib/utils';

export const ProjectTagSelector = ({ form, allTags, readMode }) => {
    const isSaved = form.getValues('id');
    const selectCoverDisclosure = useDisclosure();
    const { isOpen, onOpen, onOpenChange } = selectCoverDisclosure;

    const {
        fields: projectTags,
        remove: deleteItem,
        append: addItem,
    } = useFieldArray({
        control: form.control,
        name: 'tags',
        keyName: 'tagId',
    });
    const unselectedTags = differenceBy(allTags, projectTags, 'id');

    return (
        isSaved && (
            <>
                <div className={cn('space-y-2', readMode && 'opacity-50')}>
                    <div className='flex flex-wrap gap-2'>
                        {projectTags.map((tag) => {
                            return (
                                <TagItem
                                    tag={tag}
                                    key={`${tag.id}_projectTags`}
                                />
                            );
                        })}
                    </div>
                    <Button
                        variant='secondary'
                        type='button'
                        onClick={onOpen}
                        disabled={readMode}
                    >
                        Edit Tags
                    </Button>
                </div>

                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    size='5xl'
                    backdrop='blur'
                    placement='top'
                    classNames={{
                        body: 'min-h-[50vh]',
                        base: 'bg-card text-card-foreground shadow-sm',
                    }}
                >
                    <ModalContent className='max-w-7xl max-h-fit'>
                        {(onClose) => (
                            <>
                                <ModalHeader>Tags</ModalHeader>
                                <ModalBody>
                                    <div className='flex flex-col gap-1'>
                                        {unselectedTags.length > 0 && (
                                            <>
                                                ALL TAGS
                                                <div className='flex gap-2 h-fit'>
                                                    {unselectedTags.map(
                                                        (tag) => {
                                                            return (
                                                                <TagItem
                                                                    key={`${tag.id}_allTags`}
                                                                    tag={tag}
                                                                    addItem={
                                                                        addItem
                                                                    }
                                                                    readMode={
                                                                        readMode
                                                                    }
                                                                    activeTags={
                                                                        projectTags
                                                                    }
                                                                    withLine={
                                                                        false
                                                                    }
                                                                />
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </>
                                        )}
                                        SELECTED TAGS
                                        <div className='flex flex-col gap-2 h-fit'>
                                            {projectTags.map((tag, index) => {
                                                return (
                                                    <div
                                                        className='flex gap-2'
                                                        key={`${tag.id}_selectedTags`}
                                                    >
                                                        <ItemMover
                                                            deleteItem={
                                                                deleteItem
                                                            }
                                                            index={index}
                                                            className={'w-fit'}
                                                        />
                                                        <TagItem
                                                            tag={tag}
                                                            withLine={false}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className='w-full flex justify-end gap-2'>
                                        {projectTags.length > 0 && (
                                            <Button
                                                variant={'destructive'}
                                                onClick={() =>
                                                    form.setValue('tags', [])
                                                }
                                            >
                                                Clear
                                            </Button>
                                        )}
                                        <Button onClick={onClose}>Done</Button>
                                    </div>
                                </ModalBody>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>
        )
    );
};
