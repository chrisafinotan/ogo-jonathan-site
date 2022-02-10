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
            ease: [0.6, 0.01, -0.05, 0.95],
            duration: 1.7,
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
    const [nextProj, showNext] = useState(false);
    const [prevProj, showPrev] = useState(false);
    const [linkIndex, setLinkIndex] = useState(1);
    const [display, setDisplay] = useState(true);

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
        console.log("page reload", window.location.href);
    }, []);
    console.log("reloaded", projectPictures, projectData);

    return (
        <Layout projects={projects}>
            {display ? (
                !breakpoints.md ? (
                    <div className={projectsPageStyles.container__lrg}>
                        <motion.div
                            ref={elRef}
                            className={
                                projectsPageStyles.projectImagesWrapper__lrg
                            }
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
                                            {projectData.name}
                                        </motion.div>
                                        <motion.div
                                            className={
                                                projectsPageStyles.project__desc__lrg
                                            }
                                            variants={project__motion}
                                        >
                                            {projectData.desc}
                                        </motion.div>
                                    </motion.div>
                                </SwiperSlide>
                                {projectPictures.map((el, index) => {
                                    return (
                                        <SwiperSlide
                                            key={`${index}_slide_lrg`}
                                            className="mySwiperSlide"
                                        >
                                            <motion.img
                                                layoutId={
                                                    el.background &&
                                                    `${projectID}_pic`
                                                }
                                                key={`${index}_project_pics_lrg`}
                                                src={el.pic}
                                                className={
                                                    projectsPageStyles.image__lrg
                                                }
                                                variants={
                                                    !el.background &&
                                                    project__motion
                                                }
                                            ></motion.img>
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

                            {prevProj && (
                                <Link
                                    href={`/projects/${
                                        projects[linkIndex - 1].id
                                    }`}
                                >
                                    <a
                                        className={
                                            projectsPageStyles.projectNavigator__prev
                                        }
                                        onClick={nextPage}
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
                                // <Link
                                //     href={`/projects/${
                                //         projects[linkIndex + 1].id
                                //     }`}
                                // >
                                <a
                                    className={
                                        projectsPageStyles.projectNavigator__next
                                    }
                                    href={`/projects/${
                                        projects[linkIndex + 1].id
                                    }`}
                                    // onClick={nextPage}
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
                                // </Link>
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
                        <motion.div
                            className={projectsPageStyles.project__info}
                        >
                            <motion.div
                                className={projectsPageStyles.project__name}
                                variants={project__motion}
                            >
                                {projectData.name}
                            </motion.div>
                            <motion.div
                                className={projectsPageStyles.project__desc}
                                variants={project__motion}
                            >
                                {projectData.desc}
                            </motion.div>
                        </motion.div>
                        <motion.div
                            className={projectsPageStyles.projectImagesWrapper}
                        >
                            {projectPictures.map((el, index) => {
                                return (
                                    <motion.div
                                        key={`id_${projectData.id}_img_div_sml`}
                                        className={
                                            projectsPageStyles.projectImageWrapper
                                        }
                                        variants={project__motion}
                                    >
                                        <img
                                            // key={`id_${projectData.id}_pic_sml`}
                                            src={el.pic}
                                            className={projectsPageStyles.image}
                                        ></img>
                                    </motion.div>
                                );
                            })}
                            {prevProj && (
                                <Link
                                    href={`/projects/${
                                        projects[linkIndex - 1].id
                                    }`}
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
                                    href={`/projects/${
                                        projects[linkIndex + 1].id
                                    }`}
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
                )
            ) : (
                <motion.img
                    src={projectData.coverPic}
                    className={projectsPageStyles.trans__img}
                    // animate={{ scale: 1.2 }}
                    layoutId={`${projectID}_pic`}
                ></motion.img>
            )}
        </Layout>
    );
}
