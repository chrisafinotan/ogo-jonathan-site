import React, { useState, useRef } from "react";
import Link from "next/link";
import useElementPosition from "../hooks/useElementPosition";
//Styled Components
import { Container, Flex } from "../styles/globalStyles";
import {
    Nav,
    NavHeader,
    NavList,
    NavFooter,
    NavContent,
    CloseNav,
    NavAbout,
} from "../styles/navigationStyles";
import { FooterContent, FooterSocial } from "../styles/footerStyles";
//Icons
import { Instagram, Facebook, Vimeo } from "../assets/svg/social-icons";
//Framer Motion
import { motion, AnimatePresence } from "framer-motion";
import { imageWrapper, spanContainer, spanText } from "../framer/variants";

const Navigation = ({
    projects,
    toggleMenu,
    setToggleMenu,
    onCursor,
    setHamburgerPosition,
}) => {
    // projects = [...projects, ...projects];
    const ProjectsView = projects ? (
        <NavList>
            <ul>
                {projects.map((route, index) => (
                    <motion.li
                        key={route.id}
                        onMouseEnter={() => onCursor("pointer")}
                        onMouseLeave={onCursor}
                        onHoverStart={() =>
                            setRevealContent({
                                show: true,
                                content: route.content,
                                key: `route_${index}`,
                                type: route.type,
                            })
                        }
                        onHoverEnd={() =>
                            setRevealContent({
                                show: false,
                                content: route.content,
                                key: `route_${index}`,
                                type: route.type,
                            })
                        }
                        onClick={() => {
                            setToggleMenu(false);
                        }}
                    >
                        <Link href={`/project/${route.id}`}>
                            <motion.div
                                initial={{ x: -108 }}
                                className="link"
                                whileHover={{
                                    x: -40,
                                    transition: {
                                        duration: 0.4,
                                        ease: [0.6, 0.05, -0.01, 0.9],
                                    },
                                }}
                            >
                                <span className="arrow">
                                    <motion.svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 101 57"
                                    >
                                        <path
                                            d="M33 34H0V24h81.429L66 7.884 73.548 0l19.877 20.763.027-.029L101 28.618 73.829 57l-7.548-7.884L80.753 34H33z"
                                            fill="#000"
                                            fillRule="evenodd"
                                        ></path>
                                    </motion.svg>
                                </span>
                                {route.name}
                            </motion.div>
                        </Link>
                    </motion.li>
                ))}
            </ul>
        </NavList>
    ) : (
        <div>PROJECTS</div>
    );

    const AboutView = (
        <NavAbout>
            <motion.div
                variants={imageWrapper}
                initial="init"
                animate="anim"
                whileHover="color"
                className="aboutImageWrapper"
            >
                {/* <Image */}
                <img
                    src="/images/profilePic.jpg"
                    alt="Profile Picture of Ogo Jonathan"
                    width={1440}
                    height={1440}
                    layout="fill"
                    className="aboutImage"
                    style={{ position: "relative" }}
                />
            </motion.div>
            <motion.div className="aboutText">
                <motion.div
                    variants={spanContainer}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="aboutText__span"
                >
                    <motion.div variants={spanText} style={{ originX: 0 }}>
                        BLAH BLAH BLAH BLAH ...This is taking longer than
                        expected
                    </motion.div>
                    <motion.div variants={spanText} style={{ originX: 0 }}>
                        words words words words words i actually typed it out...
                        not copy and paste
                    </motion.div>
                    <motion.div variants={spanText} style={{ originX: 0 }}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                    </motion.div>
                    <motion.div variants={spanText} style={{ originX: 0 }}>
                        elit. Aliquid cupiditate dolores suscipit error, ratione
                    </motion.div>
                    <motion.div variants={spanText} style={{ originX: 0 }}>
                        accusamus explicabo aperiam! Officiis esse obcaecati
                    </motion.div>
                    <motion.div variants={spanText} style={{ originX: 0 }}>
                        iusto, ipsam cupiditate.
                    </motion.div>
                </motion.div>
            </motion.div>
        </NavAbout>
    );

    const views = [
        {
            name: "Projects",
            view: ProjectsView,
        },
        {
            name: "About",
            view: AboutView,
        },
    ];

    const [menuView, setMenuView] = useState(views[0]);
    const [revealContent, setRevealContent] = useState({
        show: false,
        video: "featured-video.mp4",
        key: "0",
    });

    // console.log("navigation");
    // console.log(revealContent.content);

    const closeHamburger = useRef(null);
    const position =
        closeHamburger.current && useElementPosition(closeHamburger);

    const menuHover = () => {
        onCursor("locked");
        setHamburgerPosition({ x: position.x, y: position.y + 72 });
    };

    return (
        <>
            <AnimatePresence>
                {toggleMenu && (
                    <Nav
                        initial={{ x: "-100%" }}
                        exit={{ x: "-100%" }}
                        animate={{ x: toggleMenu ? 0 : "-100%" }}
                        transition={{
                            duration: 0.8,
                            ease: [0.6, 0.05, -0.01, 0.9],
                        }}
                    >
                        <Container>
                            <NavHeader>
                                <Flex flexEnd noHeight>
                                    <Flex spaceBetween noHeight width={`20%`}>
                                        {views.map((el, index) => (
                                            <h2
                                                key={`view_${index}`}
                                                to="/"
                                                onClick={() => setMenuView(el)}
                                                onMouseEnter={() =>
                                                    onCursor("pointer")
                                                }
                                                onMouseLeave={onCursor}
                                            >
                                                {el.name}
                                            </h2>
                                        ))}
                                    </Flex>
                                    <CloseNav
                                        onClick={() =>
                                            setToggleMenu(!toggleMenu)
                                        }
                                        onMouseEnter={() => onCursor("locked")}
                                        onMouseLeave={onCursor}
                                    >
                                        <button>
                                            <span></span>
                                            <span></span>
                                        </button>
                                    </CloseNav>
                                    {/* <CloseNav
                                        onClick={() =>
                                            setToggleMenu(!toggleMenu)
                                        }
                                        ref={closeHamburger}
                                        onMouseEnter={menuHover}
                                        onMouseLeave={onCursor}
                                    >
                                        <button>
                                            <span></span>
                                            <span></span>
                                        </button>
                                    </CloseNav> */}
                                </Flex>
                            </NavHeader>
                            {menuView.view}

                            <NavFooter>
                                <Flex flexEnd width={`100%`}>
                                    <FooterContent>
                                        <p>email@domain.net</p>
                                    </FooterContent>
                                    <FooterContent wider>
                                        <p>000.000.000</p>
                                    </FooterContent>
                                    <FooterSocial>
                                        <a
                                            onMouseEnter={() =>
                                                onCursor("locked")
                                            }
                                            onMouseLeave={onCursor}
                                            href="/"
                                            target="_blank"
                                        >
                                            <Instagram />
                                        </a>
                                        <a
                                            onMouseEnter={() =>
                                                onCursor("locked")
                                            }
                                            onMouseLeave={onCursor}
                                            href="/"
                                            target="_blank"
                                        >
                                            <Facebook />
                                        </a>
                                        <a
                                            onMouseEnter={() =>
                                                onCursor("locked")
                                            }
                                            onMouseLeave={onCursor}
                                            href="/"
                                            target="_blank"
                                        >
                                            <Vimeo />
                                        </a>
                                    </FooterSocial>
                                </Flex>
                            </NavFooter>
                        </Container>

                        <NavContent>
                            <motion.div
                                animate={{
                                    width: revealContent.show ? 0 : "100%",
                                }}
                                className="reveal"
                            ></motion.div>
                            {revealContent.type === "video" ? (
                                <motion.div className="video">
                                    <AnimatePresence
                                        initial={false}
                                        exitBeforeEnter
                                    >
                                        <motion.video
                                            key={revealContent.id}
                                            src={`/video/easy.mp4`}
                                            layoutId={`${revealContent.id}_pic`}
                                            initial={{ opacity: 0 }}
                                            exit={{ opacity: 0 }}
                                            animate={{
                                                opacity: 1,
                                            }}
                                            transition={{
                                                duration: 0.2,
                                                ease: "easeInOut",
                                            }}
                                            loop
                                            autoPlay
                                        ></motion.video>
                                    </AnimatePresence>
                                </motion.div>
                            ) : (
                                <motion.div className="image">
                                    <AnimatePresence
                                        initial={false}
                                        exitBeforeEnter
                                    >
                                        <motion.img
                                            key={revealContent.id}
                                            src={revealContent.content}
                                            layoutId={`${revealContent.id}_pic`}
                                            initial={{ opacity: 0 }}
                                            exit={{ opacity: 0 }}
                                            animate={{
                                                opacity: 1,
                                            }}
                                            transition={{
                                                duration: 0.2,
                                                ease: "easeInOut",
                                            }}
                                        ></motion.img>
                                    </AnimatePresence>
                                </motion.div>
                            )}
                        </NavContent>
                    </Nav>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;
