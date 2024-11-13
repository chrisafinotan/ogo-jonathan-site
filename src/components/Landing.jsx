'use client';

import SplitType from 'split-type';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
    Navigation,
    Pagination,
    Keyboard,
    Autoplay,
    Mousewheel,
    FreeMode,
} from 'swiper/modules';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

export const Landing2 = ({ showcasePhotos }) => {
    const imageStyles = [
        {
            aspectRatio: '1.44928 / 1',
            height: 'auto',
            width: '100%',
        },
        {
            aspectRatio: '0.8 / 1',
            height: '100%',
            width: 'auto',
        },
        {
            aspectRatio: '0.704 / 1',
            height: '100%',
            width: 'auto',
        },
    ];
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    return (
        <div className={cn('fixed mb-12 w-full h-full right-0')}>
            <Swiper
                id='mySwiperID'
                className='w-full h-full text-2xs'
                direction={'vertical'}
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
                pagination={{
                    el: '.swiper-mypagination',
                    type: 'fraction',
                    renderFraction: function (currentClass, totalClass) {
                        return `<span class="${currentClass}"></span>/<span class="${totalClass}"></span>`;
                    },
                }}
                spacebetween={10}
                slidesPerView={1}
                onSlideChange={(swiperObj) =>
                    setCurrentProjectIndex(swiperObj.realIndex)
                }
            >
                {showcasePhotos.map((photo, index) => {
                    return (
                        <SwiperSlide key={`swiperSlide_${index}`}>
                            <div
                                className={cn(
                                    'sm:ml-auto h-full max-h-screen sm:w-full flex flex-col align-end',
                                    'p-2 pt-[4rem] sm:pt-0 sm:p-9 sm:pb-[6rem]'
                                )}
                            >
                                <div className='relative h-full'>
                                    <Link
                                        href={photo.projectUrl}
                                        className={cn(
                                            'h-full bottom-0 right-0'
                                        )}
                                    >
                                        <Image
                                            src={photo.url}
                                            alt={`Project photo for ${photo.title}`}
                                            className={cn(
                                                'object-contain h-full w-full absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 sm:w-3/4 sm:h-[90%]'
                                            )}
                                            key={`${index}_projectImage`}
                                            width={1080}
                                            height={1280}
                                            loading={'lazy'}
                                        />
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
                <div
                    className={cn(
                        'swiper-mypagination-wrapper fixed sm:absolute bottom-0 right-0 w-full px-2 sm:px-9 pb-6 grid grid-cols-6 justify-between items-center z-10 text-right'
                    )}
                >
                    <div className='col-start-1 col-end-4 bottom-4 w-full text-4xl flex'>
                        OGO JONATHAN
                    </div>
                    <div className='col-start-5'>
                        {showcasePhotos[currentProjectIndex] &&
                            showcasePhotos[currentProjectIndex]['Project']
                                .title}
                    </div>
                    <div className='swiper-mypagination col-start-6 text-end w-full'></div>
                </div>
            </Swiper>
        </div>
    );
};

export const Landing = ({ showcasePhotos }) => {
    const container = useRef();
    const swiperRef = useRef();

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const currentImage = showcasePhotos[currentImageIndex];
    const length = showcasePhotos.length;

    function createSplitText(element) {
        const splitText = new SplitType(element, { types: 'lines' });
        element.innerHTML = '';
        splitText.lines.forEach((line) => {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'line';
            const lineSpan = document.createElement('span');
            lineSpan.textContent = line.textContent;
            lineDiv.appendChild(lineSpan);
            element.appendChild(lineDiv);
        });
    }

    function nextPhoto() {
        const newIndex = (currentImageIndex + 1) % length;
        setCurrentImageIndex(newIndex);
        if (swiperRef.current) {
            console.log('next photo');
            swiperRef.current.slideNext();
        }
    }

    function prevPhoto() {
        let newIndex = (currentImageIndex - 1) % length;
        if (newIndex < 0) newIndex = length - 1;
        setCurrentImageIndex(newIndex);
        if (swiperRef.current) {
            console.log('next photo');
            swiperRef.current.slidePrev();
        }
    }

    function handleItemClick(e, index) {
        e.preventDefault();
        console.log(index, currentImageIndex, swiperRef?.current?.realIndex);
        if (index === currentImageIndex) return;
        setCurrentImageIndex(index);
        if (swiperRef.current) {
            console.log('next photo');
            swiperRef.current.slideTo(index);
        }
    }

    const BackgroundComp = () => {
        return (
            <div className='absolute top-0 left-0 w-full h-full'>
                <img
                    src={currentImage.url}
                    alt={currentImage.description}
                    className='w-full h-full object-cover'
                />
                <div className='absolute top-0 left-0 w-full h-full backdrop-blur-2xl'></div>
            </div>
        );
    };

    const SelectedImageComp = () => {
        return (
            <Link
                href={currentImage.projectUrl}
                className='flex justify-center items-center'
            >
                <Image
                    src={currentImage.url}
                    alt={`Project cover photo for ${currentImage.title}`}
                    className='project-image will-change-transform h-full w-auto '
                    width={1080}
                    height={1280}
                    loading={'lazy'}
                />
            </Link>
        );
    };

    return (
        <div ref={container} className={cn('text-primary w-svw h-svh')}>
            <div className='w-full h-full grid grid-rows-6 sm:flex-row sm:flex overflow-scroll sm:overflow-hidden p-4'>
                <div
                    id='info-wrapper'
                    className='sm:pt-12 relative row-span-1 sm:flex-[1] flex flex-col gap-2 sm:justify-between text-[1rem]'
                >
                    <div className='w-full sm:top-1/2 sm:left-1/2 align-middle text-center'>
                        <h1 className='animate sm:text-md lg:text-[5rem] lg:leading-[5.5rem]'>
                            OGO JONATHAN
                        </h1>
                    </div>
                    <div className=''>
                        <div className='title'>
                            <h1 className='animate split'>
                                {currentImage.Project.title}
                            </h1>
                        </div>
                        <div className='description'>
                            <span className='animate split'>
                                {currentImage.Project.description}
                            </span>
                        </div>
                    </div>
                    <div className='bottom-0 hidden sm:block'>
                        <h2 className='animate split '>
                            About you section ... Lorem, ipsum dolor sit amet
                            consectetur adipisicing elit. Explicabo commodi odit
                            porro eligendi. Cumque earum quam eligendi corporis
                            et molestias iure officiis repudiandae error?
                            Doloremque voluptatum optio iure magni esse?
                        </h2>
                    </div>
                </div>
                <div
                    id='selected-wrapper'
                    className='relative row-span-5 sm:flex-[3] grid grid-rows-12 gap-2 h-full'
                >
                    <div className='row-span-11 flex overflow-hidden will-change-transform justify-center'>
                        <Swiper
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                                console.log(swiper, swiperRef);
                            }}
                            id='mySwiperID'
                            className='w-full h-full text-2xs'
                            direction={'vertical'}
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
                            pagination={{
                                el: '.swiper-mypagination',
                                type: 'fraction',
                                renderFraction: function (
                                    currentClass,
                                    totalClass
                                ) {
                                    return `<span class="${currentClass}"></span>/<span class="${totalClass}"></span>`;
                                },
                            }}
                            spacebetween={10}
                            slidesPerView={1}
                            onSlideChange={(swiperObj) =>
                                setCurrentImageIndex(swiperObj.realIndex)
                            }
                            loop={true}
                        >
                            {showcasePhotos.map((photo, index) => {
                                return (
                                    <SwiperSlide key={`swiperSlide_${index}`}>
                                        <div
                                            className={cn(
                                                'sm:m-0 h-full max-h-svh sm:w-full flex flex-col align-end',
                                                'p-2 pt-[4rem] sm:p-0'
                                            )}
                                        >
                                            <Link
                                                href={photo.projectUrl}
                                                className={cn(
                                                    'h-full bottom-0 right-0'
                                                )}
                                            >
                                                <Image
                                                    src={photo.url}
                                                    alt={`Project photo for ${photo.title}`}
                                                    className={cn(
                                                        'object-contain h-full w-full p-1 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'
                                                    )}
                                                    key={`${index}_projectImage`}
                                                    width={1080}
                                                    height={1280}
                                                    loading={'lazy'}
                                                />
                                            </Link>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                    <div className='w-full row-span-1 flex sm:justify-self-start right-0 relative justify-between sm:justify-center gap-32 sm:pt-4'>
                        <Icons.arrowLeft
                            className='group-hover:-rotate-45 ease-in-out duration-300'
                            onClick={prevPhoto}
                        />
                        <Icons.arrow
                            className=' group-hover:rotate-45 ease-in-out duration-300'
                            onClick={nextPhoto}
                        />
                    </div>
                </div>
                <div
                    id='showcase-wrapper'
                    className='hidden md:block md:flex-[0.15] z-[2] overflow-auto p-3 bg-transparent backdrop-blur-md'
                >
                    <div className='w-full h-[300vh] flex flex-col gap-3'>
                        {showcasePhotos.map((photo, index) => {
                            return (
                                <div
                                    onClick={(e) => handleItemClick(e, index)}
                                    className={cn(
                                        "item opacity-30 hover:opacity-75 relative flex-1 bg-slate-300 after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:transition-background after:ease-in-out after:delay-500",
                                        currentImageIndex === index &&
                                            'active opacity-100 hover:opacity-100'
                                    )}
                                >
                                    <img
                                        src={photo.url}
                                        alt={photo.title}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
