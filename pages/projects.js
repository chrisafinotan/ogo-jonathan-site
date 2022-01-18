import { useEffect, useRef, useState } from "react";
import { useBreakpoint } from "../components/Breakpoint";

import { projectDB, projectStorage } from "../firebase/fire-config";
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

// install Swiper modules
SwiperCore.use([
    Pagination,
    Navigation,
    Autoplay,
    EffectCreative,
    Keyboard,
    Controller,
]);
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Layout from "../components/layout";
import CDiv from "../components/CDiv";
import projectsPageStyles from "../styles/Projects.module.css";

import { getAllProjects } from "../lib/projectsLib";
import image from "next/image";

export async function getStaticProps() {
    let projects = await getAllProjects();
    return {
        props: { projects },
    };
}

export default function Projects({ projects }) {
    const [firstSwiper, setFirstSwiper] = useState(null);
    const [secondSwiper, setSecondSwiper] = useState(null);
    const swiperRef = useRef(null);
    const breakpoints = useBreakpoint();
    console.log(breakpoints);

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
        console.log(activeProject, swiperRef);
        if (swiperRef.current !== null)
            swiperRef.current.swiper.slideTo(activeProject, 0, 1);
    }, [activeProject]);

    const getcontrol = () => {
        return breakpoints.md && { control: secondSwiper };
    };

    return (
        <Layout>
            <Head>
                <title>Projects</title>
            </Head>
            {/* <div className={`${projectsPageStyles.projectWrapper}`}> */}
            {!breakpoints.md ? (
                <div className={projectsPageStyles.projectWrapper}>
                    <div className={projectsPageStyles.projects__swiper}>
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
                                    <SwiperSlide>
                                        <img
                                            key={`${el.id}_${index}_pics`}
                                            src={el.pic}
                                            className={
                                                projectsPageStyles.projects__swiper__image
                                            }
                                        ></img>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                    <div className={projectsPageStyles.projectList}>
                        <div className={projectsPageStyles.projectList__header}>
                            PROJECTS
                        </div>
                        {projects.map((el, index) => {
                            return (
                                <div
                                    key={`${el}_${index}_projects`}
                                    className={`${projectsPageStyles.projectContainer}`}
                                >
                                    <Link href={`/projects/${el.id}`}>
                                        <a>
                                            <div
                                                className={`${projectsPageStyles.project__content}`}
                                            >
                                                <CDiv
                                                    onMouseEnter={(val) =>
                                                        setCurrent(val)
                                                    }
                                                    className={`${projectsPageStyles.project}`}
                                                    text={el.name}
                                                    startColor="#000000"
                                                    color="#000000"
                                                    index={index}
                                                ></CDiv>
                                                {/* <span
                                                        className={
                                                            projectsPageStyles.date
                                                        }
                                                    >
                                                        {el.formatdate}
                                                    </span> */}
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className={projectsPageStyles.projectWrapper}>
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
                                <SwiperSlide>
                                    <div
                                        key={`${el}_${index}_projects`}
                                        className={`${projectsPageStyles.projectContainer}`}
                                    >
                                        <div
                                            className={
                                                projectsPageStyles.project__content
                                            }
                                        >
                                            <span>{projects[index].name}</span>
                                            <span
                                                className={
                                                    projectsPageStyles.date
                                                }
                                            >
                                                {projects[index].formatdate}
                                            </span>
                                        </div>
                                        <Link href={`/projects/${el.id}`}>
                                            <a>
                                                <img
                                                    key={`${el.id}_${index}_pics`}
                                                    src={el.pic}
                                                    className={
                                                        projectsPageStyles.projects__swiper__image
                                                    }
                                                ></img>
                                            </a>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            )}
        </Layout>
    );
}
