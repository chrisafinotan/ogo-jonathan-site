import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';

export const StyledSwiperWrapper = styled(motion.div)`
   display: flex;
   height: 30px;
   svg {
      width: 50px;
      height: 100%;
      path {
         fill: ${(props) => props.theme.text};
      }
   }
   justify-content: center;
`;

export const StyledSwiperPagination = styled.div`
   max-width: 600px;
   align-self: center;
   height: 5px !important;
   position: relative !important;
   width: 100%;
   svg {
      width: 3rem;
      height: 3rem;
      path {
         fill: ${(props) => props.theme.main};
      }
   }
`;

export const StyledSwiperNavBtn = styled.div`
   height: 25px;
   background: transparent;
   transition: all 200ms ease;
   &.swiper-button-disabled {
      opacity: 0;
   }
   svg {
      fill: ${(props) => props.theme.main};
   }
   :hover {
      svg {
         fill: ${(props) => props.theme.main};
      }
   }
`;

export const ImagesWrapper = styled(motion.div)`
   color: ${(props) => props.theme.text};
   display: flex;
   align-self: center;
   overflow-x: auto;
   height: 100%;
   max-height: 80vh;
   min-height: 80vh;
   width: 100%;
   isolation: isolate;
   flex-basis: fit-content;
   flex-grow: 1;
   position: relative;
`;

export const Info = styled(motion.div)`
   color: ${(props) => props.theme.text};
   scroll-snap-align: start;
   display: grid;
   grid-template-columns: 1fr 1fr;
   max-height: 20vh;
   min-height: 20vh;
   margin: 12px;
   pointer-events: none;

   .name {
      left: 0%;
      width: 100%;
      height: fit-content;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 3rem;
      // white-space: pre-line;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      text-align: center;
      color: ${(props) => props.theme.text};
   }
   .more {
      padding: 12px;
      box-sizing: border-box;
   }
   .category {
      opacity: 0.5;
      font-size: 0.75rem;
   }
   .desc {
      padding-top: 16px;
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

export const StyledLink = styled(motion.a)`
   // border: 1px solid yellow;
   max-width: 30vw;
   min-width: 30vw;
   height: 2rem;
   position: absolute;
   bottom: 16px;
   right: 16px;
   display: block;
   z-index: 10;
   @media (max-width: 840px) {
      max-width: 40vw;
   }
`;

export const LinkWrapper = styled(motion.div)`
   display: grid;
   align-items: center;
   grid-template-columns: 1fr 32px;
   color: ${(props) => props.theme.text};
   background-color: ${(props) => props.theme.background};
   font-size: 1.5rem;
   gap: 8px;
   @media (max-width: 840px) {
      font-size: 12px;
   }
   .svg {
      font-size: 0.5rem;
      right: 0px;
   }
   .name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
   }
   ${(props) =>
      props.small === 'Yes' &&
      css`
         font-size: 0.75rem;
      `};
`;
