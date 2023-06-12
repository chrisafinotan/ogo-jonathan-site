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

export const IndexWrapper = styled(motion.div)`
   position: relative;
   width: 100vw;
   // height: auto;
   overflow: scroll;
   box-sizing: border-box;
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   gap: 20px;
   grid-auto-rows: minmax(50vh, auto);
`;

export const ContentBox = styled(motion.div)`
   display: grid;
   align-items: center;
   align-content: center;
   position: relative;
   padding: 10px;
   ${(props) =>
      props.hide &&
      css`
         display: none;
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
   img {
      max-width: 100%;
      height: auto;
      object-fit: cover;
      position: relative;
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

   .text {
      //   border: 2px solid green;
      width: 100%;
      height: 100%;
      position: absolute;
      align-self: center;
      display: grid;
      align-items: center;
      align-content: center;
      span {
         //  border: 2px solid yellow;
         display: none;
         align-self: center;
         font-size: 1.7em;
         letter-spacing: 0.5rem;
         overflow: hidden;
         //  white-space: nowrap;
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
         display: grid;
         align-self: center;
      }
   }
`;

export const TitleBanner = styled(motion.div)`
   position: absolute;
   top: 0;
   display: flex;
   align-items: center;
   justify-content: center;
   height: 100%;
   width: 100%;
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

export const ContentContainer = styled(motion.div)`
   display: flex;
   max-width: 2200px;
   width: 100%;
   flex-wrap: wrap;
   flex-direction: row;
   justify-content: center;
   overflow: scroll;
   ::-webkit-scrollbar {
      display: none;
  }
   a {
      width: 19%;
      margin: 12px;
      display: flex;
      flex-grow: 1;
      max-width: 540px !important;
      img {
         width: 100%;
         height: auto;
      }
   }
   @media (max-width: 1240px) {
      a {
         width: 25%;
      }
   }
   @media (max-width: 1240px) {
      a {
         width: 30%;
      }
   }
   @media (max-width: 1050px) {
      a {
         width: 44%;
      }
   }
   @media (max-width: 840px) {
      a {
         width: 100%;
      }
   }
`;
