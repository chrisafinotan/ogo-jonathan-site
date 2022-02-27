import styled, { css, keyframes } from "styled-components";
import { motion } from "framer-motion";

const blink = keyframes`
0% {
    opacity: 1;
    scale: 1;
  }
  50% {
    opacity: .3;
    scale: 2;
  }
  100% {
    opacity: 1;
    scale: 1;
  }
`;
export const ContentBox = styled(motion.div)`
    display: block;
    position: fixed;
    width: 15vw;
    aspect-ratio: 9/16;
    top: 10vh;
    left: 0;
    transform-origin: center;
    // transform: translate(-50%, -50%);
    ${(props) =>
        props.hide &&
        css`
            display: none;
        `};
    ${(props) =>
        props.width &&
        css`
            width: ${(props) => props.width}vw;
        `};
    ${(props) =>
        props.height &&
        css`
            height: ${(props) => props.height}vh;
        `};
    ${(props) =>
        props.top &&
        css`
            top: ${(props) => props.top}vh;
        `};
    ${(props) =>
        props.left &&
        css`
            left: ${(props) => props.left}vw;
        `};
    ${(props) =>
        props.ar &&
        css`
            aspect-ratio: ${(props) => props.ar};
        `};
    ${(props) =>
        props.zindex &&
        css`
            z-index: ${(props) => props.zindex};
        `};
    a {
        position: absolute;
        width: 100%;
        height: 100%;

        img {
            // z-index: 9;
            width: 100%;
            height: 100%;
            object-fit: cover;
            ${(props) =>
                props.contain &&
                css`
                    object-fit: contain;
                `};
        }
        video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .text {
        width: 100%;
        height: 100%;
        bottom: 0;
        left: 0;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
            display: none;
            font-size: 1.7em;
            letter-spacing: 0.5rem;
            overflow: hidden;
            white-space: nowrap;
            text-align: center;
            mix-blend-mode: color-dodge;
            font-weight: 700;
            // background: ${(props) => props.theme.text};
            color: ${(props) => props.theme.inv_text};
            color: ${(props) => props.theme.main};
            color: #fff;
        }
        pointer-events: none;
    }

    &:hover {
        transform: scale(1.2);
        z-index: 10;
        transition: all 0.3s ease-in-out;
        * {
            opacity: 1;
        }
        .text span {
            display: flex;
        }
    }
`;

export const TitleBanner = styled(motion.div)`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    pointer-events: none;
    .text {
        // transform: rotateZ(90deg);
        position: relative;
        width: fit-content;
        font-size: 5em;
        text-transform: uppercase;
        text-align: center;
        letter-spacing: 40px;
        // margin-right:-40px;
        font-weight: 700;
        color: #fff;
        mix-blend-mode: difference;
        z-index: 8;
        overflow: hidden;
        white-space: nowrap;
        @media (max-width: 1050px) {
            font-size: 3em;
            letter-spacing: 20px;
        }
        @media (max-width: 600px) {
            font-size: 2em;
            letter-spacing: 10px;
        }
        @media (max-width: 400px) {
            font-size: 1.5em;
            letter-spacing: 5px;
        }
    }
    span {
        mix-blend-mode: revert;
        height: 2em;
        width: 2em;
        background: ${(props) =>
            props.invert ? props.theme.inv_main : props.theme.main};
        margin: 0.2em;
        border-radius: 100%;
        position: relative;
        animation: ${blink} 3s linear infinite;
    }
`;
