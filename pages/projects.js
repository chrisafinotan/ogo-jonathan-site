import { useEffect, useRef, useState } from "react";

import { projectDB, projectStorage } from "../firebase/fire-config";
import { ref, getDownloadURL } from "firebase/storage";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import Layout from "../components/layout";
import projectsPageStyles from "../styles/Projects.module.css";

import { getAllProjects } from "../lib/projectsLib";

export async function getStaticProps() {
    let projects = await getAllProjects();
    return {
        props: { projects },
    };
}

export default function Projects({ projects }) {
    const imagesdiv = useRef(0);
    const projectsdiv = useRef(0);

    //get images from storage
    const [images, setimages] = useState([]);
    const loadImages = async () => {
        let async_images = await Promise.all(
            projects.map(async (project) => {
                return await getDownloadURL(ref(projectStorage, project.cover));
            })
        );
        setimages(async_images);
    };

    useEffect(() => {
        loadImages();
    }, []);

    return (
        <Layout>
            <Head>
                <title>Projects</title>
            </Head>
            {projects.map((el, index) => {
                return (
                    <div key={`${el}_${index}_projects`}>
                        <Link href={`/projects/${el.id}`}>
                            <a>{el.name}</a>
                        </Link>
                        <img
                            key={`${el}_${index}_pics`}
                            src={images[index]}
                            className={projectsPageStyles.image}
                        ></img>
                    </div>
                );
            })}
        </Layout>
    );
}
