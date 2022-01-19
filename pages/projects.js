import { useEffect, useRef, useState } from "react";
import { useBreakpoint } from "../components/Breakpoint";
import Layout from "../components/layout";
import CDiv from "../components/CDiv";
import { getAllProjects } from "../lib/projectsLib";
import projectsPageStyles from "../styles/Projects.module.css";

import { projectStorage } from "../firebase/fire-config";
import { ref, getDownloadURL } from "firebase/storage";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
    Navigation,
    Pagination,
    EffectCreative,
    Autoplay,
    Controller,
    Keyboard,
} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
//FRAMER IMPORTS
import { motion } from "framer-motion";

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

    useEffect(() => {
        if (swiperRef.current !== null && !breakpoints.md)
            swiperRef.current.swiper.slideTo(activeProject, 0, 1);
    }, [activeProject]);

    return (
        <Layout>
            <Head>
                <title>Projects</title>
            </Head>
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
                            cssMode={true}
                            className={projectsPageStyles.mySwiper}
                            modules={[Navigation, Pagination, Controller]}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                            ref={swiperRef}
                            // onSwiper={setFirstSwiper}
                            // controller={getcontrol}
                            keyboard={{
                                enabled: true,
                            }}
                        >
                            {images.map((el, index) => {
                                return (
                                    <SwiperSlide key={`${index}_slide_lrg`}>
                                        <Image
                                            key={`${el.id}_${index}_pics_lrg`}
                                            src={el.pic && el.pic}
                                            className={
                                                projectsPageStyles.projects__swiper__image
                                            }
                                            // width={1440}
                                            // height={1440}
                                            layout="fill"
                                        ></Image>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </motion.div>
                    <motion.div className={projectsPageStyles.projectList}>
                        <motion.div
                            className={projectsPageStyles.projectList__header}
                            variants={project__motion}
                        >
                            PROJECTS
                        </motion.div>
                        {projects.map((el, index) => {
                            return (
                                <motion.div
                                    key={`${el}_${index}_projects_lrg`}
                                    className={`${projectsPageStyles.projectContainer}`}
                                    variants={project__motion}
                                >
                                    <Link href={`/projects/${el.id}`}>
                                        <a>
                                            <div>
                                                <CDiv
                                                    onMouseEnter={(val) =>
                                                        setCurrent(val)
                                                    }
                                                    className={`${projectsPageStyles.project}`}
                                                    text={
                                                        <div
                                                            className={`${projectsPageStyles.project__content}`}
                                                        >
                                                            <div>{el.name}</div>
                                                            <div
                                                                className={
                                                                    projectsPageStyles.date
                                                                }
                                                            >
                                                                {el.formatdate}
                                                            </div>
                                                        </div>
                                                    }
                                                    startColor="#000000"
                                                    color="#000000"
                                                    index={index}
                                                ></CDiv>
                                            </div>
                                        </a>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </motion.div>
            ) : (
                <motion.div
                  
                    className={projectsPageStyles.projectWrapper}
                >
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
                                            <motion.div
                                                className={
                                                    projectsPageStyles.date
                                                }
                                                variants={project__motion}
                                            >
                                                {projects[index].formatdate}
                                            </motion.div>
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
