'use client';

import styles from './styles/landing.module.css';
import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import CustomEase from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
    Navigation,
    Pagination,
    Keyboard,
    Autoplay,
    Mousewheel,
    FreeMode,
} from 'swiper/modules';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// gsap.registerPlugin(useGSAP, Flip, ScrollToPlugin, CustomEase);

// CustomEase.create(
//     'hop',
//     'M0,0 C0,0 0.056,0.442 0.175,0.442 0.294,0.442 0.332,0 0.332,0 0.332,0 0.414,1 0.671,1 0.991,1 1,0 1,0'
// );

// const rightAxisPlacement = {
//     7: 'right-[15%]',
//     8: 'right-[2em]',
//     14: 'right-[2em]',
// };
// const leftAxisPlacement = {
//     1: 'left-[2em]',
//     2: 'left-[15%]',
//     3: 'left-[45%]',
//     4: 'left-[65%]',
//     5: 'left-[2em]',
//     6: 'left-[25%]',
//     9: 'left-[45%]',
//     10: 'left-[65%]',
//     11: 'left-[2em]',
//     12: 'left-[65%]',
//     13: 'left-[75%]',
//     15: 'left-[25%]',
//     16: 'left-[5%]',
// };

export const Landing = ({ showcasePhotos }) => {
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
    const isLeft = false;
    return (
        <div
            className={cn(
                'fixed mb-12 w-full h-full',
                isLeft ? 'left-0' : 'right-0'
            )}
        >
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
                // loop={true}
            >
                {showcasePhotos.map((photo, index) => {
                    return (
                        <SwiperSlide key={`swiperSlide_${index}`}>
                            <div
                                className={cn(
                                    'sm:ml-auto h-full max-h-screen sm:w-full flex flex-col align-end',
                                    'p-2 pt-[4rem] sm:pt-0 sm:p-9 sm:pb-[6rem]'
                                    // 'my-4'
                                )}
                            >
                                <div className='relative h-full'>
                                    <Link
                                        href={photo.projectUrl}
                                        className={cn(
                                            'h-full bottom-0',
                                            isLeft ? 'left-0' : 'right-0'
                                        )}
                                        // style={{
                                        //     ...imageStyles[
                                        //         index % imageStyles.length
                                        //     ],
                                        // }}
                                    >
                                        <Image
                                            src={photo.url}
                                            alt={`Project photo for ${photo.title}`}
                                            className={cn(
                                                'object-cover h-full w-full'
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
                        'swiper-mypagination-wrapper fixed sm:absolute bottom-0 right-0 w-full px-2 sm:px-9 pb-6 grid grid-cols-6 justify-between z-10',
                        isLeft ? 'text-left' : 'text-right'
                    )}
                >
                    <div className='col-span-5'>
                        {showcasePhotos[currentProjectIndex] &&
                            showcasePhotos[currentProjectIndex]['Project']
                                .title}
                    </div>
                    <div className='swiper-mypagination w-fit'></div>
                </div>
            </Swiper>
        </div>
    );
};

// export const Landing2 = ({ showcasePhotos }) => {
//     const [layoutType, setLayoutType] = useState(0);
//     const lenisRef = useRef();
//     const galleryRef = useRef();
//     const galleryContainerRef = useRef();
//     const imagePreviewsRef = useRef();
//     const minimapRef = useRef();
//     function handleScroll() {
//         console.log('scroll', { layoutType });
//         if (layoutType !== 1) return;
//         const imagePreviewsHeight = imagePreviewsRef.current.scrollHeight;
//         const galleryHeight = galleryRef.current.scrollHeight;
//         const { scrollY, innerHeight: windowHeight } = window;

//         const scrollFraction = scrollY / (imagePreviewsHeight - windowHeight);
//         const galleryTranslateY =
//             -scrollFraction + (galleryHeight - windowHeight) * 1.525;
//         const minimapTranslateY =
//             (windowHeight - minimapRef.current.offsetHeight) * 0.425;

//         gsap.to(galleryRef, {
//             y: galleryTranslateY,
//             ease: 'none',
//             duration: 0.1,
//         });

//         gsap.to(minimapRef, {
//             y: minimapTranslateY,
//             ease: 'none',
//             duration: 0.1,
//         });
//     }

//     function updateLayoutTypeHandler(newLayoutType) {
//         const state = Flip.getState(
//             galleryRef.current?.querySelectorAll('.img')
//         );
//         let staggerVal = 0.025;
//         if (
//             (newLayoutType === 1 && layoutType === 0) ||
//             (newLayoutType === 1 && layoutType === 2)
//         ) {
//             staggerVal = 0;
//         }

//         // Flip.from(state, {
//         //     duration: 1.5,
//         //     ease: 'bounce',
//         //     stagger: staggerVal,
//         // });
//         setLayoutType(newLayoutType);
//         console.log('hi 3', { state, newLayoutType });
//         if (newLayoutType === 1) {
//             gsap.to([imagePreviewsRef, minimapRef], {
//                 autoAlpha: 1,
//                 duration: 0.3,
//                 delay: 0.5,
//             });
//             window.addEventListener('scroll', handleScroll);
//         } else {
//             gsap.to([imagePreviewsRef, minimapRef], {
//                 autoAlpha: 0,
//                 duration: 0.3,
//             });
//             gsap.set(galleryRef, { clearProps: 'y' });
//             gsap.set(minimapRef, { clearProps: 'y' });
//             window.removeEventListener('scroll', handleScroll);
//         }
//     }

//     function updateLayoutType() {
//         console.log('hi 2');
//         const newLayoutType = (layoutType + 1) % 3;
//         if (newLayoutType === 1 && window.scrollY > 0) {
//             gsap.to(window, {
//                 scrollTo: { y: 0 },
//                 duration: 0.5,
//                 ease: 'power3.out',
//                 onComplete: () => updateLayoutTypeHandler(newLayoutType),
//             });
//         } else updateLayoutTypeHandler(newLayoutType);
//     }

//     useEffect(() => {
//         function update(time) {
//             lenisRef.current?.lenis?.raf(time * 1000);
//         }
//         gsap.ticker.add(update);
//         return () => {
//             gsap.ticker.remove(update);
//         };
//     });

//     useEffect(() => {
//         if (layoutType !== 1) {
//             if (window.scrollY > 0) {
//                 gsap.to(window, {
//                     scrollTo: { y: 0 },
//                     duration: 0.5,
//                     ease: 'power3.out',
//                 });
//             }
//         }
//         console.log('adding scroll');
//         window.addEventListener('scroll', handleScroll);
//     }, [layoutType]);

//     return (
//         <div ref={lenisRef} autoRaf={false} className='h-full'>
//             <div
//                 onClick={() => updateLayoutType((layoutType + 1) % 3)}
//                 ref={galleryContainerRef}
//                 className='gallery-container w-full h-full pt-[4em]'
//             >
//                 <div
//                     ref={galleryRef}
//                     className={cn(
//                         'gallery',
//                         layoutType === 0 &&
//                             'relative w-full h-full translate-x-0',
//                         layoutType === 1 &&
//                             'fixed pt-[0.5em] top-1/4 left-[10%] translate-x-0',
//                         layoutType === 2 &&
//                             'relative w-full h-full translate-x-0'
//                     )}
//                 >
//                     {showcasePhotos.slice(0, 16).map((photo, index) => {
//                         let top = 'top-0';
//                         if (index < 4) top = 'top-0';
//                         else if (index < 8) top = 'top-1/4';
//                         else if (index < 12) top = 'top-2/4';
//                         else top = 'top-3/4';
//                         return (
//                             <div
//                                 id={`img_${index}`}
//                                 className={cn(
//                                     'img',
//                                     layoutType === 0 &&
//                                         cn(
//                                             'absolute w-[100px] h-[125px] translate-x-0',
//                                             top,
//                                             leftAxisPlacement[index + 1],
//                                             rightAxisPlacement[index + 1]
//                                         ),
//                                     layoutType === 1 &&
//                                         cn('w-[75px] h-[100px] mb-[1em]'),
//                                     layoutType === 2 &&
//                                         cn(
//                                             'absolute w-[300px] h-[400px] right-[4em] top-[4em]'
//                                         )
//                                 )}
//                             >
//                                 <Link
//                                     href={photo.projectUrl}
//                                     className={cn('h-full bottom-0')}
//                                 >
//                                     <Image
//                                         src={photo.url}
//                                         alt={`Project photo for ${photo.title}`}
//                                         className={cn(
//                                             'object-cover h-full w-full'
//                                         )}
//                                         key={`${index}_projectImage`}
//                                         width={1080}
//                                         height={1280}
//                                         loading={'lazy'}
//                                     />
//                                 </Link>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>

//             <div
//                 ref={minimapRef}
//                 className='minimap fixed top-1/4 left-[12.5%] -translate-x-1/2 w-[140px] h-[90px] border-1 border-solid border-purple-600 border-r-2 z-2 invisible opacity-0'
//             ></div>

//             <div
//                 ref={imagePreviewsRef}
//                 className='image-previews absolute top-1/4 left-1/2 -translate-x-1/2 w-[30%] opacity-0'
//             >
//                 {showcasePhotos.map((photo, index) => {
//                     return (
//                         <Image
//                             src={photo.url}
//                             alt={`Project photo for ${photo.title}`}
//                             className={cn(
//                                 'object-cover h-[700px] w-[600px] py-[1em] px-0'
//                             )}
//                             key={`${index}_projectImage_minimap`}
//                             width={1080}
//                             height={1280}
//                             loading={'lazy'}
//                         />
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

export const Landing3 = ({ showcasePhotos }) => {
    const sliderRef = useRef();
    const [isAnimating, setIsAnimating] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const minDelta = -1;
    const maxDelta = 1;
    let currDelta = 0;

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient && sliderRef.current) {
            initializeCards();
        }
    }, [isClient, sliderRef]);

    function initializeCards(from = 'none') {
        if (isAnimating) return;
        const cards = Array.from(sliderRef.current.querySelectorAll('.card'));
        let specialCard, specialCardIndex;
        if (from === 'next') {
            specialCardIndex = 0;
            specialCard = cards[specialCardIndex];
        }
        if (from === 'prev') {
            specialCardIndex = cards.length - 1;
            specialCard = cards[specialCardIndex];
        }
        const tl = gsap.timeline();

        tl.to(cards, {
            y: (i) => {
                const yval = -(cards.length * 0.8) * (cards.length - i - 1);
                return `${yval}%`;
            },
            z: (i) => {
                const zval = -(cards.length - i - 1) * 15;
                return zval;
            },
            duration: 0.7,
            ease: 'power3.inOut',
            stagger: -0.1,
        });
        tl.fromTo(
            specialCard,
            {
                opacity: 0,
                y: () => {
                    const i = specialCardIndex;
                    const yval = -(cards.length * 0.8) * (cards.length - i - 1);
                    return `${yval + 10}%`;
                },
            },
            {
                opacity: 1,
                y: () => {
                    const i = specialCardIndex;
                    const yval = -(cards.length * 0.8) * (cards.length - i - 1);
                    return `${yval}%`;
                },
            },
            '+=0.2'
        );
        // }
    }

    function finishCardTransition(from) {
        initializeCards(from);
        setTimeout(() => {
            setIsAnimating(false);
        }, 1000);
    }

    function showPrev() {
        if (isAnimating) return;
        setIsAnimating(true);
        const slider = sliderRef.current;
        const cards = Array.from(slider.querySelectorAll('.card'));
        const firstCard = cards.shift();
        const tl = gsap.timeline();
        tl.to(firstCard, {
            y: '-=50%',
            duration: 0.75,
            ease: 'power3.in',
            onStart: () => {
                setTimeout(() => {
                    slider.append(firstCard);
                    finishCardTransition('prev');
                }, 300);
            },
        });
        tl.to(firstCard, {
            opacity: 0,
        });
    }

    function showNext() {
        if (isAnimating) return;
        setIsAnimating(true);
        const slider = sliderRef.current;
        const cards = Array.from(slider.querySelectorAll('.card'));
        const lastCard = cards.pop();
        const tl = gsap.timeline();
        tl.to(lastCard, {
            y: '-=300%',
            duration: 0.5,
            ease: 'power3.inOut',
            onStart: () => {
                setTimeout(() => {
                    slider.prepend(lastCard);
                    finishCardTransition('next');
                }, 300);
            },
        });
        tl.to(
            lastCard,
            {
                opacity: 0,
            },
            0.3
        );
    }

    function handleClick(event) {
        console.log(event, window);
        const {innerHeight} = window;
        const {clientX} = event
        if (clientX > innerHeight/2) {
            showNext();
        } else if (clientX <= innerHeight/2) {
            showPrev();
        }
    }

    function handleMouseWheel(event) {
        if (isAnimating) return;
        currDelta += event.deltaY * -0.01;
        // Restrict currDelta
        currDelta = Math.min(Math.max(minDelta, currDelta), maxDelta);
        if (currDelta === minDelta) {
            showNext();
        } else if (currDelta === maxDelta) {
            showPrev();
        } else {
            // do nothing
        }
    }

    return (
        <>
            <div
                className='relative h-screen w-screen overflow-hidden'
                onClick={handleClick}
                // onWheel={(e) => handleMouseWheel(e)}
            >
                <div
                    ref={sliderRef}
                    className={cn(
                        styles.slider,
                        'absolute bottom-[5vh] w-screen h-screen overflow-hidden'
                    )}
                >
                    {showcasePhotos.slice(0, 10).map((photo, index) => {
                        return (
                            <Link
                                href={photo.projectUrl}
                                onClick={(e) => e.stopPropagation()}
                                className={cn(
                                    styles.card,
                                    'card absolute bottom-5 left-1/2 w-[65%] max-w-[50vw] max-h-[400px] bg-transparent border-r-1 border-solid border-gray-600 rounded overflow-hidden flex flex-col'
                                )}
                            >
                                <div className='card-content relative '>
                                    <Image
                                        src={photo.url}
                                        alt={`Project photo for ${photo.title}`}
                                        className={cn(
                                            'object-cover w-full h-[350px]'
                                        )}
                                        key={`${index}_projectImage`}
                                        width={1080}
                                        height={1280}
                                        loading={'lazy'}
                                    />
                                </div>
                                <div className='card-info w-full py-[0.5em] px-[0.75em] flex justify-between items-baseline bg-transparent z-2'>
                                    <span className='card-item flex-1 text-left'>
                                        {photo.locationName}
                                    </span>
                                    <span className='card-item flex-1 text-center text-lg'>
                                        {photo.Project.title}&nbsp;{index}
                                    </span>
                                    <span className='card-item flex-1 text-right'>
                                        {photo.Project.createdAt.toDateString()}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
