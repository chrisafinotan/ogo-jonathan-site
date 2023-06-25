import { useState, useEffect } from 'react';
import Header from './header';
import CCursor from './CCursor';
import Head from 'next/head';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { normalize } from 'styled-normalize';
import {
   createTheme,
   ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
import themes from '../styles/themes';
import {
   useGlobalStateContext,
   useGlobalDispatchContext,
} from '../context/globalContext';
import { useBreakpoint } from '../context/breakpointContext';
import customFont from '../styles/fonts';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  :root {
    --swiper-theme-color: ${(props) => props.theme.main};
    --app-font: ${customFont.style.fontFamily};
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
    font-family: var(--app-font), sans-serif;
    background: ${(props) => props.theme.background};
    overscroll-behavior: none;
    overflow-x: hidden;
  }
  `;

const MUITheme = createTheme({
   typography: {
      fontFamily: [customFont.style.fontFamily, 'Arial'].join(','),
   },
});

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

   const modifiedThemes = themes.map((theme) => {
      return {
         ...theme,
         left: `${hamburgerPosition.x}px`,
         top: `${hamburgerPosition.y}px`,
         width: `${hamburgerPosition.width}px`,
         height: `${hamburgerPosition.height}px`,
      };
   });

   const [toggleMenu, setToggleMenu] = useState(false);

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
            let index = modifiedThemes
               .map((el) => el.name)
               .findIndex((el) => el === currentTheme);
            let ret = modifiedThemes[index];
            ret.cursor = breakpoints.md ? 'auto' : 'none';
            return ret;
         }}
      >
         <MUIThemeProvider theme={MUITheme}>
            <GlobalStyle />
            <Head>
               <title>OGO JONATHAN</title>
               <link
                  rel='icon'
                  href='/icon?<generated>&color=red'
                  type='image/png'
                  sizes='32x32'
               />
            </Head>
            {!breakpoints.md && <CCursor toggleMenu={toggleMenu} />}

            <Header
               onCursor={onCursor}
               toggleMenu={toggleMenu}
               setToggleMenu={setToggleMenu}
               hamburgerPosition={hamburgerPosition}
               setHamburgerPosition={setHamburgerPosition}
               projects={projects}
            />

            <div id='siteContent'>{children}</div>
         </MUIThemeProvider>
      </ThemeProvider>
   );
}
