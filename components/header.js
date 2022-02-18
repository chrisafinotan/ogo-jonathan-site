import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Container, Flex } from "../styles/globalStyles";
import { HeaderNav, Logo, Menu } from "../styles/headerStyles";
import { Squeeze as Hamburger } from "hamburger-react";
import {
    useGlobalDispatchContext,
    useGlobalStateContext,
} from "../context/globalContext";
import useElementPosition from "../hooks/useElementPosition";

const Header = ({
    onCursor,
    setHamburgerPosition,
    setToggleMenu,
    toggleMenu,
}) => {
    const dispatch = useGlobalDispatchContext();
    const { currentTheme } = useGlobalStateContext();
    const hamburger = useRef(null);

    const themeName = ["dark", "light", "ferhat"];
    const toggleTheme = () => {
        let index = themeName.findIndex((el) => el === currentTheme);
        let newindex = 1;
        if (index > 0 && index < themeName.length) {
            newindex = (index + 1) % themeName.length;
        }
            dispatch({ type: "TOGGLE_THEME", theme: themeName[newindex] });
    };

    const menuHover = (element) => {
        onCursor("locked");
        let eventposition = useElementPosition(element);
        setHamburgerPosition(eventposition);
    };

    useEffect(() => {
        window &&
            window.localStorage.getItem("theme") == null &&
            window.localStorage.setItem("theme", currentTheme);
    }, [currentTheme]);

    useEffect(() => {
        if (hamburger && hamburger.current) {
            hamburger.current.addEventListener("mouseenter", () =>
                menuHover(hamburger)
            );
        }

        return () => {
            if (hamburger && hamburger.current) {
                hamburger.current.removeEventListener("mouseenter", () =>
                    menuHover(hamburger)
                );
            }
        };
    }, [hamburger]);

    return (
        <HeaderNav
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: -72, opacity: 0 }}
            transition={{
                duration: 1,
                ease: [0.6, 0.05, -0.01, 0.9],
            }}
        >
            <Container fluid padding={'0 2em'}>
                <Flex spaceBetween noHeight>
                    <Logo
                        onMouseEnter={() => onCursor("hovered")}
                        onMouseLeave={onCursor}
                        invert={toggleMenu && true}
                    >
                        <Link href="/">OJ</Link>
                        <span
                            onClick={toggleTheme}
                            onMouseEnter={() => onCursor("pointerinv")}
                            onMouseLeave={onCursor}
                        ></span>
                    </Logo>
                    <Menu
                        onClick={() => setToggleMenu(!toggleMenu)}
                        ref={hamburger}
                        onMouseLeave={onCursor}
                        open={toggleMenu}
                        invert={toggleMenu && true}
                    >
                        <Hamburger toggled={toggleMenu} />
                    </Menu>
                </Flex>
            </Container>
        </HeaderNav>
    );
};

export default Header;
