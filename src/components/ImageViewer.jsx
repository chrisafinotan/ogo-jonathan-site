import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
    Navigation,
    Pagination,
    Keyboard,
    Autoplay,
    Mousewheel,
    FreeMode,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Icons } from '@/components/icons';

export const ImageViewer = ({ images = [], currentImage = 0, showViewer }) => {
    const [play, setplay] = useState(false);
    const modalSwiperRef = useRef(null);

    const handlePlayPause = () => {
        setplay(!play);
        if (modalSwiperRef && modalSwiperRef.current) {
            play
                ? modalSwiperRef.current.swiper.autoplay.stop()
                : modalSwiperRef.current.swiper.autoplay.start();
        }
    };

    document.body.onkeyup = function (e) {
        if (e.key == ' ' || e.code == 'Space') {
            handlePlayPause();
        }
    };

    return (
        <div
            key='modalContainer'
            onClick={() => showViewer(false)}
            className='imageViewerContainer'
            // variants={imageViewer}
            // initial='hidden'
            // animate='show'
            // exit='exit'
        >
            <div
                onClick={() => showViewer(false)}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    opacity: '0.5',
                }}
            ></div>
            <Swiper
                className='onClickSwiper'
                initialSlide={currentImage}
                modules={[Navigation, Pagination, Keyboard, Autoplay]}
                navigation={{
                    nextEl: '.nextBtn',
                    prevEl: '.prevBtn',
                }}
                pagination={{
                    el: '.swiper-mypagination',
                    type: 'progressbar',
                    background: '#fff',
                }}
                keyboard={{
                    enabled: true,
                }}
                slidesPerView={1}
                ref={modalSwiperRef}
                autoplay={
                    play === true
                        ? {
                              delay: 800,
                              disableOnInteraction: false,
                          }
                        : false
                }
                spaceBetween={12}
                onClick={() => showViewer(false)}
                loop={true}
            >
                {images.map((el, index) => {
                    return (
                        <SwiperSlide
                            key={`swiperSlideModal_${index}`}
                            className='swiperSlideModal'
                        >
                            {el}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <StyledSwiperWrapper
                // variants={imageViewerControls}
                // initial='hidden'
                // animate='show'
                // exit='exit'
                onClick={(e) => e.stopPropagation()}
            >
                <div>
                    {!play ? (
                        <Icons.play onClick={(e) => handlePlayPause()} />
                    ) : (
                        <Icons.stop onClick={(e) => handlePlayPause()} />
                    )}
                </div>
                <StyledSwiperPagination className='swiper-mypagination'></StyledSwiperPagination>
                <div className='flex gap-2 justify-center content-center'>
                    <StyledSwiperNavBtn className='prevBtn'>
                        <Icons.arrowLeft />
                    </StyledSwiperNavBtn>
                    <StyledSwiperNavBtn className='nextBtn'>
                        <Icons.arrow />
                    </StyledSwiperNavBtn>
                </div>
            </StyledSwiperWrapper>
        </div>
    );
};

export const StyledSwiperWrapper = () => {
    <div></div>;
};
// = styled(motion.div)`
//    display: flex;
//    height: 30px;
//    svg {
//       width: 50px;
//       height: 100%;
//       path {
//          fill: ${(props) => props.theme.text};
//       }
//    }
//    justify-content: center;
// `;

export const StyledSwiperPagination = () => {
    <div></div>;
};
// = styled.div`
//    max-width: 600px;
//    align-self: center;
//    height: 5px !important;
//    position: relative !important;
//    width: 100%;
//    svg {
//       width: 3rem;
//       height: 3rem;
//       path {
//          fill: ${(props) => props.theme.main};
//       }
//    }
// `;

export const StyledSwiperNavBtn = () => {
    <div></div>;
};

//  styled.div`
//    height: 25px;
//    background: transparent;
//    transition: all 200ms ease;
//    &.swiper-button-disabled {
//       opacity: 0;
//    }
//    svg {
//       fill: ${(props) => props.theme.main};
//    }
//    :hover {
//       svg {
//          fill: ${(props) => props.theme.main};
//       }
//    }
// `;

export const ImagesWrapper = () => {
    <div></div>;
};
//  styled(motion.div)`
//    color: ${(props) => props.theme.text};
//    display: flex;
//    align-self: center;
//    overflow-x: auto;
//    height: 100%;
//    // max-height: 80vh;
//    // min-height: 80vh;
//    width: 100%;
//    isolation: isolate;
//    flex-basis: fit-content;
//    flex-grow: 1;
//    position: relative;
// `;

export const Info = () => {
    <div></div>;
};
// styled(motion.div)`
//    color: ${(props) => props.theme.text};
//    scroll-snap-align: start;
//    display: grid;
//    grid-template-columns: 1fr 1fr;
//    // max-height: 20vh;
//    // min-height: 20vh;
//    // height: 100%;
//    margin: 12px;
//    pointer-events: none;
//    box-sizing: content-box;

//    .name {
//       left: 0%;
//       width: 100%;
//       height: fit-content;
//       overflow: hidden;
//       text-overflow: ellipsis;
//       font-size: 3rem;
//       // white-space: pre-line;
//       -webkit-line-clamp: 3;
//       -webkit-box-orient: vertical;
//       display: -webkit-box;
//       text-align: center;
//       color: ${(props) => props.theme.text};
//    }
//    .more {
//       padding: 12px;
//       box-sizing: border-box;
//    }
//    .category {
//       opacity: 0.5;
//       font-size: 0.75rem;
//    }
//    .desc {
//       padding-top: 16px;
//       width: 100%;
//    }
//    ${(props) =>
//       props.small === 'Yes' &&
//       css`
//          grid-template-columns: none;
//          .name {
//             font-size: 2rem;
//          }
//          .more {
//             font-size: 1rem;
//          }
//       `};
// `;

export const StyledLink = () => {
    <a></a>;
};

// styled(motion.a)`
//    // border: 1px solid yellow;
//    max-width: 480px;
//    // min-width: 320px;
//    height: 2rem;
//    position: absolute;
//    bottom: 16px;
//    right: 16px;
//    display: block;
//    z-index: 10;
//    @media (max-width: 840px) {
//       max-width: 20vw;
//    }
// `;

export const LinkWrapper = (
    <div className='grid grid-cols-[1fr_32px] gap-[8px]'></div>
);
//    display: grid;
//    align-items: center;
//    grid-template-columns: 1fr 32px;
//    color: ${(props) => props.theme.text};
//    background-color: ${(props) => props.theme.background};
//    font-size: 1.5rem;
//    gap: 8px;
//    @media (max-width: 840px) {
//       font-size: 12px;
//    }
//    .svg {
//       font-size: 0.5rem;
//       right: 0px;
//    }
//    .name {
//       padding: 0 8px;
//       overflow: hidden;
//       text-overflow: ellipsis;
//       white-space: nowrap;
//       text-align: center;
//    }
//    ${(props) =>
//       props.small === 'Yes' &&
//       css`
//          font-size: 0.75rem;
//       `};
// `;
