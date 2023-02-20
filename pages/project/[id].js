import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/layout';
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
import { useBreakpoint } from '../../context/breakpointContext';
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
import ImageViewer from '../../components/image-viewer';
import Modal from 'react-modal';

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
   setLoading,
}) {
   const elRef = useRef();
   const swiperRef = useRef(null);
   const containerRef = useRef(null);
   const [linkIndex, setLinkIndex] = useState(1);
   const [viewerShowing, showViewer] = useState(false);
   const [currentImage, setCurrent] = useState(0);

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
   }, [projectID]);

   const breakpoints = useBreakpoint();
   const dispatch = useGlobalDispatchContext();
   const { cursorStyles } = useGlobalStateContext();
   const onCursor = (cursorType, cursorText) => {
      cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;
      dispatch({
         type: 'CURSOR_TYPE',
         cursorType,
         cursorText,
      });
   };

   const projectImages = projectPictures
      ? projectPictures.map((el, index) => {
           return (
              <Image
                 src={`${el?.pic}`}
                 key={`${index}_project`}
                 alt={el?.name}
                 width={breakpoints.md ? 400 : 1080}
                 height={breakpoints.md ? 620 : 1280}
                 loading={'eager'}
                 onLoadingComplete={() => {
                    if (index === projectPictures.length - 1) setLoading(false);
                 }}
              ></Image>
           );
        })
      : [];

   const toggleViewer = (currentImage = 0) => {
      setCurrent(currentImage);
      showViewer(true);
   };

   const customStyles = {
      content: {
         top: '50%',
         left: '50%',
         right: 'auto',
         bottom: 'auto',
         marginRight: '-50%',
         transform: 'translate(-50%, -50%)',
         padding: '5px',
      },
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
               onClick={() => showViewer(false)}
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
                        FreeMode,
                        Autoplay,
                     ]}
                     freeMode={true}
                     mousewheel={{
                        releaseOnEdges: true,
                     }}
                     slidesPerView={'auto'}
                     ref={swiperRef}
                     loop={true}
                  >
                     {projectPictures.map((_, index) => {
                        return (
                           <SwiperSlide
                              key={`swiperSlide_${index}`}
                              className='mySwiperSlide'
                              onClick={(e) => {
                                 e.stopPropagation();
                                 toggleViewer(index);
                              }}
                              onMouseEnter={() =>
                                 onCursor('pointertheme', 'expand')
                              }
                              onMouseLeave={onCursor}
                           >
                              {projectImages[index]}
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

         {!breakpoints.md && (
            <Modal
               isOpen={viewerShowing}
               //   onAfterOpen={afterOpenModal}
               onRequestClose={() => showViewer(false)}
               style={customStyles}
               contentLabel='Example Modal'
            >
               <ImageViewer
                  images={projectImages}
                  currentImage={currentImage}
                  showViewer={showViewer}
               />
            </Modal>
         )}
      </Layout>
   );
}
