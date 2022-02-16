import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useBreakpoint } from "../../context/breakpointContext";
import Layout from "../../components/layout";
import Link from "next/link";
import {
    getAllProjectIds,
    getAllProjects,
    getProjectData,
    getAssets,
} from "../../lib/projectsLib";
import projectsPageStyles from "../../styles/ID.module.css";
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
//FRAMER IMPORTS
import { motion } from "framer-motion";
import { Container, Flex } from "../../styles/globalStyles";
import {
    ImagesWrapper,
    PrevLink,
    NextLink,
    Links,
    ImagesWrapperSmall,
    ImagesContainer,
    Info,
    StyledSwiperImg,
    StyledSwiperPagination,
    StyledSwiperNavBtn,
    StyledSwiperWrapper,
} from "../../styles/projectStyles";
import {
    projectsContainer__motion,
    project__motion,
} from "../../framer/variants";
import {
    useGlobalDispatchContext,
    useGlobalStateContext,
} from "../../context/globalContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import the icons you need
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { ref } from "firebase/storage";

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
}) {
    const dispatch = useGlobalDispatchContext();
    const { cursorStyles } = useGlobalStateContext();
    const breakpoints = useBreakpoint();
    const elRef = useRef();
    const swiperRef = useRef(null);
    const [nextProj, showNext] = useState(false);
    const [prevProj, showPrev] = useState(false);
    const [linkIndex, setLinkIndex] = useState(1);
    const [display, setDisplay] = useState(true);
    const [play, setplay] = useState(false);

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

    const nextPage = () => {
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        getProjectIndex();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);

    const handlePlayPause = () => {
        setplay(!play);
        if (swiperRef && swiperRef.current) {
            console.log(swiperRef.current.swiper.autoplay);
            play
                ? swiperRef.current.swiper.autoplay.stop()
                : swiperRef.current.swiper.autoplay.start();
        }
    };

    const onCursor = (cursorType) => {
        cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;
        dispatch({ type: "CURSOR_TYPE", cursorType: cursorType });
    };
    
    return (
        <Layout projects={projects}>
            {display ? (
                !breakpoints.md ? (
                    <Container fluid>
                        <ImagesWrapper
                            ref={elRef}
                            variants={projectsContainer__motion}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                        >
                            <StyledSwiperWrapper>
                                <Flex>
                                    {!play ? (
                                        <FontAwesomeIcon
                                            icon={faPlay}
                                            onMouseEnter={() =>
                                                onCursor("pointertheme")
                                            }
                                            onMouseLeave={onCursor}
                                            onClick={() => handlePlayPause()}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={faStop}
                                            onMouseEnter={() =>
                                                onCursor("pointertheme")
                                            }
                                            onMouseLeave={onCursor}
                                            onClick={() => handlePlayPause()}
                                        />
                                    )}
                                    {/* <FontAwesomeIcon icon={faPause} /> */}
                                </Flex>
                                <Flex grow>
                                    <StyledSwiperPagination className="swiper-mypagination"></StyledSwiperPagination>
                                </Flex>
                                <Flex width={"20%"} flexCenter>
                                    <StyledSwiperNavBtn
                                        left
                                        className="prevBtn"
                                        onMouseEnter={() =>
                                            onCursor("pointertheme")
                                        }
                                        onMouseLeave={onCursor}
                                    ></StyledSwiperNavBtn>
                                    <StyledSwiperNavBtn
                                        right
                                        className="nextBtn"
                                        onMouseEnter={() =>
                                            onCursor("pointertheme")
                                        }
                                        onMouseLeave={onCursor}
                                    ></StyledSwiperNavBtn>
                                </Flex>
                            </StyledSwiperWrapper>

                            <Swiper
                                className="mySwiperID"
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
                                autoplay={
                                    play === true
                                        ? {
                                              delay: 2000,
                                              disableOnInteraction: false,
                                          }
                                        : false
                                }
                            >
                                <SwiperSlide
                                    key={`desc_slide_lrg`}
                                    className="mySwiperSlide__info"
                                >
                                    <Info>
                                        <motion.div
                                            className="name"
                                            variants={project__motion}
                                        >
                                            {projectData.name}
                                        </motion.div>
                                        <motion.div
                                            className="desc"
                                            variants={project__motion}
                                        >
                                            {projectData.desc}
                                        </motion.div>
                                    </Info>
                                </SwiperSlide>
                                {projectPictures.map((el, index) => {
                                    return (
                                        <SwiperSlide
                                            key={`${index}_slide_lrg`}
                                            className="mySwiperSlide"
                                        >
                                            <StyledSwiperImg
                                                layoutId={
                                                    el.background &&
                                                    `${projectID}_pic`
                                                }
                                                key={`${index}_project_pics_lrg`}
                                                src={el.pic}
                                                variants={
                                                    !el.background &&
                                                    project__motion
                                                }
                                            ></StyledSwiperImg>
                                        </SwiperSlide>
                                    );
                                })}
                                <SwiperSlide
                                    key={`desc_slide_lrg_end`}
                                    className="mySwiperSlide__end"
                                >
                                    <motion.div
                                        className={
                                            projectsPageStyles.project__end
                                        }
                                    ></motion.div>
                                </SwiperSlide>
                            </Swiper>
                        </ImagesWrapper>
                    </Container>
                ) : (
                    <Container fluid>
                        <ImagesWrapperSmall
                            variants={projectsContainer__motion}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                        >
                            <Info>
                                <motion.div
                                    className="name"
                                    variants={project__motion}
                                >
                                    {projectData.name}
                                </motion.div>
                                <motion.div
                                    className="desc"
                                    variants={project__motion}
                                >
                                    {projectData.desc}
                                </motion.div>
                            </Info>
                            <ImagesContainer>
                                {projectPictures.map((el, index) => {
                                    return (
                                        <motion.div
                                            key={`id_${projectData.id}_img_div_sml`}
                                            className="projectImageWrapper"
                                            variants={project__motion}
                                        >
                                            <img
                                                src={el.pic}
                                                className="image"
                                            ></img>
                                        </motion.div>
                                    );
                                })}
                            </ImagesContainer>
                        </ImagesWrapperSmall>
                    </Container>
                )
            ) : (
                <motion.img
                    src={projectData.coverPic}
                    className={projectsPageStyles.trans__img}
                    layoutId={`${projectID}_pic`}
                ></motion.img>
            )}
            <Links>
                {prevProj && (
                    <Link href={`/project/${projects[linkIndex - 1].id}`}>
                        <PrevLink onClick={nextPage}>
                            <div>PREV</div>
                            <div className="name">
                                {projects[linkIndex - 1].name}
                            </div>
                        </PrevLink>
                    </Link>
                )}
                {nextProj && (
                    <NextLink
                        href={`/project/${projects[linkIndex + 1].id}`}
                        onClick={nextPage}
                    >
                        <div>NEXT</div>
                        <div className="name">
                            {projects[linkIndex + 1].name}
                        </div>
                    </NextLink>
                )}
            </Links>
        </Layout>
    );
}
