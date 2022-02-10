import { useEffect, useRef, useState } from "react";
import { useBreakpoint } from "../context/breakpointContext";
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
    History,
} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
//FRAMER IMPORTS
import { motion } from "framer-motion";
import ReactTooltip from "react-tooltip";
import { useRouter } from 'next/router';

SwiperCore.use([
    Pagination,
    Navigation,
    Autoplay,
    EffectCreative,
    Keyboard,
    Controller,
    History,
]);

export async function getStaticProps() {
    let projects = await getAllProjects();
    return {
        props: { projects },
    };
}

const projectsContainer__motion = {
    // show: {
    //     transition: {
    //         staggerChildren: 0.4,
    //     },
    // },
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
        rotateX: 90,
        transition: {
            ease: "easeInOut",
            duration: 0.7,
        },
    },
};

export default function Projects({ projects }) {
    const breakpoints = useBreakpoint();
    const [activeProject, setactiveProject] = useState(0);
    const router = useRouter();
    console.log(router.query.slide);

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
                    <motion.div className={projectsPageStyles.projects__swiper}>
                        <Swiper
                            className="mySwiperProjects"
                            modules={[
                                Navigation,
                                Pagination,
                                Controller,
                                Mousewheel,
                                Keyboard,
                                FreeMode,
                                History,
                            ]}
                            slidesPerView={3}
                            spaceBetween={50}
                            navigation
                            scrollbar={{ draggable: true }}
                            mousewheel={{
                                releaseOnEdges: true,
                            }}
                            keyboard={{
                                enabled: true,
                            }}
                            // loop={true}
                            centeredSlides={true}
                            onSwiper={(swiper) => {
                                console.log(router.query.slide);
                                router.query.slide && swiper.slideTo(Number(router.query.slide))
                            }}
                            onSlideChange={(swiper) => {
                                setactiveProject(swiper.realIndex);
                                router.query.slide = swiper.realIndex
                            }}
                            history={{
                                key: "slide",
                                replaceState: true,
                            }}
                        >
                            {projects.map((el, index) => {
                                return (
                                    <SwiperSlide
                                        key={`${index}_slide_lrg`}
                                        data-history={index}
                                    >
                                        <Link href={`/project/${el.id}`}>
                                            <motion.a
                                                variants={project__motion}
                                                className={
                                                    projectsPageStyles.projects__swiper__name
                                                }
                                                data-tip={index}
                                                data-for={`tip_${index}`}
                                            >
                                                <span>
                                                    <CSpan
                                                        text={
                                                            projects[index].name
                                                        }
                                                    />
                                                </span>
                                            </motion.a>
                                        </Link>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>

                        <motion.div
                            className={`${projectsPageStyles.projects__background}`}
                            id="background"
                        >
                            <motion.img
                                key={`show_${activeProject}_pics_lrg`}
                                src={projects[activeProject].content}
                                className={
                                    projectsPageStyles.projects__background__image
                                }
                                layoutId={`${projects[activeProject].id}_pic`}
                            ></motion.img>
                            <motion.div
                                className={
                                    projectsPageStyles.projects__background__desc
                                }
                            >
                                <motion.div variants={project__motion}>
                                    {projects[activeProject].desc}
                                </motion.div>
                                <motion.div
                                    className={
                                        projectsPageStyles.projects__background__desc__count
                                    }
                                    variants={project__motion}
                                >{`${activeProject + 1}/${
                                    projects.length
                                }`}</motion.div>
                            </motion.div>
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
                        {projects.map((el, index) => {
                            return (
                                <SwiperSlide key={`${el.id}_slide_med`}>
                                    <motion.div
                                        key={`${el.id}_projects_med`}
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
                                                {el.name}
                                            </motion.div>
                                        </motion.div>
                                        <Link href={`/project/${el.id}`}>
                                            <a>
                                                <motion.img
                                                    key={`${el.id}_pics_med`}
                                                    src={el.content}
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
