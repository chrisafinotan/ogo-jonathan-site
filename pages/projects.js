import { useEffect, useRef, useState } from "react";
import { useBreakpoint } from "../components/Breakpoint";
import Layout from "../components/layout";
import CDiv from "../components/CDiv";
import { getAllProjects } from "../lib/projectsLib";
import projectsPageStyles from "../styles/Projects.module.css";

import { projectStorage } from "../firebase/fire-config";
import { ref, getDownloadURL } from "firebase/storage";

import Link from "next/link";

import CSpan from "../components/CSpan";
// import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
    Navigation,
    Pagination,
    EffectCreative,
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
import ReactTooltip from "react-tooltip";

SwiperCore.use([
    Pagination,
    Navigation,
    Autoplay,
    EffectCreative,
    Keyboard,
    Controller,
]);

export async function getStaticProps() {
    let projects = await getAllProjects();
    return {
        props: { projects },
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

export default function Projects({ projects }) {
    
    const swiperRef = useRef(null);
    const breakpoints = useBreakpoint();
    const [activeProject, setactiveProject] = useState(0);

    //get images from storage
    const [images, setimages] = useState([]);
    const loadImages = async () => {
        let async_images = await Promise.all(
            projects.map(async (project) => {
                return {
                    id: project.id,
                    pic: await getDownloadURL(
                        ref(projectStorage, project.cover)
                    ),
                };
            })
        );
        setimages(async_images);
    };

    const setCurrent = (val) => {
        !breakpoints.md && setactiveProject(val);
    };

    useEffect(() => {
        loadImages();
    }, []);

    // useEffect(() => {
    //     if (swiperRef.current !== null && !breakpoints.md)
    //         swiperRef.current.swiper.slideTo(activeProject, 0, 1);
    // }, [activeProject]);

    return (
        <Layout>
            {!breakpoints.md ? (
                <motion.div
                    variants={projectsContainer__motion}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className={projectsPageStyles.projectWrapper}
                >
                    <motion.div
                        variants={project__motion}
                        className={projectsPageStyles.projects__swiper}
                    >
                        <Swiper
                            className="mySwiperProjects"
                            modules={[
                                Navigation,
                                Pagination,
                                Controller,
                                Mousewheel,
                                Keyboard,
                                FreeMode,
                            ]}
                            slidesPerView={3}
                            spaceBetween={50}
                            navigation
                            // pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            ref={swiperRef}
                            // freeMode={true}
                            mousewheel={{
                                releaseOnEdges: true,
                            }}
                            keyboard={{
                                enabled: true,
                            }}
                            loop={true}
                            // loopedSlides={3}
                            centeredSlides={true}
                            onSlideChange={(swiper) => {
                                // console.log("slide change", swiper, [
                                //     activeProject,
                                // ]);
                                setactiveProject(swiper.realIndex);
                                ReactTooltip.hide(`tip_${swiper.realIndex}`);
                                ReactTooltip.rebuild();
                            }}
                        >
                            {projects.map((el, index) => {
                                return (
                                    <SwiperSlide key={`${index}_slide_lrg`}>
                                        <Link href={`/projects/${el.id}`}>
                                            <a
                                                className={
                                                    projectsPageStyles.projects__swiper__name
                                                }
                                                // onMouseEnter={() =>
                                                //     setactiveProject(index)
                                                // }
                                                // onMouseLeave={() =>
                                                //     setactiveProject(
                                                //         swiperRef.current.swiper
                                                //             .realIndex
                                                //     )
                                                // }
                                                data-tip={index}
                                                data-for={`tip_${index}`}
                                            >
                                                <span>
                                                    {/* {projects[index].name} */}
                                    <CSpan text={projects[index].name} />

                                                </span>
                                            </a>
                                        </Link>
                                        <ReactTooltip
                                            id={`tip_${index}`}
                                            place="top"
                                            type="dark"
                                            effect="float"
                                            disable={index === activeProject}
                                            getContent={(dataTip) => {
                                                return (
                                                    <img
                                                        src={
                                                            images[dataTip] &&
                                                            images[dataTip]
                                                                .pic &&
                                                            images[dataTip].pic
                                                        }
                                                        className={
                                                            projectsPageStyles.projects__preview_image
                                                        }
                                                    ></img>
                                                );
                                            }}
                                        />
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>

                        <motion.div
                            className={`${projectsPageStyles.projects__background}`}
                            id="background"
                        >
                            <img
                                key={`show_${activeProject}_pics_lrg`}
                                src={
                                    images[activeProject] &&
                                    images[activeProject].pic &&
                                    images[activeProject].pic
                                }
                                className={
                                    projectsPageStyles.projects__background__image
                                }
                            ></img>
                            <div
                                className={
                                    projectsPageStyles.projects__background__desc
                                }
                            >
                                <div>{projects[activeProject].desc}</div>
                                <div
                                    className={
                                        projectsPageStyles.projects__background__desc__count
                                    }
                                >{`${activeProject + 1}/${
                                    projects.length
                                }`}</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            ) : (
                <motion.div className={projectsPageStyles.projectWrapper}>
                    <Swiper
                        cssMode={true}
                        className={projectsPageStyles.mySwiper2}
                        modules={[Navigation, Pagination, Controller, Keyboard]}
                        slidesPerView={1}
                        navigation
                        pagination
                        keyboard={{
                            enabled: true,
                        }}
                    >
                        {images.map((el, index) => {
                            return (
                                <SwiperSlide key={`${index}_slide_med`}>
                                    <motion.div
                                        key={`${el}_${index}_projects_med`}
                                        className={`${projectsPageStyles.projectContainer}`}
                                        variants={projectsContainer__motion}
                                        initial="hidden"
                                        animate="show"
                                        exit="exit"
                                    >
                                        <motion.div
                                            className={
                                                projectsPageStyles.project__content
                                            }
                                        >
                                            <motion.div
                                                variants={project__motion}
                                            >
                                                {projects[index].name}
                                            </motion.div>
                                            {/* <motion.div
                                                className={
                                                    projectsPageStyles.date
                                                }
                                                variants={project__motion}
                                            >
                                                {projects[index].formatdate}
                                            </motion.div> */}
                                        </motion.div>
                                        <Link href={`/projects/${el.id}`}>
                                            <a>
                                                <motion.img
                                                    key={`${el.id}_${index}_pics_med`}
                                                    src={el.pic}
                                                    className={
                                                        projectsPageStyles.projects__swiper__image
                                                    }
                                                    variants={project__motion}
                                                ></motion.img>
                                            </a>
                                        </Link>
                                    </motion.div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </motion.div>
            )}
        </Layout>
    );
}
