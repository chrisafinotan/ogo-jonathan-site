import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const ContentBox = styled.div`
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
        // border: 2px solid red;
        img {
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
            font-size: 1em;
            letter-spacing: 0.5em;
            overflow: hidden;
            white-space: nowrap;
            text-align: center;

            background: ${(props) => props.theme.main};
            color: ${(props) => props.theme.text};
        }
        pointer-events: none;
    }

    &:hover {
        transform: scale(1.2);
        z-index: 10;
        transition: all 0.2s ease-in-out;
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
    position: relative;
    pointer-events: none;
    .text {
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
        // border: 2px solid blue;

    }
    &span:before {
        content: "";
        mix-blend-mode: normal;
        // border: 2px solid green;
    }

`;
