import { useEffect, useRef } from "react";
import Layout from "../components/layout";
import styles from "../styles/Contact.module.css";
//FRAMER IMPORTS
import { motion } from "framer-motion";
//ANIME IMPORTS';
import anime from "animejs";

const imageWrapper = {
    init: {
        // y: -200,
        opacity: 0,
        transition: { duration: 0.2 },
    },
    anim: {
        // y: 0,
        opacity: 1,
        transition: { duration: 1 },
    },
    color: {
        filter: "invert(0.8)",
    },
    exit: {
        // y: 200,
        transition: {
            staggerChildren: 1,
        },
    },
};

const spanContainer = {
    show: {
        transition: {
            staggerChildren: 0.7,
        },
    },
};

const spanText = {
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

export default function contact() {
    let basicTimeline;

    const sendForm = (e) => {
        e.preventDefault();
        console.log(e);
    };

    const resetForm = (e) => {
        e.preventDefault();
        console.log(e);
        basicTimeline.restart();
    };

    const pathCheckRef = useRef();
    const submitBtnRef = useRef();
    const formRef = useRef();
    const progressBarRef = useRef();
    useEffect(() => {
        let submit = submitBtnRef.current;
        let progress = progressBarRef.current;

        basicTimeline = anime.timeline({
            autoplay: false,
        });

        var pathEl = document.getElementById("checkPath");
        var offset = anime.setDashoffset(pathEl);
        console.log(pathEl, submit);
        pathEl.setAttribute("stroke-dashoffset", offset);

        basicTimeline
            .add({
                targets: submit,
                duration: 1300,
                height: 10,
                width: 300,
                backgroundColor: "#2B2D2F",
                border: "0",
                borderRadius: 100,
            })
            .add({
                targets: progress,
                duration: 2000,
                width: 300,
                easing: "linear",
            })
            .add({
                targets: submit,
                width: 0,
                duration: 1,
            })
            .add({
                targets: progress,
                width: 80,
                height: 80,
                delay: 500,
                duration: 750,
                borderRadius: 80,
                backgroundColor: "#71DFBE",
            })
            .add({
                targets: pathEl,
                strokeDashoffset: [offset, 0],
                duration: 200,
                easing: "easeInOutSine",
            });

        if (submitBtnRef && submitBtnRef.current) {
            submitBtnRef.current.addEventListener("click", function () {
                submitBtnRef.current.value = "";
                basicTimeline.play();
            });
        }

        if (formRef && formRef.current) {
            formRef.current.addEventListener("change", function () {
                basicTimeline.seek(0);
            });
        }
    }, [pathCheckRef]);

    return (
        <Layout>
            <motion.div className={styles.contactWrapper}>
                <motion.div
                    variants={spanContainer}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className={styles.bannerWrapper}
                >
                    <motion.div variants={spanText} style={{ originX: 0 }}>
                        OPEN TO WORKING
                    </motion.div>
                    <motion.div variants={spanText} style={{ originX: 0 }}>
                        ON NEW PROJECTS ?
                    </motion.div>

                    <motion.div variants={spanText} style={{ originX: 0 }}>
                        me too<span> &#128578;</span>
                    </motion.div>

                    <motion.div variants={spanText} style={{ originX: 0 }}>
                        LETS DISCUSS
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={spanContainer}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className={styles.formWrapper}
                >
                    <motion.div variants={spanText} style={{ originX: 0 }}>
                        GET IN TOUCH
                    </motion.div>
                    <motion.div variants={spanText} style={{ originX: 0 }}>
                        <form
                            onSubmit={sendForm}
                            autocomplete="on"
                            ref={formRef}
                        >
                            <div className={styles.contactForm__Div}>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="NAME"
                                    // required
                                    className={styles.contactForm__Input}
                                />
                            </div>
                            <div className={styles.contactForm__Div}>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="EMAIL"
                                    // required
                                    className={styles.contactForm__Input}
                                />
                            </div>
                            <div className={styles.contactForm__Div}>
                                <textarea
                                    type="text"
                                    id="msg"
                                    name="msg"
                                    placeholder="MESSAGE"
                                    // required
                                    className={`${styles.contactForm__Input} ${styles.contactForm__Message}`}
                                />
                            </div>
                            <div
                                className={`${styles.contactForm__Div} ${styles.contactForm__SubmitDiv}`}
                            >
                                <input
                                    type="submit"
                                    value="SUBMIT"
                                    className={styles.contactForm__submit}
                                    ref={submitBtnRef}
                                />
                                <div
                                    className={styles.contactForm__progressBar}
                                    ref={progressBarRef}
                                ></div>
                                <svg
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 25 30"
                                    className={styles.contactForm__svg__check}
                                >
                                    <path
                                        className={
                                            styles.contactForm__path__check
                                        }
                                        ref={pathCheckRef}
                                        id="checkPath"
                                        d="M2,19.2C5.9,23.6,9.4,28,9.4,28L23,2"
                                    />
                                </svg>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            </motion.div>
        </Layout>
    );
}
