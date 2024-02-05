'use client';

import { useContext } from 'react';
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
import { useBreakpoint } from '@/site/BreakPointProvider';
import { isEmpty } from 'lodash';
export const ProjectView = ({ projectId }) => {
    const breakpoints = useBreakpoint();
    const projects = useContext(ProjectContext);
    const { project } = getProject(projectId, projects);
    if (!project) return <>CANNOT FIND</>;
    const { photos, description, title, additionalInfo } = project;

    // const progressCircle = useRef(null);
    // const onAutoplayTimeLeft = (s, time, progress) => {
    //     if (progressCircle.current) {
    //         progressCircle.current.style.setProperty(
    //             '--progress',
    //             1 - progress
    //         );
    //     }
    // };

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
                                <div key={`${key}_${value}_additionalInfo`}>
                                    <span>{key}</span>:<span>{value}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    const SmallProjectView = () => {
        return (
            <div className='flex flex-col gap-2'>
                <div
                    key={`projectImage_0_${photos[0].url}`}
                    className='group w-full rounded-md max-h-[80svh] lg:max-h-[100svh] relative aspect-[9/16] overflow-hidden'
                >
                    <Image
                        src={photos[0].url}
                        alt={`Project photo for ${photos[0].title}`}
                        fill
                        className='rounded-md object-cover bg-muted lg:ease-in-out lg:duration-500 lg:scale-[1.2] lg:group-hover:scale-[1]'
                    />
                </div>
                <ProjectInfo />
                <>
                    {photos.slice(1).map(({ url, title }, index) => {
                        return (
                            <div
                                key={`projectImage_${index + 1}_${url}`}
                                className='group w-full rounded-md max-h-[80svh] lg:max-h-[100svh] relative aspect-[9/16] overflow-hidden'
                            >
                                <Image
                                    src={url}
                                    alt={`Project photo for ${title}`}
                                    fill
                                    className='rounded-md object-cover bg-muted lg:ease-in-out lg:duration-500 lg:scale-[1.2] lg:group-hover:scale-[1]'
                                />
                            </div>
                        );
                    })}
                </>
            </div>
        );
    };
    if (isEmpty(breakpoints)) return;
    if (breakpoints.sm) return <SmallProjectView />;
    return (
        <div className='fixed grid grid-rows-[70vh_1fr] !max-h-screen h-screen w-screen'>
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
                // autoplay={
                //     photos.length > 4
                //         ? {
                //               delay: 2500,
                //               disableOnInteraction: false,
                //           }
                //         : false
                // }
                // onAutoplayTimeLeft={onAutoplayTimeLeft}
                spacebetween={0}
                slidesPerView={'auto'}
                freeMode={true}
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
                                    alt={`Project photo for ${photo.title}`}
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
                    <svg
                        viewBox='0 0 90 90'
                        // ref={progressCircle}
                    >
                        <circle cx='24' cy='24' r='20'></circle>
                    </svg>
                </div>
            </Swiper>
            <ProjectInfo />
        </div>
    );
};
