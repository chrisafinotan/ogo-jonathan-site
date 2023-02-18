import styled, { css } from "styled-components";
import { motion } from "framer-motion";

export const StyledSwiperWrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   //    position: absolute;
   width: 50%;
   transform: translate(50%, 50%);
   //    bottom: 10vh;
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
   alignself: center;
   overflow-x: auto;
   height: 100%;
   isolation: isolate;
   color: ${(props) => props.theme.text};
   z-index: 10;
   flex-basis: fit-content;
   flex-grow: 1;
   position: relative;
`;

export const Info = styled(motion.div)`
   color: ${(props) => props.theme.text};
   font-size: 2em;
   scroll-snap-align: start;
   text-align: center;
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   gridautoflow: row;
   flex-basis: 15%;
   max-height: 20vh;
   .name {
      width: 100%;
      font-family: Telma-Variable, sans-serif;
      font-weight: 900;
      flex-basis: 50%;
      font-size: 4em;
      line-height: 1;
      font-weight: 300;
      letter-spacing: -0.025em;
      text-transform: none;
      @media (max-width: 840px) {
         font-size: 2em;
      }
      @media (max-width: 1540px) {
        font-size: 3em;
     }
   }
   .category {
      opacity: 0.5;
      font-size: 0.75rem;
   }
   .desc {
      padding-top: 1rem;
      width: 100%;
   }
   ${(props) =>
      props.small === 'Yes' &&
      css`
         grid-template-columns: none;
         .name {
            font-size: 2rem;
         }
         .more {
            font-size: 1rem;
         }
      `};
`;

export const LinkWrapper = styled(motion.div)`
   z-index: 20;
   font-family: Telma-Variable, sans-serif;
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 0 1rem 0 2rem;
   margin: 2rem;
   position: absolute;
   right: 0;
   bottom: 0;
   //    mix-blend-mode: difference;
   color: ${(props) => props.theme.text};
   background-color: ${(props) => props.theme.background};
   font-size: 1.5em;
   gap: 8px;
   .svg {
      font-size: 0.5em;
   }
   ${(props) =>
      props.small === 'Yes' &&
      css`
         font-size: 0.75em;
      `};
`;
