//REACT IMPORTS
import { useState } from "react";

//NEXT IMPORTS
import Link from "next/link";

//FRAMER IMPORTS
import { AnimatePresence, motion, useAnimation } from "framer-motion";

//STYLE IMPORTS
import styles from "../styles/Navbar.module.css";
import CDiv from "./CDiv";

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
        // y: -200,
    },
    show: {
        opacity: 1,
        // y: 0,
        transition: {
            ease: [0.6, 0.01, -0.05, 0.95],
            duration: 0.7,
        },
    },
    exit: {
        opacity: 0,
        // y: -200,
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
    const [menuOpen, setmenuOpen] = useState(false);
    const [color, setcolor] = useState("white");

    const handleClick = () => {
        setmenuOpen(!menuOpen);
        setcolor(
            !menuOpen
                ? colors[Math.floor(Math.random() * colors.length)]
                : "white"
        );
    };

    return (
        <motion.div className={styles.navbar}>
            <AnimatePresence>
                {menuOpen && (
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
                                    <a>
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
                )}

                <div className={`${styles.menuBtnWrapper}`}>
                    <motion.div
                        key="navbar-link-menu-motion"
                        style={{ originX: 1, originY: 0 }}
                        className={`${styles.menuBtn}`}
                        onClick={handleClick}
                    >
                        <CDiv
                            text="MENU"
                            id={"menuBtn"}
                            startSize="2rem"
                            endSize="2.5rem"
                            color={menuOpen ? color : "#0028ff"}
                            startColor="#000000"
                            originX={1}
                        ></CDiv>
                    </motion.div>
                </div>
            </AnimatePresence>
        </motion.div>
    );
}
