import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import styles from "../styles/CDiv.module.css";

const CDiv = ({
    text = "empty",
    startFont = "Arial",
    endFont = `'The Nautigal', cursive`,
    startSize = "4.5rem",
    endSize = "3rem",
    color,
    startColor = "#ffffff",
    className,
    id,
    index,
    onMouseEnter,
    onMouseExit,
}) => {
    const controls = useAnimation();
    const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
    let ncolor = color === "#000000" ? "#0028ff" : color;
    const fontChange = {
        init: {
            fontFamily: startFont,
            fontSize: startSize,
            transition: { duration: 0.2 },
            filter: "invert(0)",
            color: startColor,
        },
        anim: {
            fontFamily: endFont,
            fontSize: endSize,
            filter: "invert(1)",
            color: ncolor,
            transition: { duration: 0.2 },
        },
    };

    return (
        <motion.div
            animate={controls}
            initial={fontChange.init}
            // initial={false}
            onHoverStart={() => {
                if (!isAnimationPlaying) {
                    setIsAnimationPlaying(true);
                    controls.start(fontChange.anim);
                }
            }}
            onHoverEnd={() => {
                setIsAnimationPlaying(true);
                controls.start(fontChange.init);
            }}
            onAnimationComplete={() => {
                setIsAnimationPlaying(false);
            }}
            onMouseEnter={onMouseEnter&&(()=>onMouseEnter(index))}
            onMouseLeave={onMouseExit&&(()=>onMouseExit())}
            className={`${styles.cdiv}`}
            id={id}
            data-index={index}
        >
            <motion.span className={className} index={index}>{text}</motion.span>
        </motion.div>
    );
};

export default CDiv;
