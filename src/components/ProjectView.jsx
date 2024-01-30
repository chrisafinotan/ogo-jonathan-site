'use client';

import { useRef, useContext } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
    Navigation,
    Pagination,
    Keyboard,
    Autoplay,
    Mousewheel,
    FreeMode,
} from 'swiper/modules';
import { ProjectContext } from '@/site/ProjectsProvider';
import { cn, getProject } from '@/lib/utils';

export const ProjectView = ({ projectId }) => {
    const projects = useContext(ProjectContext);
    const { project } = getProject(projectId, projects);
    const { photos, description, title, additionalInfo } = project;

    const swiperRef = useRef(null);
    const progressCircle = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        if (progressCircle.current) {
            progressCircle.current.style.setProperty(
                '--progress',
                1 - progress
            );
        }
    };

    const SwiperProgressBar = () => {
        return (
            <div className='grow relative'>
                <div className='swiper-mypagination self-center !w-full !bg-inherit border-b-black border-b-2'></div>
            </div>
        );
    };

    const ProjectInfo = () => {
        return (
            <div className='grid grid-cols-[4fr_1fr] w-full p-4 pt-0'>
                <div className='name'>
                    {title.toUpperCase()}
                    <div className='desc'>{description.toUpperCase()}</div>
                    <div></div>
                </div>
                <div className='more'>
                    <div className='additionalInfo'>
                        {Object.entries(additionalInfo).map(([key, value]) => {
                            return (
                                <div>
                                    <span>{key}</span>:<span>{value}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className='relative grid grid-rows-[70vh_1fr] !max-h-screen h-screen w-screen'>
            <Swiper
                id='mySwiperID'
                className='w-full h-full max-h-[70vh]'
                modules={[
                    Navigation,
                    Keyboard,
                    Pagination,
                    Mousewheel,
                    FreeMode,
                    Autoplay,
                ]}
                keyboard={{ enabled: true }}
                mousewheel={{ releaseOnEdges: true }}
                // pagination={{
                //     el: '.swiper-mypagination',
                //     type: 'progressbar',
                //     background: '#fff',
                // }}
                autoplay={
                    photos.length > 4
                        ? {
                              delay: 2500,
                              disableOnInteraction: false,
                          }
                        : false
                }
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                spacebetween={0}
                slidesPerView={'auto'}
                freeMode={true}
                ref={swiperRef}
            >
                <>
                    {photos.map((photo, index) => {
                        return (
                            <SwiperSlide
                                key={`swiperSlide_${index}`}
                                className={cn(
                                    '!flex justify-center !w-max box-border'
                                )}
                            >
                                <Image
                                    src={photo.url}
                                    alt={`Cover photo for ${photo.title}`}
                                    className={cn(
                                        'object-contain w-full h-full'
                                    )}
                                    key={`${index}_projectImage`}
                                    width={1080}
                                    height={1280}
                                    loading={'lazy'}
                                />
                                <div className='swiper-lazy-preloader'></div>
                            </SwiperSlide>
                        );
                    })}
                </>
                <div className='autoplay-progress2' slot='container-end'>
                    <svg viewBox='0 0 90 90' ref={progressCircle}>
                        <circle cx='24' cy='24' r='20'></circle>
                    </svg>
                </div>
            </Swiper>
            <ProjectInfo />
        </div>
    );
};