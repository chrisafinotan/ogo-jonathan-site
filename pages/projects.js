import { useEffect, useRef, useState } from "react";

import { projectDB, projectStorage } from "../firebase/fire-config";
import { ref, getDownloadURL } from "firebase/storage";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
} from "swiper";

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay]);
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import Layout from "../components/layout";
import CDiv from "../components/CDiv";
import projectsPageStyles from "../styles/Projects.module.css";

import { getAllProjects } from "../lib/projectsLib";
import { CustomSwiper } from "../components/swiper";

export async function getStaticProps() {
    let projects = await getAllProjects();
    return {
        props: { projects },
    };
}

export default function Projects({ projects }) {
    const imagesdiv = useRef(0);
    const projectsdiv = useRef(0);
    const swiperRef = useRef(null);

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
        setactiveProject(val);
    };

    useEffect(() => {
        loadImages();
    }, []);

    useEffect(() => {
        if (swiperRef.current !== null)
            swiperRef.current.swiper.slideTo(activeProject, 0, 1);
    }, [activeProject]);

    return (
        <Layout>
            <Head>
                <title>Projects</title>
            </Head>
            <div className={`${projectsPageStyles.projectWrapper}`}>
                <CustomSwiper pictures={images} ref={swiperRef}></CustomSwiper>

                <div className={`${projectsPageStyles.projectList}`}>
                    {projects.map((el, index) => {
                        return (
                            <div
                                key={`${el}_${index}_projects`}
                                className={`${projectsPageStyles.projectContainer}`}
                            >
                                <Link href={`/projects/${el.id}`}>
                                    <a>
                                        <CDiv
                                            onMouseEnter={(val) =>
                                                setCurrent(val)
                                            }
                                            // onMouseExit={() => setCurrent(0)}
                                            className={`${projectsPageStyles.project}`}
                                            text={
                                                <>
                                                    {el.name}
                                                    {el.formatdate}
                                                </>
                                            }
                                            startColor="#000000"
                                            color="#000000"
                                            index={index}
                                        ></CDiv>
                                    </a>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}
