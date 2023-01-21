import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../components/layout";
import { useBreakpoint } from "../../context/breakpointContext";
import {
   getAllProjectIds,
   getAllProjects,
   getProjectData,
   getAssets,
} from "../../lib/projectsLib";
import { Container, Flex } from "../../styles/globalStyles";
import {
   ImagesWrapper,
   LinkWrapper,
   Info,
   StyledSwiperWrapper,
   StyledSwiperNavBtn,
} from "../../styles/projectStyles";
import {
   projectsContainer__motion,
   project__motion,
} from "../../framer/variants";
import {
   useGlobalDispatchContext,
   useGlobalStateContext,
} from "../../context/globalContext";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
   Navigation,
   Pagination,
   Autoplay,
   Controller,
   Keyboard,
   Mousewheel,
   FreeMode,
} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faPlay,
   faStop,
   faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

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
   projectPictures.map((el) => {
      if (el.pic === projectData.coverPic) {
         el.background = true;
      }
   });

   return {
      props: {
         projectID,
         projects,
         projectData,
         projectPictures,
      },
   };
}

export default function work({
   projectID,
   projects,
   projectData,
   projectPictures,
   setLoading,
}) {
   const dispatch = useGlobalDispatchContext();
   const { cursorStyles } = useGlobalStateContext();
   const breakpoints = useBreakpoint();
   const elRef = useRef();
   const swiperRef = useRef(null);
   const containerRef = useRef(null);
   const [nextProj, showNext] = useState(false);
   const [prevProj, showPrev] = useState(false);
   const [linkIndex, setLinkIndex] = useState(1);
   const [play, setplay] = useState(false);
   const [pics, setpics] = useState(null);
   const [loadStatus, setLoadStatus] = useState(0);
   const [ready, setReady] = useState(false);

   const router = useRouter();

   const getProjectIndex = () => {
      let index = projects.findIndex((el) => el.id === projectID);
      showNext(true);
      showPrev(true);
      if (index === 0) {
         showPrev(false);
      }
      if (index === projects.length - 1) {
         showNext(false);
      }
      setLinkIndex(index);
   };

   useEffect(() => {
      const handleRouteChange = () => {
         window.scrollTo(0, 0);
         setLoadStatus(0);
         //  setReady(false);
         if (swiperRef && swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.update();
            swiperRef.current.swiper.slideTo(0);
         }
      };
      router.events.on("routeChangeComplete", () => handleRouteChange());
      // setLoading(false);
   }, []);

   useEffect(() => {
      getProjectIndex();
      onCursor();
      setplay(false);
   }, [projectID]);

   useEffect(() => {
      console.log(projectPictures);
      setpics((prev) => [...projectPictures, null]);
   }, [projectPictures]);

   useEffect(() => {
      if (ready === true) {
         setLoading(false);
         if (containerRef && containerRef.current) {
            containerRef.current.scrollIntoView();
         }
      }
   }, [ready]);

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
      dispatch({ type: "CURSOR_TYPE", cursorType: cursorType });
   };
   setLoading(false);
   console.log(breakpoints);

   return (
      <Layout projects={projects}>
         <Container fluid>
            <div
               style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  width: "100vw",
               }}
            >
               <ImagesWrapper
                  ref={elRef}
                  variants={projectsContainer__motion}
                  initial="hidden"
                  animate="show"
                  exit="exit"
               >
                  <Swiper
                     className="mySwiperID"
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
                        nextEl: ".nextBtn",
                        prevEl: ".prevBtn",
                     }}
                     pagination={{
                        el: ".swiper-mypagination",
                        clickable: true,
                        type: "progressbar",
                        background: "#fff",
                     }}
                     scrollbar={{ draggable: true }}
                     keyboard={{
                        enabled: true,
                     }}
                     freeMode={true}
                     mousewheel={{
                        releaseOnEdges: true,
                     }}
                     slidesPerView={"auto"}
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
                                 className="mySwiperSlide"
                              >
                                 <Image
                                    src={`${el?.pic}`}
                                    //  onLoadingComplete={() => {
                                    //     setLoadStatus((prev) => prev + 1);
                                    //  }}
                                    key={`${index}_project_projectPlrg`}
                                    alt={el?.name}
                                    width={breakpoints.md ? 400 : 1080}
                                    height={breakpoints.md ? 620 : 1280}
                                    // fill
                                    // placeholder="empty"
                                    // priority={true}
                                    // sizes="(max-width: 768px) 100vw,
                                    //   (max-width: 1200px) 50vw,
                                    //   33vw"
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
                        small={breakpoints.md ? "Yes" : "No"}
                        onMouseEnter={() => onCursor("pointertheme")}
                        onMouseLeave={onCursor}
                     >
                        <div className="name">
                           {projects[
                              (linkIndex + 1) % projects.length
                           ].name.toUpperCase()}
                        </div>
                        <FontAwesomeIcon icon={faArrowRight} />
                     </LinkWrapper>
                  </Link>
               </ImagesWrapper>

               <Info small={breakpoints.md ? "Yes" : "No"}>
                  <motion.div className="name" variants={project__motion}>
                     {projectData.name.toUpperCase()}
                  </motion.div>
                  <motion.div className="more">
                     {projectData.category !== "Photoshoot" && (
                        <motion.div
                           className="category"
                           variants={project__motion}
                        >
                           {projectData.category.toUpperCase()}
                        </motion.div>
                     )}
                     <motion.div className="desc" variants={project__motion}>
                        {projectData.desc.toUpperCase()}
                     </motion.div>
                  </motion.div>
               </Info>
            </div>
         </Container>
      </Layout>
   );
}

// <Container fluid>
//    <ImagesWrapperSmall
//       variants={projectsContainer__motion}
//       initial="hidden"
//       animate="show"
//       exit="exit"
//    >
//       <Info ref={containerRef}>
//          <motion.div className="name" variants={project__motion}>
//             {projectData.name}
//          </motion.div>
//          {projectData.category !== "Photoshoot" && (
//             <motion.div className="name" variants={project__motion}>
//                {projectData.category}
//             </motion.div>
//          )}
//          <motion.div className="desc" variants={project__motion}>
//             {projectData.desc}
//          </motion.div>
//       </Info>
//       <ImagesContainer>
//          {pics.map((el, index) => {
//             return el !== null ? (
//                <motion.div
//                   key={`id_${projectData.id}_${index}_img_div_sml`}
//                   className="projectImageWrapper"
//                   variants={project__motion}
//                >
//                   <StyledImgWrapper
//                      layoutId={el.background && `${projectID}_pic`}
//                      key={`${index}_project_projectP__sml`}
//                      variants={project__motion}
//                      AR={el.width / el.height}
//                   >
//                      <Image
//                         src={`${el.pic}`}
//                         onLoadingComplete={() => {
//                            setLoadStatus((prev) => prev + 1);
//                         }}
//                         alt={el.name}
//                         width={el.width}
//                         height={el.height}
//                         placeholder="empty"
//                         priority={true}
//                         layout="responsive"
//                      ></Image>
//                   </StyledImgWrapper>
//                </motion.div>
//             ) : (
//                <motion.div
//                   key={`id_${projectData.id}_${index}_null_div_sml`}
//                   className="endDiv"
//                ></motion.div>
//             );
//          })}
//       </ImagesContainer>
//    </ImagesWrapperSmall>
// </Container>
{
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
            )} */
}
{
   /* <StyledSwiperWrapper>
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
                     </StyledSwiperWrapper> */
}
