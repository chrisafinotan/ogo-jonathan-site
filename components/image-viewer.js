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

export default function ImageViewer({ images = [], currentImage = 0 }) {
   const [play, setplay] = useState(false);
   const modalSwiperRef = useRef(null);

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
      <div
         style={{
            height: '85vh',
            width: '50vw',
            borderRadius: '4px',
         }}
      >
         <Container
            backgroundColor
            style={{
               padding: '0.5rem',
               display: 'grid',
               gridTemplateColumns: '70vh, 1fr',
               flexDirection: 'column',
            }}
         >
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
            <StyledSwiperWrapper>
               <Flex>
                  {!play ? (
                     <FontAwesomeIcon
                        icon={faPlay}
                        onMouseEnter={() => onCursor('pointertheme')}
                        onMouseLeave={onCursor}
                        onClick={() => handlePlayPause()}
                     />
                  ) : (
                     <FontAwesomeIcon
                        icon={faStop}
                        onMouseEnter={() => onCursor('pointertheme')}
                        onMouseLeave={onCursor}
                        onClick={() => handlePlayPause()}
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
      </div>
   );
}
