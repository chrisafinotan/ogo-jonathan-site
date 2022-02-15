import { useState } from "react";
import Navbar from "./navbar";
import Navigation from "./navigation";
import Header from "./header";
import CCursor from "./CCursor";
import Head from "next/head";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { normalize } from "styled-normalize";

import {
    useGlobalStateContext,
    useGlobalDispatchContext,
} from "../context/globalContext";

const GlobalStyle = createGlobalStyle`
  ${normalize}
  :root {
    --swiper-theme-color: ${(props) => props.theme.main};
  }
  * {
    text-decoration: none;
    cursor: none;
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
        background: "#000",
        text: "#fff",
        main: "#ea281e",
        inv_background: "#fff",
        inv_text: "#000",
        inv_main: "#1e76ea",
        left: `${hamburgerPosition.x}px`,
        top: `${hamburgerPosition.y}px`,
        width: `${hamburgerPosition.width}px`,
        height: `${hamburgerPosition.height}px`,
    };

    const lightTheme = {
        background: "#fff",
        text: "#000",
        main: "#1e76ea",
        inv_background: "#000",
        inv_text: "#fff",
        inv_main: "#ea281e",
        left: `${hamburgerPosition.x}px`,
        top: `${hamburgerPosition.y}px`,
        width: `${hamburgerPosition.width}px`,
        height: `${hamburgerPosition.height}px`,
    };

    const onCursor = (cursorType) => {
        cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;
        dispatch({ type: "CURSOR_TYPE", cursorType: cursorType });
    };

    return (
        <ThemeProvider theme={currentTheme === "dark" ? darkTheme : lightTheme}>
            <GlobalStyle />
            <Head>
                <title>Ogo Jonathan</title>
            </Head>
            {/* <Navbar></Navbar> */}
            <CCursor toggleMenu={toggleMenu} />
            <Header
                onCursor={onCursor}
                toggleMenu={toggleMenu}
                setToggleMenu={setToggleMenu}
                hamburgerPosition={hamburgerPosition}
                setHamburgerPosition={setHamburgerPosition}
                // siteTitle={data.site.siteMetadata.title}
            />
            <Navigation
                toggleMenu={toggleMenu}
                setToggleMenu={setToggleMenu}
                onCursor={onCursor}
                // hamburgerPosition={hamburgerPosition}
                setHamburgerPosition={setHamburgerPosition}
                projects={projects}
            />
            <div className="siteContent">{children}</div>
        </ThemeProvider>
    );
}
