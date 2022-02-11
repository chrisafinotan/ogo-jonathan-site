import Layout from "../components/layout";
//ANIME IMPORTS';
import anime from "animejs";
import { useEffect, useState } from "react";
import indexStyles from "../styles/Home.module.css";
import { getAllHomeProjects, getAllProjects } from "../lib/projectsLib";

import { projectStorage } from "../firebase/fire-config";
import { ref, getDownloadURL } from "firebase/storage";

import CSpan from "../components/CSpan";
import Link from "next/link";

import styled from "styled-components";
import { Controller, Scene } from "react-scrollmagic";

// SwiperCore.use([Navigation, Autoplay]);

export async function getStaticProps() {
    const projects = await getAllHomeProjects();
    const projects2 = await getAllProjects();
    return {
        props: { projects, projects2 },
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

export default function Home({ projects, projects2 }) {
    console.log("prj2", projects2);
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

    return <Layout projects={projects2}></Layout>;
}
