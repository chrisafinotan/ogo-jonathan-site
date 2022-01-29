import { useState, useRef, useEffect } from "react";
import { useBreakpoint } from "../../../../components/Breakpoint";
import Layout from "../../../../components/layout";
import Head from "next/head";
import Link from "next/link";
import {
    getAllProjectIds,
    getAllProjects,
    getProjectData,
    getAssets,
} from "../../../../lib/projectsLib";
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
    const projectData = await getProjectData(projectID);
    const projectPictures = await getAssets(projectData.Files);

    return {
        props: {
            projectID,
            projects,
            projectData,
            projectPictures,
        },
    };
}

const projectsContainer__motion = {
    show: {
        transition: {
            staggerChildren: 0.4,
        },
    },
};

const project__motion = {
    hidden: {
        opacity: 0,
        y: 20,
        rotateX: -90,
    },
    show: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            ease: [0.6, 0.01, -0.05, 0.95],
            duration: 1.7,
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: {
            ease: "easeInOut",
            duration: 0.7,
        },
    },
};

export default function work({
    projectID,
    projects,
    projectData,
    projectPictures,
}) {
    const breakpoints = useBreakpoint();
    const elRef = useRef();
    const [projectPics, setPictures] = useState([]);
    const [nextProj, showNext] = useState(false);
    const [prevProj, showPrev] = useState(false);
    const [linkIndex, setLinkIndex] = useState(1);
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        setPictures(projectPictures);
        getProjectIndex();
    }, [projectPictures]);

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
    // console.log(breakpoints);
    // console.log(projectPics);
    // console.log('display', display);

    const show = () => {
        projectPics.length > 0 ? setDisplay(true) : setDisplay(false);
    };

    useEffect(() => {
        show();
    }, [projectPics]);


    return (
        <Layout>
            {display ?

            (!breakpoints.md ? (
                <div className={projectsPageStyles.container__lrg}>
                    <motion.div
                        ref={elRef}
                        className={projectsPageStyles.projectImagesWrapper__lrg}
                        variants={projectsContainer__motion}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                    >
                        <Swiper
                            className="mySwiperID"
                            // className={projectsPageStyles.mySwiper}
                            modules={[
                                Navigation,
                                Pagination,
                                Controller,
                                Mousewheel,
                                Keyboard,
                                FreeMode,
                            ]}
                            navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            keyboard={{
                                enabled: true,
                            }}
                            freeMode={true}
                            mousewheel={{
                                releaseOnEdges: true,
                            }}
                            slidesPerView={"auto"}
                            // slidesPerView={breakpoints.lg ? 4 : breakpoints.md ? 2 : 1}
                            // loop
                        >
                            <SwiperSlide
                                key={`desc_slide_lrg`}
                                className="mySwiperSlideInfo"
                            >
                                <motion.div
                                    className={
                                        projectsPageStyles.project__info__lrg
                                    }
                                >
                                    <motion.div
                                        className={
                                            projectsPageStyles.project__name__lrg
                                        }
                                        variants={project__motion}
                                    >
                                        {projectData.Name}
                                    </motion.div>
                                    <motion.div
                                        className={
                                            projectsPageStyles.project__desc__lrg
                                        }
                                        variants={project__motion}
                                    >
                                        {projectData.Description}
                                    </motion.div>
                                </motion.div>
                            </SwiperSlide>
                            {projectPics.map((el, index) => {
                                return (
                                    <SwiperSlide
                                        key={`${index}_slide_lrg`}
                                        className="mySwiperSlide"
                                    >
                                        <motion.img
                                            key={`${el}_${index}_project_pics_lrg`}
                                            src={el.pic && el.pic}
                                            className={
                                                projectsPageStyles.image__lrg
                                            }
                                            variants={project__motion}
                                        ></motion.img>
                                    </SwiperSlide>
                                );
                            })}
                            <SwiperSlide
                                key={`desc_slide_lrg_end`}
                                className="mySwiperSlide__end"
                            >
                                <motion.div
                                    className={projectsPageStyles.project__end}
                                ></motion.div>
                            </SwiperSlide>
                        </Swiper>

                        {prevProj && (
                            <Link
                                href={`/projects/${projects[linkIndex - 1].id}`}
                            >
                                <a
                                    className={
                                        projectsPageStyles.projectNavigator__prev
                                    }
                                >
                                    <div>PREV</div>
                                    <div
                                        className={
                                            projectsPageStyles.projectNavigator__prev__name
                                        }
                                    >
                                        {projects[linkIndex - 1].name}
                                    </div>
                                </a>
                            </Link>
                        )}
                        {nextProj && (
                            <Link
                                href={`/projects/${projects[linkIndex + 1].id}`}
                            >
                                <a
                                    className={
                                        projectsPageStyles.projectNavigator__next
                                    }
                                >
                                    <div>NEXT</div>
                                    <div
                                        className={
                                            projectsPageStyles.projectNavigator__prev__name
                                        }
                                    >
                                        {projects[linkIndex + 1].name}
                                    </div>
                                </a>
                            </Link>
                        )}
                    </motion.div>
                </div>
            ) : (
                <motion.div
                    className={projectsPageStyles.container}
                    variants={projectsContainer__motion}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                >
                    <motion.div className={projectsPageStyles.project__info}>
                        <motion.div
                            className={projectsPageStyles.project__name}
                            variants={project__motion}
                        >
                            {projectData.Name}
                        </motion.div>
                        <motion.div
                            className={projectsPageStyles.project__desc}
                            variants={project__motion}
                        >
                            {projectData.Description}
                        </motion.div>
                    </motion.div>
                    <motion.div
                        className={projectsPageStyles.projectImagesWrapper}
                    >
                        {projectPics.map((el) => {
                            return (
                                <motion.div
                                    className={
                                        projectsPageStyles.projectImageWrapper
                                    }
                                    variants={project__motion}
                                >
                                    <img
                                        key={`${projectData.Name}_${el.index}_pic`}
                                        src={el.pic}
                                        className={projectsPageStyles.image}
                                    ></img>
                                </motion.div>
                            );
                        })}
                        {prevProj && (
                            <Link
                                href={`/projects/${projects[linkIndex - 1].id}`}
                            >
                                <a
                                    className={
                                        projectsPageStyles.projectNavigator__prev
                                    }
                                >
                                    <div>PREV</div>
                                    {/* <div>Project</div> */}
                                    <div
                                        className={
                                            projectsPageStyles.projectNavigator__prev__name
                                        }
                                    >
                                        {projects[linkIndex - 1].name}
                                    </div>
                                </a>
                            </Link>
                        )}
                        {nextProj && (
                            <Link
                                href={`/projects/${projects[linkIndex + 1].id}`}
                            >
                                <a
                                    className={
                                        projectsPageStyles.projectNavigator__next
                                    }
                                >
                                    <div>NEXT</div>
                                    {/* <div>Project</div> */}
                                    <div
                                        className={
                                            projectsPageStyles.projectNavigator__prev__name
                                        }
                                    >
                                        {projects[linkIndex + 1].name}
                                    </div>
                                </a>
                            </Link>
                        )}
                    </motion.div>
                </motion.div>
            )) 
            : (<div>LOADING</div>)
                                    }
        </Layout>
    );
}
