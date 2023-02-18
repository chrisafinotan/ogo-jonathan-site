import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/layout';
import { useBreakpoint } from '../../context/breakpointContext';
import {
   getAllProjectIds,
   getAllProjects,
   getProjectData,
   getAssets,
} from '../../lib/projectsLib';
import { Container } from '../../styles/globalStyles';
import { ImagesWrapper, LinkWrapper, Info } from '../../styles/projectStyles';
import {
   projectsContainer__motion,
   project__motion,
} from '../../framer/variants';
import {
   useGlobalDispatchContext,
   useGlobalStateContext,
} from '../../context/globalContext';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
   Navigation,
   Pagination,
   Autoplay,
   Controller,
   Keyboard,
   Mousewheel,
   FreeMode,
} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

SwiperCore.use([Navigation, Pagination, Mousewheel, Autoplay, FreeMode]);

export async function getStaticPaths() {
   const paths = await getAllProjectIds();
   return {
      paths: paths,
      fallback: false,
   };
}

export async function getStaticProps(context) {
   const { params } = context;
   const projectID = params.id;
   const projects = await getAllProjects();
   const projectData = await getProjectData(projectID, projects);
   const projectPictures = await getAssets(projectData.files);
   return {
      props: {
         projectID,
         projects,
         projectData,
         projectPictures,
      },
   };
}

export default function Project({
   projectID,
   projects,
   projectData,
   projectPictures,
}) {
   const dispatch = useGlobalDispatchContext();
   const { cursorStyles } = useGlobalStateContext();
   const breakpoints = useBreakpoint();
   const elRef = useRef();
   const swiperRef = useRef(null);
   const containerRef = useRef(null);
   const [linkIndex, setLinkIndex] = useState(1);
   const [play, setplay] = useState(false);

   const router = useRouter();

   const getProjectIndex = () => {
      let index = projects.findIndex((el) => el.id === projectID);
      setLinkIndex(index);
   };

   useEffect(() => {
      const handleRouteChange = () => {
         window.scrollTo(0, 0);
         if (swiperRef && swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.update();
            swiperRef.current.swiper.slideTo(0);
         }
      };
      router.events.on('routeChangeComplete', () => handleRouteChange());

      if (containerRef && containerRef.current) {
         containerRef.current.scrollIntoView();
      }
   }, []);

   useEffect(() => {
      getProjectIndex();
      onCursor();
      setplay(false);
   }, [projectID]);

   const handlePlayPause = () => {
      setplay(!play);
      if (swiperRef && swiperRef.current) {
         play
            ? swiperRef.current.swiper.autoplay.stop()
            : swiperRef.current.swiper.autoplay.start();
      }
   };

   const onCursor = (cursorType) => {
      cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;
      dispatch({ type: 'CURSOR_TYPE', cursorType: cursorType });
   };

   return (
      <Layout projects={projects}>
         <Container fluid>
            <div
               style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  width: '100vw',
               }}
            >
               <ImagesWrapper
                  ref={elRef}
                  variants={projectsContainer__motion}
                  initial='hidden'
                  animate='show'
                  exit='exit'
               >
                  <Swiper
                     className='mySwiperID'
                     observer={true}
                     observeParents={true}
                     observeSlideChildren={true}
                     preloadImages={true}
                     updateOnImagesReady={true}
                     modules={[
                        Navigation,
                        Pagination,
                        Controller,
                        Mousewheel,
                        Keyboard,
                        FreeMode,
                        Autoplay,
                     ]}
                     navigation={{
                        nextEl: '.nextBtn',
                        prevEl: '.prevBtn',
                     }}
                     pagination={{
                        el: '.swiper-mypagination',
                        clickable: true,
                        type: 'progressbar',
                        background: '#fff',
                     }}
                     scrollbar={{ draggable: true }}
                     keyboard={{
                        enabled: true,
                     }}
                     freeMode={true}
                     mousewheel={{
                        releaseOnEdges: true,
                     }}
                     slidesPerView={'auto'}
                     ref={swiperRef}
                     loop={true}
                     autoplay={
                        play === true
                           ? {
                                delay: 2000,
                                disableOnInteraction: false,
                             }
                           : false
                     }
                  >
                     {projectPictures &&
                        projectPictures.map((el, index) => {
                           return (
                              <SwiperSlide
                                 key={`${index}_slide_lrg`}
                                 className='mySwiperSlide'
                              >
                                 <Image
                                    src={`${el?.pic}`}
                                    key={`${index}_project_projectPlrg`}
                                    alt={el?.name}
                                    width={breakpoints.md ? 400 : 1080}
                                    height={breakpoints.md ? 620 : 1280}
                                 ></Image>
                              </SwiperSlide>
                           );
                        })}
                  </Swiper>
                  <Link
                     href={`/project/${
                        projects[(linkIndex + 1) % projects.length].id
                     }`}
                  >
                     <LinkWrapper
                        small={breakpoints.md ? 'Yes' : 'No'}
                        onMouseEnter={() => onCursor('pointertheme')}
                        onMouseLeave={onCursor}
                     >
                        <div className='name'>
                           {projects[
                              (linkIndex + 1) % projects.length
                           ].name.toUpperCase()}
                        </div>
                        <FontAwesomeIcon icon={faArrowRight} />
                     </LinkWrapper>
                  </Link>
               </ImagesWrapper>

               <Info small={breakpoints.md ? 'Yes' : 'No'}>
                  <motion.div className='name' variants={project__motion}>
                     {projectData.name.toUpperCase()}
                  </motion.div>
                  <motion.div className='more'>
                     {projectData.category !== 'Photoshoot' && (
                        <motion.div
                           className='category'
                           variants={project__motion}
                        >
                           {projectData.category.toUpperCase()}
                        </motion.div>
                     )}
                     <motion.div className='desc' variants={project__motion}>
                        {projectData.desc.toUpperCase()}
                     </motion.div>
                  </motion.div>
               </Info>
            </div>
         </Container>
      </Layout>
   );
}

/* {prevProj && (
               <Link href={`/project/${projects[linkIndex - 1].id}`}>
                  <PrevLink
                     onMouseEnter={() => onCursor("pointertheme")}
                     onMouseLeave={onCursor}
                  >
                     <div>PREV</div>
                     <div className="name">{projects[linkIndex - 1].name}</div>
                  </PrevLink>
               </Link>
            )}
 }
 {
   <StyledSwiperWrapper>
                        <Flex>
                           {!play ? (
                              <FontAwesomeIcon
                                 icon={faPlay}
                                 onMouseEnter={() => onCursor("pointertheme")}
                                 onMouseLeave={onCursor}
                                 onClick={() => handlePlayPause()}
                              />
                           ) : (
                              <FontAwesomeIcon
                                 icon={faStop}
                                 onMouseEnter={() => onCursor("pointertheme")}
                                 onMouseLeave={onCursor}
                                 onClick={() => handlePlayPause()}
                              />
                           )}
                        </Flex>
                        <Flex grow height={"100%"}>
                           <StyledSwiperPagination className="swiper-mypagination"></StyledSwiperPagination>
                        </Flex>
                        <Flex width={"20%"} flexCenter>
                           <StyledSwiperNavBtn
                              left
                              className="prevBtn"
                              onMouseEnter={() => onCursor("pointertheme")}
                              onMouseLeave={onCursor}
                           ></StyledSwiperNavBtn>
                           <StyledSwiperNavBtn
                              right
                              className="nextBtn"
                              onMouseEnter={() => onCursor("pointertheme")}
                              onMouseLeave={onCursor}
                           ></StyledSwiperNavBtn>
                        </Flex>
                     </StyledSwiperWrapper> 
                  }
*/
