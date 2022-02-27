import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

const blink = keyframes`
0% {
    opacity: 1;
  }
  50% {
    opacity: .3;
  }
  100% {
    opacity: 1;
  }
`;

export const HeaderNav = styled(motion.div)`
    height: fit-content;
    width: 100%;
    position: absolute;
    top: 32px;
    right: 0;
    left: 0;
    * {
        z-index: 100;
    }
`;

export const Logo = styled.div`
    padding: 0.5em;
    display: flex;
    align-items: center;
    // border: 2px solid yellow;
    a {
        height: fit-content;
        width: fit-content;
        display: inline-block;
        font-size: 2.2rem;
        text-decoration: none;
        font-weight: 800;
        color: ${(props) =>
            props.invert ? props.theme.inv_text : props.theme.text};
    }
    span {
        height: 16px;
        width: 16px;
        background: ${(props) =>
            props.invert ? props.theme.inv_main : props.theme.main};
        margin: 0 1rem;
        border-radius: 100%;
        display: inline-block;
        position: relative;
        transform: translate(0%, 0%);
        // bottom: 2px;
        animation: ${blink} 3s linear infinite;
        &:hover {
            transform: scale(2);
            transition: all 0.5s ease-out;
        }
    }
`;

export const Menu = styled.div`
    .hamburger-react {
        color: ${(props) =>
            props.invert ? props.theme.inv_text : props.theme.text};
        * {
            mix-blend-mode: difference;
            // color: #fff;
            // background: ${(props) => props.theme.background} !important;
        }
        mix-blend-mode: color-dodge;
        // background: ${(props) => props.theme.background} !important;
        font-weight: 700;
        // color: #fff;
    }
`;
