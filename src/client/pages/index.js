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

// SwiperCore.use([Navigation, Autoplay]);

export async function getStaticProps() {
    const projects = await getAllHomeProjects();
    return {
        props: { projects },
    };
}

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
        setimages(async_images);
    };

    useEffect(() => {
        loadImages();
    }, []);

    return (
        <Layout>
            <div className={indexStyles.mainWrapper}>
                <CSpan text="Ogo Jonathan" className="ml6"></CSpan>

                <div className={indexStyles.scrollWrapper}>
                    {images.map((el, index) => {
                        return (
                            <div
                                key={`${index}_home_image`}
                                className={indexStyles.imgWrapper}
                                style={{marginLeft: `${Math.random()*(75 - 20) + 20}vw`}}
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
        </Layout>
    );
}
