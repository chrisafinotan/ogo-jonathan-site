import Layout from "../components/layout";
import Image from "next/image";
import contactPageStyles from "../styles/Contact.module.css";
//FRAMER IMPORTS
import { AnimatePresence, motion } from "framer-motion";

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

export default function contact() {
    const sendForm = () => {};
    return (
        <Layout>
            <motion.div className={contactPageStyles.contactWrapper}>
                <motion.div
                    variants={spanContainer}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className={contactPageStyles.bannerWrapper}
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
                    className={contactPageStyles.formWrapper}
                >
                    <motion.div variants={spanText} style={{ originX: 0 }}>
                        GET IN TOUCH
                    </motion.div>
                    <motion.div variants={spanText} style={{ originX: 0 }}>
                        <form action={sendForm} autocomplete="on">
                            <div className={contactPageStyles.contactForm__Div}>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="NAME"
                                    required
                                    className={
                                        contactPageStyles.contactForm__Input
                                    }
                                />
                            </div>
                            <div className={contactPageStyles.contactForm__Div}>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="EMAIL"
                                    required
                                    className={
                                        contactPageStyles.contactForm__Input
                                    }
                                />
                            </div>
                            <div className={contactPageStyles.contactForm__Div}>
                                <textarea
                                    type="text"
                                    id="msg"
                                    name="msg"
                                    placeholder="MESSAGE"
                                    required
                                    className={`${contactPageStyles.contactForm__Input} ${contactPageStyles.contactForm__Message}`}
                                />
                            </div>
                            <div className={contactPageStyles.contactForm__Div}>
                                <input type="submit" value="SUBMIT" />
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            </motion.div>
        </Layout>
    );
}
