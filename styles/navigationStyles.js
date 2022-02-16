import styled from "styled-components";
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
    overflow: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
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
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10% 0;
    z-index: 3;

    ul {
        // overflow: scroll;
        height: 100%;
        margin: 0;
        padding: 2rem 0;
        z-index: 3;

        li {
            list-style: none;
            font-size: 3rem;
            text-transform: uppercase;
            font-weight: 900;
            height: 96px;
            height: min-content;
            line-height: 96px;
            overflow: hidden;
            z-index: 3;
            .link {
                color: ${(props) => props.theme.background};
                position: relative;
                display: flex;
                align-items: center;
                &:hover {
                    z-index: 6;
                }
                z-index: 3;
                .arrow {
                    display: flex;
                    align-items: center;
                    height: 76px;
                    width: 60px;
                    margin-right: 8px;
                    pointer-events: none;
                    // background: ${(props) => props.theme.inv_main};
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
`;

export const NavFooter = styled.div`
    position: sticky;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    // background: ${(props) => props.theme.background};
    // background: ${(props) => props.theme.inv_main};
    height: fit-content;
    padding: 6px 0px;
    p {
        color: ${(props) => props.theme.background};
    }
    svg path {
        fill: ${(props) => props.theme.background};
    }
`;

export const NavContent = styled.div`
    position: fixed;
    display: block;
    top: 0;
    bottom: 0;
    // left: 0;
    height: 80%;
    width: 80%;
    background: none;
    transform: translate(20%, 15%);

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
        // position: absolute;
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
    display: flex;
    flex-direction: row;
    gap: 1em;
    padding: 1em;
    border: none;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    .aboutImageWrapper {
        max-width: 50vw;
        width: 100%;
        position: relative;
        .aboutImage {
            object-fit: cover;
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
        @media (min-height: 1180px) {
            font-size: 2em;
        }
    }
    @media (max-width: 820px) {
        flex-direction: column;
    }
`;
