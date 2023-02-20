import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';

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

const textShadow = keyframes`
    0% {
        // transform: translateY(0);
        text-shadow: 0 0 0 var(--main-bg-red), 0 0 0 var(--main-bg-blue),
            0 0 0 var(--main-bg-green), 0 0 0 var(--main-bg-orange);
    }

    20% {
        // transform: translateY(-0.35em);
        text-shadow: 0 0.125em 0 var(--main-bg-red), 0 0.25em 0 var(--main-bg-blue),
            0 -0.125em 0 var(--main-bg-green), 0 -0.25em 0 var(--main-bg-orange);
    }

    40% {
        // transform: translateY(0.25em);
        text-shadow: 0 -0.0625em 0 var(--main-bg-red),
            0 -0.125em 0 var(--main-bg-blue), 0 0.0625em 0 var(--main-bg-green),
            0 0.125em 0 var(--main-bg-orange);
    }

    60% {
        // transform: translateY(-0.125em);
        text-shadow: 0 0.03125em 0 var(--main-bg-red),
            0 0.0625em 0 var(--main-bg-blue), 0 -0.03125em 0 var(--main-bg-green),
            0 -0.0625em 0 var(--main-bg-orange);
    }

    80% {
        // transform: translateY(0);
        text-shadow: 0 0 0 var(--main-bg-red), 0 0 0 var(--main-bg-blue),
            0 0 0 var(--main-bg-green), 0 0 0 var(--main-bg-orange);
    }
`;

export const Container = styled.div`
   flex-grow: 1;
   margin: 0 auto;
   padding: 0 32px;
   position: relative;
   box-sizing: border-box;
   width: auto;
   height: 100%;
   @media (min-width: 1024px) {
      max-width: 960px;
   }
   @media (min-width: 1216px) {
      max-width: 1152px;
   }
   @media (min-width: 1408px) {
      max-width: 1244px;
   }

   ${(props) =>
      props.fluid &&
      css`
         padding: 0;
         margin: 0;
         // background: ${(props) => props.theme.background};
         max-width: 100% !important;
      `}
   ${(props) =>
      props.center &&
      css`
         padding: 0;
         margin: 0;
         max-width: 100% !important;
         display: flex;
         justify-content: center;
      `}  
    ${(props) =>
      props.backgroundColor &&
      css`
         background-color: ${(props) => props.theme.background};
      `} 
    ${(props) =>
      props.padding &&
      css`
         padding: ${(props) => props.padding};
      `}
    ${(props) =>
      props.margin &&
      css`
         margin: ${(props) => props.margin};
      `}
    ${(props) =>
      props.width &&
      css`
         width: ${(props) => props.width} !important;
      `}
    ${(props) =>
      props.height &&
      css`
         height: ${(props) => props.height};
      `}
    ${(props) =>
      props.test &&
      css`
         border: 2px solid yellow;
      `};
`;

export const Flex = styled.div`
   position: relative;
   display: flex;
   align-items: center;
   color: ${(props) => props.theme.inv_text};

   ${(props) =>
      props.test &&
      css`
         border: 2px solid yellow;
      `};
   ${(props) =>
      props.grow &&
      css`
         flex-grow: 1;
      `};
   ${(props) =>
      props.row &&
      css`
         flex-direction: column;
         // justify-content: flex-start;
         // align-items: center;
      `};
   ${(props) =>
      props.spaceBetween &&
      css`
         justify-content: space-between;
      `};
   ${(props) =>
      props.flexEnd &&
      css`
         justify-content: flex-end;
      `};
   ${(props) =>
      props.flexStart &&
      css`
         justify-content: flex-start;
      `};
   ${(props) =>
      props.flexCenter &&
      css`
         justify-content: center;
      `};
   ${(props) =>
      props.alignTop &&
      css`
         align-items: flex-start;
      `};
   ${(props) =>
      props.noHeight &&
      css`
         height: 0;
      `};
   ${(props) =>
      props.height &&
      css`
         height: ${(props) => props.height};
      `}
   ${(props) =>
      props.width &&
      css`
         width: ${props.width};
      `};
   ${(props) =>
      props.gap &&
      css`
         gap: ${props.gap}px;
      `};
   ${(props) =>
      props.padding &&
      css`
         padding: ${props.padding};
      `};
   ${(props) =>
      props.margin &&
      css`
         margin: ${props.margin};
      `};
`;

export const Cursor = styled.div`
   position: fixed;
   top: 400px;
   left: 400px;
   width: 16px;
   height: 16px;
   background: ${(props) => props.theme.main};
   border-radius: 100%;
   border: 1px solid red;
   transform: translate(-50%, -50%);
   transition: all 0.1s ease-out;
   transition-property: width, height, border;
   will-change: width, height, transform, border;
   pointer-events: none;
   z-index: 101;
   svg {
      position: absolute;
      top: 0;
      transform: translate(100%, 100%) scale(2);
      fill: ${(props) => props.theme.main};
   }
   &.pointer {
      width: 32px;
      height: 32px;
      border: 4px solid ${(props) => props.theme.main} !important;
   }
   &.nav-open,
   &.pointer {
      border: 4px solid ${(props) => props.theme.inv_background} !important;
   }
   &.pointertheme {
      border: 4px solid ${(props) => props.theme.main} !important;
   }
   &.pointerinv {
      border: 4px solid ${(props) => props.theme.inv_main} !important;
   }
   &.hovered {
      background: transparent !important;
      width: 56px;
      height: 56px;
      border: 4px solid ${(props) => props.theme.main};
      svg {
         path {
            fill: ${(props) => props.theme.main};
         }
      }
   }
   &.locked {
      background: transparent !important;
      // width: 56px;
      // height: 56px;
      width: ${(props) => props.theme.width} !important;
      height: ${(props) => props.theme.height} !important;
      border: 4px solid ${(props) => props.theme.text} !important;
      top: ${(props) => props.theme.top} !important;
      left: ${(props) => props.theme.left} !important;
      transition: border 0.5s ease-in-out;
   }
   &.wrapped {
      transition: all 0.1s ease-out;
      background: transparent !important;
      width: ${(props) => props.theme.width} !important;
      height: ${(props) => props.theme.height} !important;
      padding: 0.5em 0.2em;
      border: 4px solid ${(props) => props.theme.text} !important;
      top: ${(props) => props.theme.top} !important;
      left: ${(props) => props.theme.left} !important;
      border-radius: 2em;
   }
   &.nav-open {
      background: ${(props) => props.theme.inv_text};
      border: 4px solid ${(props) => props.theme.inv_text} !important;
   }
   &.nav-open {
      &.locked,
      &.wrapped {
         transition: all 0.1s ease-out;
         border: 4px solid ${(props) => props.theme.inv_text} !important;
      }
   }
`;

export const LoadingBanner = styled(motion.div)`
   // background: #000;
   background: ${(props) => props.color};
   z-index: 105;
   position: absolute;
   display: flex;
   align-items: center;
   justify-content: center;
   height: 100vh;
   width: 100vw;
   // pointer-events: none;
   ${(props) =>
      props.loading === 'loading'
         ? css`
              .row {
                 // transform: translate(50%);
                 display: flex;
                 align-items: center;
                 justify-content: center;
                 width: 100vw;
              }
              .text {
                 //   position: relative;
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
                 animation: ${textShadow} 1s ease-in-out infinite;
                 line-height: 2;
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
                 // mix-blend-mode: revert;
                 height: 2em;
                 width: 2em;
                 // z-index: 8;
                 background: ${(props) => props.theme.main};
                 margin: 0.2em;
                 background: yellow;
                 border-radius: 100%;
                 //   position: relative;
                 animation: ${blink} 3s linear infinite;
              }

              @media (prefers-reduced-motion: reduce) {
                 * {
                    animation: none !important;
                    transition: none !important;
                 }
              }
           `
         : css`
              display: none;
           `}
`;
