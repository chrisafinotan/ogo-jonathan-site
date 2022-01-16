import Layout from "../components/layout";
import Image from "next/image";
import aboutPageStyles from "../styles/About.module.css";
//FRAMER IMPORTS
import { motion } from "framer-motion";

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
        filter: "invert(1)",
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
            staggerChildren: 0.2,
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

export default function about() {
    return (
        <Layout>
            <motion.div className={aboutPageStyles.aboutWrapper}>
                <motion.div
                    variants={imageWrapper}
                    initial="init"
                    animate="anim"
                    whileHover="color"
                    className={aboutPageStyles.imageWrapper}
                >
                    <Image
                        src="/images/profilePic.jpg"
                        alt="Profile Picture of Ogo Jonathan"
                        width={1440}
                        height={1440}
                        layout="fill"
                        className={aboutPageStyles.imageComponent}
                        style={{position: 'relative'}}
                    />
                </motion.div>
                {/* <AnimatePresence> */}
                    <motion.div className={aboutPageStyles.aboutText}>
                        <motion.div
                            variants={spanContainer}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className={aboutPageStyles.aboutText__span}
                        >
                            <motion.div
                                variants={spanText}
                                style={{ originX: 0 }}
                            >
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing
                            </motion.div>
                            <motion.div
                                variants={spanText}
                                style={{ originX: 0 }}
                            >
                                elit. Aliquid cupiditate dolores suscipit error,
                                ratione
                            </motion.div>
                            <motion.div
                                variants={spanText}
                                style={{ originX: 0 }}
                            >
                                accusamus explicabo aperiam! Officiis esse
                                obcaecati
                            </motion.div>
                            <motion.div
                                variants={spanText}
                                style={{ originX: 0 }}
                            >
                                iusto, ipsam cupiditate.
                            </motion.div>
                        </motion.div>
                    </motion.div>
                {/* </AnimatePresence> */}
            </motion.div>
        </Layout>
    );
}
