import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const StyledSwiperImg = styled(motion.img)`
    display: block;
    width: 100%;
    /* aspect-ratio: 16/9; */
    height: 100%;
    object-fit: contain;
    // margin: 1em;
`;

export const StyledSwiperWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    width: 50%;
    transform: translate(50%, 50%);
    bottom: 10vh;
    height: fit-content;
    z-index: 1000;
    gap: 10px;
    svg {
        width: 50px;
        height: 50px;
        path {
            fill: ${(props) => props.theme.text};
        }
    }
`;

export const StyledSwiperPagination = styled.div`
    height: 5px !important;
    // flex-grow: 1;
`;

export const StyledSwiperNavBtn = styled.div`
    top: 50%;
    width: 25px;
    height: 25px;
    background: transparent;
    border-top: 6px solid ${(props) => props.theme.text};
    border-right: 6px solid ${(props) => props.theme.text};
    box-shadow: 0 0 0 lightgray;
    transition: all 200ms ease;
    &.swiper-button-disabled {
        // display: none;
        opacity: 0;
        pointer-events: none;
    }
    ${(props) =>
        props.right &&
        css`
            transform: rotate(45deg);
        `};

    ${(props) =>
        props.left &&
        css`
            transform: rotate(-135deg);
        `};

    &:hover {
        border-color: ${(props) => props.theme.main};
        box-shadow: 3px -3px 0 ${(props) => props.theme.text};
    }

    &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-40%, -60%) rotate(45deg);
        width: 200%;
        height: 200%;
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
