import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Keyboard } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
   StyledSwiperWrapper,
   StyledSwiperNavBtn,
   StyledSwiperPagination,
} from '../styles/projectStyles';
import { useBreakpoint } from '../context/breakpointContext';
import {
   useGlobalDispatchContext,
   useGlobalStateContext,
} from '../context/globalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faStop,
   faPlay,
   faArrowRight,
   faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { Container, Flex } from '../styles/globalStyles';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { imageViewerControls, imageViewer } from '../framer/variants';

export default function ImageViewer({
   images = [],
   currentImage = 0,
   showViewer,
}) {
   const [play, setplay] = useState(false);
   const modalSwiperRef = useRef(null);

   const breakpoints = useBreakpoint();
   const dispatch = useGlobalDispatchContext();
   const { cursorStyles } = useGlobalStateContext();
   const onCursor = (cursorType) => {
      cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;
      dispatch({ type: 'CURSOR_TYPE', cursorType: cursorType });
   };

   const handlePlayPause = () => {
      setplay(!play);
      if (modalSwiperRef && modalSwiperRef.current) {
         play
            ? modalSwiperRef.current.swiper.autoplay.stop()
            : modalSwiperRef.current.swiper.autoplay.start();
      }
   };

   useEffect(() => {
      if (modalSwiperRef && modalSwiperRef.current?.swiper) {
         modalSwiperRef.current.swiper.slideTo(currentImage);
      }
   }, []);

   document.body.onkeyup = function (e) {
      if (e.key == ' ' || e.code == 'Space') {
         handlePlayPause();
      }
   };

   return (
      <Container
         // id='modalContainer'
         key={'modalContainer'}
         onClick={() => showViewer(false)}
         className='imageViewerContainer'
         variants={imageViewer}
         initial='hidden'
         animate='show'
         exit='exit'
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
            // rewind={true}
         >
            {images.map((el, index) => {
               return (
                  <SwiperSlide
                     key={`swiperSlideModal_${index}`}
                     className='swiperSlideModal'
                  >
                     {/* {el} */}
                     {/* <div */}
                     {/* // style={{ */}
                     {/* //    width: 'fit-content' */}
                     {/* // }} */}
                     {/* // > */}
                     <Image
                        onClick={(e) => e.stopPropagation()}
                        src={`${el?.pic}`}
                        key={`${index}_project_modal`}
                        alt={el?.name}
                        width={1080}
                        height={1280}
                        loading={'eager'}
                        // onLoadingComplete={() => {
                        //    if (index === projectPictures.length - 1)
                        //       setLoading(false);
                        // }}
                     ></Image>
                     {/* // </div> */}
                  </SwiperSlide>
               );
            })}
         </Swiper>
         <StyledSwiperWrapper
            variants={imageViewerControls}
            initial='hidden'
            animate='show'
            exit='exit'
            onClick={(e) => e.stopPropagation()}
         >
            <Flex>
               {!play ? (
                  <FontAwesomeIcon
                     icon={faPlay}
                     onMouseEnter={() => onCursor('pointertheme')}
                     onMouseLeave={onCursor}
                     onClick={(e) => {
                        handlePlayPause();
                     }}
                  />
               ) : (
                  <FontAwesomeIcon
                     icon={faStop}
                     onMouseEnter={() => onCursor('pointertheme')}
                     onMouseLeave={onCursor}
                     onClick={(e) => {
                        handlePlayPause();
                     }}
                  />
               )}
            </Flex>
            <StyledSwiperPagination className='swiper-mypagination'></StyledSwiperPagination>
            <Flex flexCenter gap={'2em'}>
               <StyledSwiperNavBtn
                  className='prevBtn'
                  onMouseEnter={() => onCursor('pointertheme')}
                  onMouseLeave={onCursor}
               >
                  <FontAwesomeIcon icon={faArrowLeft} />
               </StyledSwiperNavBtn>
               <StyledSwiperNavBtn
                  className='nextBtn'
                  onMouseEnter={() => onCursor('pointertheme')}
                  onMouseLeave={onCursor}
               >
                  <FontAwesomeIcon icon={faArrowRight} />
               </StyledSwiperNavBtn>
            </Flex>
         </StyledSwiperWrapper>
      </Container>
      // </motion.div>
   );
}
