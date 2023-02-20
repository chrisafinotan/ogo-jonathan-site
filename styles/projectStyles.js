import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const StyledSwiperWrapper = styled.div`
   display: flex;
   height: 30px;
   svg {
      width: 50px;
      height: 100%;
      path {
         fill: ${(props) => props.theme.text};
      }
   }
`;

export const StyledSwiperPagination = styled.div`
align-self: center;
   height: 5px !important;
   position: relative !important;
   width: 100%;
   z-index: 10;
   svg {
      width: 50px;
      height: 50px;
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
      pointer-events: none;
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
