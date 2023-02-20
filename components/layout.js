import { useState, useEffect } from 'react';
import Navigation from './navigation';
import Header from './header';
import CCursor from './CCursor';
import Head from 'next/head';

import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { normalize } from 'styled-normalize';

import {
   useGlobalStateContext,
   useGlobalDispatchContext,
} from '../context/globalContext';

import { useBreakpoint } from '../context/breakpointContext';
const GlobalStyle = createGlobalStyle`
  ${normalize}
  :root {
    --swiper-theme-color: ${(props) => props.theme.main};
  }
  * {
    text-decoration: none;
  }

  html {
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      font-size: 16px;
  }

  body {
    font-size: 16px;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: ${(props) => props.theme.background};
    overscroll-behavior: none;
    overflow-x: hidden;
  }
  `;

export default function Layout({ children, projects }) {
   const breakpoints = useBreakpoint();
   const dispatch = useGlobalDispatchContext();
   const { cursorStyles, currentTheme } = useGlobalStateContext();
   const [hamburgerPosition, setHamburgerPosition] = useState({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
   });

   const [toggleMenu, setToggleMenu] = useState(false);

   const darkTheme = {
      background: '#000',
      text: '#fff',
      main: '#ea281e',
      inv_background: '#fff',
      inv_text: '#000',
      inv_main: '#1e76ea',
      left: `${hamburgerPosition.x}px`,
      top: `${hamburgerPosition.y}px`,
      width: `${hamburgerPosition.width}px`,
      height: `${hamburgerPosition.height}px`,
      // cursor: 'none',
   };

   const lightTheme = {
      background: '#fff',
      text: '#000',
      main: '#1e76ea',
      inv_background: '#000',
      inv_text: '#fff',
      inv_main: '#ea281e',
      left: `${hamburgerPosition.x}px`,
      top: `${hamburgerPosition.y}px`,
      width: `${hamburgerPosition.width}px`,
      height: `${hamburgerPosition.height}px`,
   };

   const ferhatTheme = {
      background: '#825f45',
      //   text: "#797d62",
      text: '#c8691c',
      main: '#c8691c',
      inv_background: '#797d62',
      inv_text: '#e4ceaf',
      // inv_main: "#825f45",
      inv_main: '#e4ceaf',
      left: `${hamburgerPosition.x}px`,
      top: `${hamburgerPosition.y}px`,
      width: `${hamburgerPosition.width}px`,
      height: `${hamburgerPosition.height}px`,
   };

   const themes = [darkTheme, lightTheme, ferhatTheme];
   const themeName = ['dark', 'light', 'ferhat'];

   const onCursor = (cursorType) => {
      cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;
      dispatch({ type: 'CURSOR_TYPE', cursorType: cursorType });
   };

   useEffect(() => {
      let thisCurrentTheme =
         window &&
         (window.localStorage.getItem('theme') == null
            ? 'dark'
            : window.localStorage.getItem('theme'));
      if (thisCurrentTheme !== currentTheme) {
         dispatch({ type: 'TOGGLE_THEME', theme: `${thisCurrentTheme}` });
      }
   }, []);

   return (
      <ThemeProvider
         theme={() => {
            let index = themeName.findIndex((el) => el === currentTheme);
            let ret = themes[index];
            ret.cursor = breakpoints.md ? 'auto' : 'none';
            return ret;
         }}
      >
         <GlobalStyle />
         <Head>
            <title>OGO JONATHAN</title>
         </Head>
         {!breakpoints.md && <CCursor toggleMenu={toggleMenu} />}

         <Header
            onCursor={onCursor}
            toggleMenu={toggleMenu}
            setToggleMenu={setToggleMenu}
            hamburgerPosition={hamburgerPosition}
            setHamburgerPosition={setHamburgerPosition}
         />
         <Navigation
            toggleMenu={toggleMenu}
            setToggleMenu={setToggleMenu}
            onCursor={onCursor}
            setHamburgerPosition={setHamburgerPosition}
            projects={projects}
         />
         <div className='siteContent'>
            {!breakpoints.md && <CCursor toggleMenu={toggleMenu} />}
            {children}
         </div>
      </ThemeProvider>
   );
}
