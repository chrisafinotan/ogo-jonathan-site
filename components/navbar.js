//REACT IMPORTS
import { useState } from "react";

//NEXT IMPORTS
import Link from "next/link";

//FRAMER IMPORTS
import { AnimatePresence, motion, useAnimation } from "framer-motion";

//STYLE IMPORTS
import styles from "../styles/Navbar.module.css";
import CDiv from "./CDiv";
import CLink from "./CLink";

import { Slant as Hamburger } from "hamburger-react";
import { useBreakpoint } from "../context/breakpointContext";
import CSpan from "./CSpan";
const colors = [
    "#3addcd",
    "#3524a3",
    "#af4778",
    "#b5c762",
    "#dcb450",
    "#e91c1c",
    // "#000000",
];

const container = {
    show: {
        transition: {
            staggerChildren: 0.5,
        },
    },
    exit: {
        transition: {
            staggerChildren: 1,
        },
    },
};

const links = {
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
            duration: 0.7,
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: {
            ease: "easeInOut",
            duration: 0.7,
            when: "afterChildren",
        },
    },
};

const wrapper = {
    hidden: {
        opacity: 0,
    },

    exit: {
        opacity: 0,
        transition: {
            ease: "easeInOut",
            duration: 0.75,
        },
    },
};

export default function Navbar() {
    const breakpoints = useBreakpoint();

    const [menuOpen, setmenuOpen] = useState(false);
    const [color, setcolor] = useState("none");

    const handleClick = () => {
        setmenuOpen(false);
        setcolor();
    };
    console.log(breakpoints);

    return (
        <div className={styles.navbarWrapper}>
            {!breakpoints.md ? (
                <>
                    <div className={`${styles.navbar__home}`}>
                        <CLink href="/">
                            <a className={styles.navbar__link}>
                                {/* <span className="letters"> */}
                                <CSpan text="OJ" />
                                {/* </span> */}
                            </a>
                        </CLink>
                    </div>
                    <motion.div
                        className={styles.navbar__lrg}
                        onClick={handleClick}
                    >
                        <div
                            key="navbar-link-projects-motion__lrg"
                            className={`${styles.page__lrg}`}
                        >
                            <CLink href="/projects">
                                <a>
                                    <CSpan text="PROJECTS" />
                                    {/* <CDiv
                                        className={`${styles.left}`}
                                        color={color}
                                    ></CDiv> */}
                                </a>
                            </CLink>
                        </div>
                        <div
                            key="navbar-link-about-motion__lrg"
                            className={`${styles.page__lrg}`}
                        >
                            <CLink href="/about">
                                <a>
                                    <CSpan text="ABOUT" />

                                    {/* <CDiv
                                        className={`${styles.left}`}
                                        color={color}
                                    ></CDiv> */}
                                </a>
                            </CLink>
                        </div>
                        <div
                            key="navbar-link-contact-motion"
                            className={`${styles.page__lrg}`}
                        >
                            <CLink href="/contact">
                                <a>
                                    <CSpan text="CONTACT" />
                                </a>
                            </CLink>
                        </div>
                    </motion.div>
                </>
            ) : (
                <div>
                    <div className={styles.header__wrapper}>
                        <Hamburger
                            toggled={menuOpen}
                            onToggle={(toggled) => {
                                if (toggled) {
                                    // setcolor(
                                    //     colors[
                                    //         Math.floor(
                                    //             Math.random() * colors.length
                                    //         )
                                    //     ]
                                    // );
                                    setmenuOpen(true);
                                } else {
                                    // setcolor("white");
                                    setmenuOpen(false);
                                }
                            }}
                            distance="lg"
                            className={styles.hbg__wrapper}
                        ></Hamburger>
                    </div>
                    {menuOpen && (
                        <motion.div className={styles.navbar}>
                            <AnimatePresence>
                                <motion.div
                                    variants={wrapper}
                                    initial="hidden"
                                    animate={{
                                        opacity: 1,
                                        backgroundColor: color,
                                    }}
                                    exit="exit"
                                    key="navbar-wrapper-motion"
                                    className={styles.navbarContent}
                                    onClick={handleClick}
                                >
                                    <motion.div
                                        variants={container}
                                        style={{ originY: 0 }}
                                        initial="hidden"
                                        animate="show"
                                        exit="exit"
                                        key="navbar-links-container-motion"
                                        className={styles.navbarLinks}
                                    >
                                        <motion.div
                                            variants={links}
                                            key="navbar-link-home-motion"
                                            className={`${styles.page}`}
                                        >
                                            <Link href="/">
                                                <a
                                                    className={
                                                        styles.navbar__link
                                                    }
                                                >
                                                    <CDiv
                                                        className={`${styles.home}`}
                                                        text="OGO JONATHAN"
                                                        color={color}
                                                    ></CDiv>
                                                </a>
                                            </Link>
                                        </motion.div>
                                        <motion.div
                                            variants={links}
                                            key="navbar-link-projects-motion"
                                            className={`${styles.page}`}
                                        >
                                            <Link href="/projects">
                                                <a>
                                                    <CDiv
                                                        className={`${styles.projects}`}
                                                        text="PROJECTS"
                                                        color={color}
                                                    ></CDiv>
                                                </a>
                                            </Link>
                                        </motion.div>
                                        <motion.div
                                            variants={links}
                                            key="navbar-link-about-motion"
                                            className={`${styles.page}`}
                                        >
                                            <Link href="/about">
                                                <a>
                                                    <CDiv
                                                        className={`${styles.about}`}
                                                        text={"ABOUT"}
                                                        color={color}
                                                    ></CDiv>
                                                </a>
                                            </Link>
                                        </motion.div>
                                        <motion.div
                                            variants={links}
                                            key="navbar-link-contact-motion"
                                            className={`${styles.page}`}
                                        >
                                            <Link href="/contact">
                                                <a>
                                                    <CDiv
                                                        className={`${styles.contact}`}
                                                        text="CONTACT"
                                                        color={color}
                                                    ></CDiv>
                                                </a>
                                            </Link>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            )}
        </div>
    );
}
