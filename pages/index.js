import Head from "next/head";
import Layout from "../components/layout";
//ANIME IMPORTS';
import anime from "animejs";
import { useEffect } from "react";
import indexStyles from "../styles/Home.module.css";

export async function getStaticProps() {
    const projects = [];
    return {
        props: { projects },
    };
}

export default function Home({ projects }) {
    let basicTimeline;

    useEffect(() => {
        // anime({
        //     targets: ".intro path",
        //     strokeDashoffset: [anime.setDashoffset, 0],
        //     easing: "easeInOutSine",
        //     duration: 5000,
        //     // delay: anime.stagger(500),
        //     delay: function (el, i) {
        //         return i * 250;
        //     },
        // });
        // basicTimeline = anime.timeline({
        //     autoplay: false,
        // });

        // basicTimeline
        //     .add({
        //         targets: ".intro path",
        //         strokeDashoffset: [anime.setDashoffset, 0],
        //         easing: "easeInOutSine",
        //         delay: 700,
        //         direction: "reverse",
        //     })
        //     .add({
        //         targets: `.svg__intro`,
        //         scale: {
        //             value: [1, 1.5],
        //             duration: 500,
        //             delay: 800,
        //             easing: "easeInOutQuart",
        //         },
        //     })
        //     .add({
        //         // targets: `.svg__intro`,
        //         // opacity: 0,
        //         // duration: 1500,
        //     })
        //     .add({
        //         targets: `.svg__intro`,
        //         // begin: function () {
        //         //     document.querySelector("#svgBox").style.display = "none";
        //         // },
        //     });

        // basicTimeline.play();

        var textWrapper = document.querySelector(".ml6 .letters");
        textWrapper.innerHTML = textWrapper.textContent.replace(
            /\S/g,
            "<span class='letter'>$&</span>"
        );

        anime
            .timeline({
                // loop: true,
            })
            .add({
                targets: ".ml6 .letter",
                translateY: ["2em", 0],
                translateZ: 0,
                duration: 1000,
                delay: (el, i) => 50 * i,
            });
    }, []);

    return (
        <Layout>
            <div className={indexStyles.mainWrapper}>
                <h1 className="ml6">
                    <span className="text-wrapper">
                        <span className="letters">Ogo Jonathan</span>
                    </span>
                </h1>
                {/* <img
                src="/images/lojay.JPG"
                alt="Profile Picture of Ogo Jonathan"
                width={1440}
                height={1440}
                layout="fill"
                className={indexStyles.imageComponent}
                // style={{ position: "relative" }}
            ></img> */}
            </div>
        </Layout>
    );
}
