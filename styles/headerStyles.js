import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';

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
   width: 100%;
   position: sticky;
   top: 0;
   right: 0;
   left: 0;
   z-index: 11;
   .wrapper {
      height: 100%;
      margin: 0 72px;
      max-width: 100vw;
   }
   ${(props) =>
      props.small === 'Yes' &&
      css`
         .wrapper {
            height: 100%;
            margin: 0;
         }
      `};
`;

export const Logo = styled.div`
   padding: 0.5em;
   display: flex;
   align-items: center;
   .title {
      height: fit-content;
      width: fit-content;
      display: inline-block;
      font-size: 1.5rem;
      text-decoration: none;
      font-weight: 900;
      color: ${(props) => props.theme.text};
   }
   span {
      height: 16px;
      width: 16px;
      background: ${(props) => props.theme.main};
      margin: 0 1rem;
      border-radius: 100%;
      display: inline-block;
      position: relative;
      transform: translate(0%, 0%);
      // bottom: 2px;
      animation: ${blink} 3s linear infinite;
      transition: all 0.5s ease-out;
      &:hover {
         transform: scale(2);
      }
   }
`;

export const Menu = styled.div`
   z-index: 11;
   color: ${(props) => props.theme.text};
   .hamburger-react {
      color: ${(props) => props.theme.text};
      font-weight: 700;
      * {
         transition: unset;
         transition: translate 0.4s cubic-bezier(0, 0, 0, 1) !important;
      }
   }
`;
