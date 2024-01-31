'use client';

import _ from 'lodash';
import { useState, useContext } from 'react';
import Image from 'next/image';
import {
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure,
    ModalFooter,
} from '@nextui-org/react';
import { Button } from './ui/button';
import { ProjectContext } from '@/site/ProjectsProvider';
import { Icons } from './icons';
import { addShowcaseData } from './forms/helper';

export const ShowcasePhotosSelector = ({ showcasePhotos }) => {
    const projects = useContext(ProjectContext);
    const initShowcasePhotos = _.keyBy(showcasePhotos, 'id');
    const [selectedShowcasePhotos, setSelectedPhotos] = useState({});
    const [selectedProject, setSelectedProject] = useState(projects[0]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const keyedProjects = _.keyBy(projects, 'id');

    const addToSelected = (photo) => {
        const photos = { ...selectedShowcasePhotos };
        if (photos[photo.id]) {
            delete photos[photo.id];
        } else {
            photos[photo.id] = photo;
        }
        setSelectedPhotos(photos);
    };

    const saveSelecedPhotos = async () => {
        await addShowcaseData(_.values(selectedShowcasePhotos));
    };

    const getPhotosForProject = () => {
        const photos = keyedProjects[selectedProject.id].photos;
        const filteredPhotos = photos.filter(
            (el) => !initShowcasePhotos[el.id]
        );
        return filteredPhotos;
    };

    const photos = getPhotosForProject();

    return (
        <>
            <Button onClick={onOpen}>Select Showcase Photos</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size='5xl'
                backdrop='blur'
                placement='top'
                classNames={{
                    base: 'bg-card text-card-foreground shadow-sm',
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div className='grid grid-cols-[150px_1fr] gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        {projects.map((project, index) => {
                                            return (
                                                <Button
                                                    key={`${index}__showcaseProjectButton`}
                                                    onClick={() =>
                                                        setSelectedProject(
                                                            project
                                                        )
                                                    }
                                                >
                                                    {project.title}
                                                </Button>
                                            );
                                        })}
                                    </div>
                                    <div className='flex flex-wrap items-start relative'>
                                        {photos.length > 0 ? (
                                            photos.map((photo, index) => {
                                                const { id, url, title } =
                                                    photo;
                                                if (initShowcasePhotos[id])
                                                    return;
                                                return (
                                                    <div
                                                        key={`${index}_showcaseSelectModalPhoto`}
                                                        className='loading-state relative w-fit h-fit'
                                                        onClick={() => {
                                                            addToSelected(
                                                                photo
                                                            );
                                                        }}
                                                    >
                                                        <Image
                                                            src={url}
                                                            alt={`Cover photo for ${title}`}
                                                            className='object-cover align-middle min-h-[100px] min-w-[100px] max-w-[300px] max-h-[300px] h-full box-border basis-[300px] flex-shrink transition-opacity duration-[2000ms] bg-slate-500'
                                                            key={`${index}_showcaseSelectorImage`}
                                                            width={400}
                                                            height={400}
                                                            placeholder='blur'
                                                            blurDataURL={
                                                                './background.jpeg'
                                                            }
                                                        />

                                                        {selectedShowcasePhotos[
                                                            id
                                                        ] && (
                                                            <div className='absolute top-0 left-0 bg-green-600 opacity-50 w-full h-full max-w-[300px] max-h-[300px] text-white font-extrabold align-middle text-3xl flex justify-center items-center'>
                                                                <Icons.check className='h-1/2 w-1/2' />
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className='absolute w-full justify-center self-center text-center'>
                                                {`NOTHING TO SELECT FOR "${selectedProject.title}"`}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <div className='grid grid-cols-[1fr_150px] gap-2'>
                                    <div className='flex overflow-y-scroll w-full h-full no-scrollbar gap-2 p-2'>
                                        {_.map(
                                            selectedShowcasePhotos,
                                            (photo, index) => {
                                                return (
                                                    <Image
                                                        src={photo.url}
                                                        alt={`Cover photo for ${photo.title}`}
                                                        className='object-cover min-w-[150px] min-h-[150px] max-w-[150px] max-h-[150px] box-border basis-[150px] align-middle object-center'
                                                        key={`${index}_selectedShowcaseImage`}
                                                        width={400}
                                                        height={400}
                                                    />
                                                );
                                            }
                                        )}
                                    </div>
                                    <div className='flex flex-col'>
                                        {_.size(selectedShowcasePhotos) > 0 ? (
                                            <span>
                                                {`${_.size(
                                                    selectedShowcasePhotos
                                                )} SELECTED`}
                                            </span>
                                        ) : (
                                            <span>0 SELECTED</span>
                                        )}
                                        <div className='flex gap-2'>
                                            {_.size(selectedShowcasePhotos) >
                                                0 && (
                                                <>
                                                    <Button
                                                        variant='destructive'
                                                        onClick={() =>
                                                            setSelectedPhotos(
                                                                {}
                                                            )
                                                        }
                                                        className='col-start-2 h-auto w-16'
                                                    >
                                                        <Icons.cancel />
                                                    </Button>
                                                    <form
                                                        action={
                                                            saveSelecedPhotos
                                                        }
                                                    >
                                                        <Button
                                                            type='submit'
                                                            variant='default'
                                                            className='col-start-2 h-auto w-16'
                                                        >
                                                            <Icons.plus />
                                                        </Button>
                                                    </form>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
