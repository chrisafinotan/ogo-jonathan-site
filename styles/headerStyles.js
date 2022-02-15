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
    height: 0px;
    width: 100%;
    position: absolute;
    top: 72px;
    right: 0;
    left: 0;
    z-index: 999;
`;

export const Logo = styled.div`
    a {
        font-size: 1.8rem;
        text-decoration: none;
        font-weight: 800;
        color: #000;
        color: ${(props) =>
            props.invert ? props.theme.inv_text : props.theme.text};
    }
    span {
        height: 16px;
        width: 16px;
        // background: ${(props) => props.theme.main};
        background: ${(props) =>
            props.invert ? props.theme.inv_main : props.theme.main};
        margin: 0 4px;
        border-radius: 100%;
        display: inline-block;
        position: relative;
        bottom: 2px;
        // css
        //     padding: 0;
        //     margin: 0;
        //     background: ${(props) => props.theme.background};
        //     max-width: 100% !important;
        //
        animation: ${blink} 3s linear infinite;
    }
`;

export const Menu = styled.div`
    button {
        transform-origin: center;
        border: none;
        padding: 20px;
        background: none;
        outline: none;
        span {
            width: 36px;
            height: 8px;
            display: block;
            background: ${(props) => props.theme.text};
            margin: ${(props) => !props.open && "8px"};
        }
        .first {
            transform: translate(-8px, 4px) rotateZ(-45deg);
        }
        .second {
            transform: translate(-8px, -4px) rotateZ(45deg);
        }
    }
`;
