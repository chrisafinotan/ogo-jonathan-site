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
    let ncolor = color === "#000000" ? "#0028ff" : color;
    const fontChange = {
        init: {
            fontFamily: startFont,
            // fontSize: startSize,
            scale: 1,
            transition: { duration: 0.2 },
            filter: "invert(0)",
            color: startColor,
        },
        anim: {
            fontFamily: endFont,
            originX: originX,
            originY: originY,
            // fontSize: endSize,
            scale: 1.2,
            filter: "invert(1)",
            color: ncolor,
            transition: { duration: 0.2 },
        },
    };

    return (
        <motion.div
            // initial={fontChange.init}
            onHoverStart={() => {
                if (!isAnimationPlaying) {
                    // setIsAnimationPlaying(true);
                    controls.start(fontChange.anim);
                }
            }}
            onHoverEnd={() => {
                // setIsAnimationPlaying(true);
                controls.start(fontChange.init);
            }}
            // onAnimationComplete={() => {
            //     setIsAnimationPlaying(false);
            // }}
            onMouseEnter={onMouseEnter && (() => onMouseEnter(index))}
            onMouseLeave={onMouseExit && (() => onMouseExit())}
            className={`${styles.cdiv}`}
            id={id}
            data-index={index}
        >
            <motion.div
                animate={controls}
                initial={fontChange.init}
                className={className}
                index={index}
            >
                {text}
            </motion.div>
        </motion.div>
    );
};

export default CDiv;
