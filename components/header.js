import React, { useEffect, useRef } from "react";
import Link from "next/link";
// Styled Components
import { Container, Flex } from "../styles/globalStyles";
import { HeaderNav, Logo, Menu } from "../styles/headerStyles";

//context
import {
    useGlobalDispatchContext,
    useGlobalStateContext,
} from "../context/globalContext";
//Custom Hook
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
    const position = useElementPosition(hamburger);

    const toggleTheme = () => {
        if (currentTheme === "dark") {
            dispatch({ type: "TOGGLE_THEME", theme: "light" });
        } else {
            dispatch({ type: "TOGGLE_THEME", theme: "dark" });
        }
    };

    const menuHover = () => {
        console.log("changing burger pos", position);
        onCursor("locked");
        setHamburgerPosition({ x: position.x, y: position.y + 72 });
    };

    useEffect(() => {
        window.localStorage.setItem("theme", currentTheme);
    }, [currentTheme]);

    return (
        <HeaderNav
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: -72, opacity: 0 }}
            transition={{
                duration: 1,
                ease: [0.6, 0.05, -0.01, 0.9],
            }}
        >
            <Container>
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
                        onMouseEnter={menuHover}
                        onMouseLeave={onCursor}
                        open={toggleMenu}
                    >
                        <button>
                            <span className={toggleMenu ? "first": undefined}></span>
                            <span className={toggleMenu ? "second": undefined}></span>
                        </button>
                    </Menu>
                </Flex>
            </Container>
        </HeaderNav>
    );
};

export default Header;
