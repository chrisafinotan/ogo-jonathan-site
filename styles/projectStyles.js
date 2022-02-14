import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const StyledSwiperImg = styled(motion.img)`
    display: block;
    width: 100%;
    /* aspect-ratio: 16/9; */
    height: 100%;
    object-fit: contain;
    margin: 1em;
`;

export const StyledSwiperWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 50%;
    transform: translate(50%, 50%);
    bottom: 10vh;
    height: fit-content;
    z-index: 1000;
`;

export const StyledSwiperPagination = styled.div`
    bottom: 0 !important;
    top: calc(100% - 5px) !important;
    height: 5px !important;
    width: 50% !important;
    transform: translateX(50%);
`;

export const StyledSwiperNavBtn = styled.div`
    display: block;
    width: 4em;
    height: 4em;
    position: absolute;
    // top: 50%;
    ${(props) =>
        props.left &&
        css`
            transform: rotateZ(90deg);
            // border: 3px solid blue;
            left: 10%;
        `};
    ${(props) =>
        props.right &&
        css`
            transform: rotateZ(-90deg);
            // border: 3px solid red;
            left: 90%;
        `};
    &:hover {
        cursor: pointer;
        .arrow {
            top: 50%;
            &:before {
                transform: translate(-50%, -50%) rotateZ(-30deg);
            }
            &:after {
                transform: translate(-50%, -50%) rotateZ(30deg);
            }
        }
    }
    &.swiper-button-disabled {
        display: none;
    }
    .arrow {
        position: absolute;
        left: 50%;
        transition: all 0.4s ease;
        &:before,
        &:after {
            transition: all 0.4s ease;
            content: "";
            display: block;
            position: absolute;
            transform-origin: bottom right;
            background: ${(props) => props.theme.text};
            width: 4px;
            height: 50px;
            border-radius: 10px;
            transform: translate(-50%, -50%) rotateZ(-45deg);
        }
        &:after {
            transform-origin: bottom left;
            transform: translate(-50%, -50%) rotateZ(45deg);
        }
    }
    .one {
        opacity: 0.3;
        top: 20%;
    }
    .two {
        opacity: 0.6;
        top: 40%;
    }
    .three {
        opacity: 0.9;
        top: 60%;
    }
`;

export const ImagesWrapper = styled(motion.div)`
    display: flex;
    overflow-x: auto;
    height: 100%;
    isolation: isolate;
    color: ${(props) => props.theme.text};
    z-index: 10;
`;

export const ImagesWrapperSmall = styled(motion.div)`
    position: relative;
    height: 100vh;
    padding: 1em;
    overflow-y: scroll;
    scroll-snap-type: y proximity;
    color: ${(props) => props.theme.text};
    .info {
        font-size: 2em;
        padding-top: 15vh;
        scroll-snap-align: start;
        text-align: center;
        .name {
        }
        .desc {
        }
    }
`;

export const ImagesContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    height: 100%;
    flex-wrap: nowrap;
    object-fit: fill;
    .projectImageWrapper {
        scroll-snap-align: start;
        display: flex;
        width: 100%;
        height: 100%;
        align-self: center;
        justify-content: center;
        padding: 0.5em 0;
        .image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    &:last-child {
        .projectImageWrapper .image {
            padding-bottom: 20vh;
        }
    }
`;

export const Info = styled(motion.div)`
    color: ${(props) => props.theme.text};
    font-size: 2em;
    padding-top: 15vh;
    scroll-snap-align: start;
    text-align: center;
    .name {
    }
    .desc {
    }
`;

export const ProjectContainer = styled(motion.div)`
    position: relative;
    height: 100vh;
    padding: 1em;
    display: flex;
    flex-flow: row nowrap;
    background: ${(props) => props.theme.background};
`;

export const NextLink = styled(motion.a)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2em;
    position: absolute;
    right: 0;
    bottom: 0;
    mix-blend-mode: difference;
`;

export const PrevLink = styled(motion.a)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2em;
    position: absolute;
    left: 0;
    bottom: 0;
    mix-blend-mode: difference;
`;

export const Links = styled.div`
    position: fixed;
    z-index: 10;
    height: fit-content;
    width: 100vw;
    font-size: 1em;
    bottom: 0;
    left: 0;
    a {
        color: ${(props) => props.theme.main};
        font-size: 2em;
        .name {
            font-size: 0.5em;
        }
    }
`;
