import Layout from "../components/layout";
//ANIME IMPORTS';
import anime from "animejs";
import { useEffect, useState } from "react";
import indexStyles from "../styles/Home.module.css";
import { getAllHomeProjects } from "../lib/projectsLib";

import { projectStorage } from "../firebase/fire-config";
import { ref, getDownloadURL } from "firebase/storage";

import CSpan from "../components/CSpan";
import Link from "next/link";

import styled from "styled-components";
import { Controller, Scene } from "react-scrollmagic";

// SwiperCore.use([Navigation, Autoplay]);

export async function getStaticProps() {
    const projects = await getAllHomeProjects();
    return {
        props: { projects },
    };
}

const ClassToggleStyled = styled.div`
    .section {
        height: 100vh;
    }

    .test {
        transition: width 0.3s ease-out;
        color: black;
        width: 100px;
        height: 100px;
        background-color: red;
        margin: 0 !important;

        &.yellow {
            background-color: yellow;
        }
    }
    .zap {
        width: 100%;
        animation: slide 5s linear infinite;
    }

    @keyframes slide {
        0% {
            transform: translate3d(0, 0, 0);
        }
        100% {
            transform: translate3d(0, -1000px, 0); /* The image width */
        }
    }
`;

export default function Home({ projects }) {
    //get images from storage
    const [images, setimages] = useState([]);
    const loadImages = async () => {
        let async_images = await Promise.all(
            projects.map(async (project) => {
                return {
                    pic: await getDownloadURL(
                        ref(projectStorage, project.file)
                    ),
                    ...project,
                };
            })
        );
        // async_images = [...async_images, ...async_images, ...async_images];
        setimages(async_images);
    };

    useEffect(() => {
        loadImages();
    }, []);

    return (
        <Layout>
            {/* <div className={indexStyles.mainWrapper}> */}
            {/* <CSpan text="Ogo Jonathan" className="ml6"></CSpan> */}
            {/* <div className={indexStyles.sliding__background}>
                    <div className={indexStyles.scrollWrapper}>
                        {images.map((el, index) => {
                            return (
                                <div
                                    key={`${index}_home_image`}
                                    className={indexStyles.imgWrapper}
                                    style={{
                                        marginLeft: `${
                                            Math.random() * (75 - 20) + 20
                                        }vw`,
                                        marginLeft: `20vw`,
                                    }}
                                >
                                    <Link href={`/projects/${el.link}`}>
                                        <a>
                                            <img
                                                src={el.pic && el.pic}
                                                alt={el.name}
                                                className={
                                                    indexStyles.imageComponent
                                                }
                                            ></img>
                                        </a>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div> */}

            <ClassToggleStyled>
                <div className="section" />
                <div id="trigger" />
                <Controller>
                    <Scene
                        duration={200}
                        classToggle="zap"
                        triggerElement="#trigger"
                        indicators={true}
                        reverse={false}
                    >
                        {(progress, event) => (
                            <div className="test">
                                Pin Test {event.type} {progress}
                            </div>
                        )}
                    </Scene>
                    {images.map((el, index) => {
                        return (
                            <Scene
                                classToggle="zap"
                                // triggerElement="#trigger"
                                // classToggle={[".test", "yellow"]}
                                // indicators={true}
                                reverse={false}
                            >
                                <div
                                    key={`${index}_home_image`}
                                    className={indexStyles.imgWrapper}
                                    style={{
                                        marginLeft: `20vw`,
                                        backgroundColor: "#F00",
                                    }}
                                >
                                    <Link href={`/projects/${el.link}`}>
                                        <a>
                                            <img
                                                src={el.pic && el.pic}
                                                alt={el.name}
                                                className={
                                                    indexStyles.imageComponent
                                                }
                                            ></img>
                                        </a>
                                    </Link>
                                </div>
                            </Scene>
                        );
                    })}
                </Controller>
                <div className="section" />
            </ClassToggleStyled>
        </Layout>
    );
}
