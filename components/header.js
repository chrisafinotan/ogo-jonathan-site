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
    // const position = useElementPosition(hamburger);

    const toggleTheme = () => {
        if (currentTheme === "dark") {
            dispatch({ type: "TOGGLE_THEME", theme: "light" });
        } else {
            dispatch({ type: "TOGGLE_THEME", theme: "dark" });
        }
    };

    const menuHover = (element) => {
        // console.log("changing burger pos", position);
        console.log("event source", element);

        onCursor("locked");
        let eventposition = useElementPosition(element);
        console.log(eventposition);
        //
        // setHamburgerPosition({ x: position.x, y: position.y + 72 });
        setHamburgerPosition(eventposition);
    };

    useEffect(() => {
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
                        onMouseLeave={onCursor}
                        open={toggleMenu}
                    >
                        <button>
                            <span
                                className={toggleMenu ? "first" : undefined}
                            ></span>
                            <span
                                className={toggleMenu ? "second" : undefined}
                            ></span>
                        </button>
                    </Menu>
                </Flex>
            </Container>
        </HeaderNav>
    );
};

export default Header;
