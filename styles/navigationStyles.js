import styled, { css, keyframes } from "styled-components";
import { motion } from "framer-motion";

export const Nav = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    background: ${(props) => props.theme.main};
    color: #000;
    z-index: 99;
    // overflow: scroll;
    // ::-webkit-scrollbar {
    //     display: none;
    // }
    // border: 3px solid red;
`;

export const NavHeader = styled.div`
    top: 72px;
    width: 100%;
    // position: sticky;
    position: relative;
    h2 {
        color: ${(props) => props.theme.background};
    }
`;

export const CloseNav = styled.div`
    justify-self: center;
    align-self: center;
    button {
        border: none;
        padding: 20px;
        background: none;
        outline: none;
        span {
            width: 36px;
            height: 8px;
            display: block;
            background: ${(props) => props.theme.background};
            // margin: 8px;
            transform-origin: center center;
        }
        .first {
            transform: translate(-8px, 4px) rotateZ(-45deg);
        }
        .second {
            transform: translate(-8px, -4px) rotateZ(45deg);
        }
    }
`;

export const NavList = styled.div`
    top: 0;
    position: relative;
    height: 70vh;
    width: 100%;
    display: flex;
    align-items: center;
    ul {
        overflow: scroll;
        ::-webkit-scrollbar {
            display: none;
        }
        height: 100%;
        width: 100%;
        margin: 0;

        li {
            list-style: none;
            margin: 0.5em 0;
            font-size: 3rem;
            text-transform: uppercase;
            font-weight: 900;
            height: 96px;
            height: min-content;
            // line-height: 2em;
            overflow: hidden;
            width: fit-content;

            .link {
                color: ${(props) => props.theme.background};
                position: relative;
                display: flex;
                align-items: center;
                height: 76px;
                &:hover {
                    z-index: 6;
                    transform: translate(40%, 0);
                }
                transition: all 200ms ease;
                &:after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    border: 2px solid ${(props) => props.theme.inv_main};
                    width: 70px;
                }
                &:hover:after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    border: 2px solid ${(props) => props.theme.inv_main};
                    width: 100%;
                    transition: width 0.5s ease-out;
                }

                .arrow {
                    display: flex;
                    align-items: center;
                    height: 76px;
                    width: 60px;
                    margin-right: 8px;
                    pointer-events: none;
                }
            }
            svg {
                width: 100px;
                path {
                    fill: ${(props) => props.theme.background};
                }
            }
        }
    }

    @media (max-width: 820px) {
        ul {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 0;
            // border: 2px solid red;
            li {
                // border: 2px solid red;
                font-size: 1.5rem;
                .link {
                    .arrow {
                        display: none;
                    }
                    &:after {
                        display: none;
                    }
                }
                .arrow {
                    display: none;
                }
            }
            svg {
                display: none;
            }
        }
    }
`;

export const NavFooter = styled.div`
    position: sticky;
    // border: 2px solid red;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    height: fit-content;
    // padding: 1rem 0px;
    background: ${(props) => props.theme.main};
    p {
        color: ${(props) => props.theme.background};
    }
    svg path {
        fill: ${(props) => props.theme.background};
    }
`;

export const NavContent = styled.div`
    position: absolute;
    z-index: -1;
    display: block;
    top: 0;
    height: 80%;
    width: 80%;
    background: none;
    transform: translate(20%, 15%);
    border: none;

    @media (max-width: 820px) {
        display: none;
    }

    .reveal {
        width: 100%;
        background: ${(props) => props.theme.main};
        position: absolute;
        border: none;
        top: 0;
        bottom: 0;
        left: 0;
    }

    .video {
        // background: ${(props) => props.theme.main};
        background: transparent;
        position: absolute;
        height: 100%;
        width: 100%;
        margin: 0;
        video {
            height: 100%;
            width: 100%;
        }
    }

    .image {
        // background: ${(props) => props.theme.main};
        background: transparent;
        height: 100%;
        width: 100%;
        img {
            object-fit: contain;
            display: block;
            width: 100%;
            height: 100%;
        }
    }
`;

export const NavAbout = styled.div`
    color: ${(props) => props.theme.inv_text};
    position: relative;
    height: 70vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 1em;
    align-items: center;
    justify-content: center;
    .aboutImageWrapper {
        overflow: hidden;
        .aboutImage {
            object-fit: contain;
            width: 100%;
            height: 100%;
        }
        @media (max-width: 820px) {
            width: 100%;
            height: 80vh;
            max-width: none;
        }
    }
    .aboutText {
        width: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .aboutText__span {
        font-size: 1.2em;
        font-weight: 500;
        height: 80%;
        overflow-y: scroll;
        &::-webkit-scrollbar {
            display: none;
        }
        @media (min-height: 1180px) {
            font-size: 2em;
        }
    }
    @media (max-width: 820px) {
        flex-direction: column;
    }
`;

export const H2 = styled.span`
    font-weight: 600;
    margin: 0.5em 1em;
    font-size: 1.5em;
    &.activeView {
        // text-decoration-color: ${(props) => props.theme.inv_main};
        text-decoration: underline ${(props) => props.theme.inv_main};
    }
`;

export const AboutTextWrapper = styled(motion.div)`
    overflow: scroll;
    height: 100%;
    width: 100%;
    border: 2px solid red;
`;
