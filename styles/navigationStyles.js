import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const bounceUP = keyframes`
0%   { transform: translateY(0); }
        30%  { transform: translateY(10px); }
        50%  { transform: translateY(0); }
        100% { transform: translateY(0); }
`;

const bounceDOWN = keyframes`
0%   { transform: translateY(0); }
        30%  { transform: translateY(-10px); }
        50%  { transform: translateY(0); }
        100% { transform: translateY(0); }
`;

export const Nav = styled(motion.div)`
   position: fixed;
   right: 0;
   width: 75vw;
   height: 100%;
   max-height: 100vh;
   display: grid;
   grid-template-rows: 9fr 72px;
   background: ${(props) => props.theme.main};
   color: #000;
   z-index: 10;
   text-transform: uppercase;
   ${(props) =>
      props.small === 'Yes' &&
      css`
         width: 100%;
      `};
`;

export const NavHeader = styled.div`
   top: 72px;
   width: 100%;
   position: relative;
   h2 {
      color: ${(props) => props.theme.background};
      font-weight: 900;
   }
`;

export const NavList = styled.div`
   color: ${(props) => props.theme.background};
   overflow: hidden;
   max-height: 90vh;
   margin: 16px;
   margin-top: 64px;
   .categories {
      display: flex;
      min-height: 32px;
      flex-direction: row;
      align-items: center;
      gap: 16px;
      font-size: 1rem;
      font-weight: 900;
      .active {
         text-decoration: underline ${(props) => props.theme.inv_main};
         text-decoration-thickness: 0.3em;
      }
   }
   .list {
      margin: 32px 0;
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: start;

      // ::-webkit-scrollbar {
      //    display: none;
      // }
      ul {
         max-height: 70vh;
         overflow: scroll;
         display: flex;
         flex-direction: column;
         align-self: start;
         width: fit-content;
         margin: 0;
         padding: 0;
         ::-webkit-scrollbar {
            display: none;
         }
         li {
            list-style: none;
            font-size: 2rem;
            font-weight: 900;
            max-height: 4rem;
            min-height: 4rem;
            width: fit-content;
            max-width: 60vw;
            ${(props) =>
               props.small === 'Yes' &&
               css`
                  max-width: 80vw;
               `};
            .link {
               color: ${(props) => props.theme.background};
               \ span {
                  color: ${(props) => props.theme.inv_text};
               }
               position: relative;
               display: flex;
               gap: 0.4rem;
               align-items: center;
               .index {
                  font-size: 0.4em;
                  opacity: 0.3;
                  align-self: start;
               }
               .routeName {
                  width: 100%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
               }
               .tag {
                  font-size: 0.4em;
                  opacity: 0.3;
                  align-self: end;
               }
               transition: all 0.2s ease;
               &:after {
                  content: '';
                  position: absolute;
                  bottom: 0;
                  border: 0px solid ${(props) => props.theme.inv_main};
                  width: 0px;
                  transition: all 0.5s ease-in-out;
               }
               &:hover:after {
                  content: '';
                  position: absolute;
                  bottom: 0;
                  border: 2px solid ${(props) => props.theme.inv_main};
                  width: 100%;
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
               width: 100%;
               path {
                  fill: ${(props) => props.theme.background};
               }
            }
         }
      }
      .scroll {
         display: grid;
         grid-template-rows: 0.1fr 1.2fr 0.1fr;
         width: 2em;
         height: 100%;
         span {
            width: fit-content;
            height: fit-content;
            justify-self: center;
            align-self: center;
         }
         .mid {
            border: 1px solid ${(props) => props.theme.background};
            white-space: nowrap;
            height: 100%;
            text-align: center;
         }
         .up {
            animation: ${bounceUP} 2s cubic-bezier(0.25, 1.7, 0.35, 0.8)
               infinite;
            // transition: opacity 0.5s ease-in;
            align-self: end;
         }
         .down {
            animation: ${bounceDOWN} 2s cubic-bezier(0.25, 1.7, 0.35, 0.8)
               infinite;
            // transition: opacity 0.5s ease-in;
            align-self: start;
         }
      }
   }
`;

export const NavFooter = styled.div`
   // border: 2px solid red;
   width: 100%;
   z-index: 10;
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
   top: 30%;
   right: 16px;
   height: 40%;
   width: 40%;
   background: none;
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
   flex-direction: column;
   gap: 1em;
   align-items: center;
   justify-content: center;
   font-weight: 800;
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
   .aboutDesc {
      width: 100%;
      height: 5rem;
      font-size: 3em;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
   }
   .aboutText {
      width: 100%;
      height: 100%;
      min-height: 15em;
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
      text-decoration: underline ${(props) => props.theme.inv_main};
      text-decoration-thickness: 0.3em;
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

export const AboutTextWrapper = styled(motion.div)`
   overflow: scroll;
   height: 100%;
   width: 100%;
   // border: 2px solid red;
`;
