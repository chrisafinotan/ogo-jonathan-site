import { getSortedProjectsData } from '../lib/projectsLib'

import Head from 'next/head'
import Layout from '../components/layout'
import Link from 'next/link'
import Date from '../components/date'
import projectsPageStyles from '../styles/Projects.module.css'
import Image from 'next/image'
import CustomSwiper from '../components/swiper'
// import styles from '../styles/Home.module.css'
export async function getStaticProps() {
    const allProjectsData = getSortedProjectsData()
    console.log("hi", allProjectsData)
    return {
        props: {
            allProjectsData
        }
    }
}

import { useEffect, useRef, useState } from 'react'

export default function Projects({ allProjectsData }) {

    let boxElements;
    let prevRatio = 0.0;
    let increasingColor = "rgba(40, 50, 190, ratio)";
    let decreasingColor = "rgba(255, 255, 0, ratio)";

    function buildThresholdList() {
        let thresholds = [];
        let numSteps = 20;

        for (let i = 1.0; i <= numSteps; i++) {
            let ratio = i / numSteps;
            thresholds.push(ratio);
        }

        thresholds.push(0);
        return thresholds;
    }

    function handleIntersect(entries, observer) {
        entries.forEach((entry) => {
            console.log("entry", entry);
            if (entry.intersectionRatio > prevRatio) {
                entry.target.style.backgroundColor = increasingColor.replace("ratio", entry.intersectionRatio);
            } else {
                entry.target.style.backgroundColor = decreasingColor.replace("ratio", entry.intersectionRatio);
            }

            prevRatio = entry.intersectionRatio;
        });
    }

    function createObserver() {
        let observer;

        let options = {
            root: document.querySelector("#projectsContainer"),
            // root: null,
            rootMargin: "-10% 0px",
            threshold: buildThresholdList()
        };

        observer = new IntersectionObserver(handleIntersect, options);
        boxElements.forEach(element => {
            observer.observe(element)
        });
    }

    useEffect(() => {
        boxElements = document.querySelectorAll('[id*=".project"]');
        createObserver();
    }, [])

    return (
        <Layout>
            <Head>
                <title>Ogo Jonathan</title>
            </Head>
            <div className={projectsPageStyles.projectsContainer} id="projectsContainer">

                <div className={projectsPageStyles.projectsDiv} id="projectsdiv">
                    {allProjectsData.map(({ id, date, title, description, cover, size }) => (
                        <div className={projectsPageStyles.projectDiv} key={id} id={`${id}.project`}>
                            <Link href={`/projects/${id}`}>
                                <a>{title}</a>
                            </Link>
                        </div>
                    ))}
                    <div className={projectsPageStyles.background}></div>
                    <div className={projectsPageStyles.background2}></div>
                </div>

                <div className={projectsPageStyles.test} style={{}}>
                </div>
            </div>

            {/* <CustomSwiper></CustomSwiper> */}
        </Layout>

    )
}
