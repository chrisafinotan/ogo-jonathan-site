import { getSortedProjectsData } from "../lib/projectsLib";

import Head from "next/head";
import Layout from "../components/layout";
import Link from "next/link";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";
import projectsPageStyles from "../styles/Projects.module.css";
import Image from "next/image";
import CustomSwiper from "../components/swiper";
// import styles from '../styles/Home.module.css'
export async function getStaticProps() {
    const allProjectsData = getSortedProjectsData();
    console.log("hi", allProjectsData);
    return {
        props: {
            allProjectsData,
        },
    };
}

import { useEffect, useRef, useState } from "react";

export default function Projects({ allProjectsData }) {
    let boxElements;
    let prevIntersecting = true;
    let increasingColor = "rgba(40, 50, 190, ratio)";
    let blueColor = "rgba(255, 255, 0, ratio)";
    const [active, setactive] = useState(0);
    const imagesdiv = useRef(0);
    const projectsdiv = useRef(0);

    function buildThresholdList() {
        let thresholds = [];
        let numSteps = 40;

        for (let i = 1.0; i <= numSteps; i++) {
            let ratio = i / numSteps;
            thresholds.push(ratio);
        }

        thresholds.push(0);
        return thresholds;
    }

    function handleIntersect(entries, observer) {
        // console.log("entries", entries);
        entries.forEach((entry) => {
            // console.log("entry", entry);
            if (prevIntersecting !== entries[0].target.id) {
                setactive(entries[0].target.id);
            }
            if (entry.intersectionRatio > 0) {
                entry.target.style.backgroundColor = increasingColor.replace(
                    "ratio",
                    entry.intersectionRatio
                );
            } else {
                entry.target.style.backgroundColor = blueColor.replace(
                    "ratio",
                    entry.intersectionRatio
                );
            }
            prevIntersecting = entry.target.id;
        });
    }

    function createObserver() {
        let observer;
        let options = {
            root: document.querySelector("#projectsContainer"),
            // root: null,
            rootMargin: "-10% 0px",
            threshold: buildThresholdList(),
        };

        observer = new IntersectionObserver(handleIntersect, options);
        boxElements.forEach((element) => {
            observer.observe(element);
        });
    }

    useEffect(() => {
        boxElements = [].slice.call(projectsdiv.current.children);
        createObserver();
    }, []);

    useEffect(() => {
        console.log("active is ", active);
        if (active !== 0) {
            let items = imagesdiv.current.children;
            for (let item of items) {
                if (item.id === active) {
                    item.style.display = "inline-block";
                } else item.style.display = "none";
            }
        }
    }, [active]);

    const set = (e) => {
        setactive(e.target.id);
    };

    return (
        <Layout>
            <Head>
                <title>Ogo Jonathan</title>
            </Head>
            <div
                className={projectsPageStyles.projectsContainer2}
                ref={imagesdiv}
                id="projectsContainer2"
            >
                {allProjectsData.map(({ id, cover }) => (
                    <div
                        id={`${id}_project`}
                        key={`${id}_project2`}
                        style={{ display: "none" }}
                    >
                        <Image
                            src={cover}
                            height={1080}
                            width={720}
                            alt={cover}
                        ></Image>
                    </div>
                ))}
            </div>
            <div
                className={projectsPageStyles.projectsContainer}
                id="projectsContainer"
            >
                <div
                    className={projectsPageStyles.projectsDiv}
                    id="projectsdiv"
                    ref={projectsdiv}
                >
                    {allProjectsData.map(({ id, title }) => (
                        <div
                            className={projectsPageStyles.projectDiv}
                            key={id}
                            id={`${id}_project`}
                            onMouseOver={(e) => set(e)}
                        >
                            <Link href={`/projects/${id}`}>
                                <a>{title}</a>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className={projectsPageStyles.background}></div>
                <div className={projectsPageStyles.background2}></div>

                <div className={projectsPageStyles.test} style={{}}></div>
            </div>

            {/* <CustomSwiper></CustomSwiper> */}
        </Layout>
    );
}
