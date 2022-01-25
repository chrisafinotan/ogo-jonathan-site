import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import styles from "../styles/CDiv.module.css";

const CDiv = ({
    text = "empty",
    startFont = "Arial",
    endFont = `'The Nautigal', cursive`,
    startSize = "4.5em",
    endSize = "3em",
    color,
    startColor = "#ffffff",
    className,
    id,
    index,
    onMouseEnter,
    onMouseExit,
    originX = 0,
    originY = 0,
}) => {
    const controls = useAnimation();
    const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
    let ncolor = "#0028ff";
    const fontChange = {
        init: {
            // scale: 1,
            transition: { duration: 0.2 },
            // backgroundColor: "inherit",
            filter: "invert(1)",
        },
        anim: {
            filter: "invert(0)",
            originX: originX,
            originY: originY,
            // scale: 1.2,
            backgroundColor: ncolor,
            transition: { duration: 0.2 },
        },
    };

    return (
        <motion.div className={`${styles.cdiv}`} id={id} data-index={index}>
            <motion.span
                variants={fontChange}
                whileHover="anim"
                className={className}
                index={index}
            >
                {text}
            </motion.span>
        </motion.div>
    );
};

export default CDiv;
