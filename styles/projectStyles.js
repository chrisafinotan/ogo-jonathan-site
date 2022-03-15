import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const StyledSwiperImg = styled(motion.div)`
    display: block;
    /* aspect-ratio: 16/9; */
    height: 100%;
    z-index: 9;
    position: relative;
    aspect-ratio: ${(props) => props.AR};

    //     props.AR &&
    //         aspect-ratio: props.AR;
    img {
        width: 100% !important;
        // object-fit: contain;
    }
`;

export const StyledImgWrapper = styled(motion.div)`
    display: block;
    // height: 100%;
    width: 100%;
    z-index: 9;
    position: relative;
    aspect-ratio: ${(props) => props.AR};

    img {
    }
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
    z-index: 10;
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
    height: 100%;
    padding: 1em;
    overflow-y: scroll;
    // scroll-snap-type: y proximity;
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
        // scroll-snap-align: start;
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
    .endDiv {
        display: block;
        min-height: 150px;
    }
`;

export const Info = styled(motion.div)`
    color: ${(props) => props.theme.text};
    font-size: 2em;
    padding-top: 15vh;
    scroll-snap-align: start;
    text-align: center;
    // border: 2px solid yellow;
    .name {
        font-weight: 900;
    }
    .category {
        opacity: 0.5;
        font-size: 0.75rem;
    }
    .desc {
        margin-top: 1rem;
        width: 100%;
        // border: 2px solid yellow;
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
    margin: 1rem;
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
    margin: 1rem;
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
        color: ${(props) => props.theme.text};
        font-size: 2em;
        .name {
            font-size: 0.5em;
        }
    }
    @media (max-width: 1050px) {
        font-size: 0.7em;
    }
`;
