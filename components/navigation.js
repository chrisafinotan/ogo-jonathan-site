import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useElementPosition from "../hooks/useElementPosition";
//Styled Components
import { Container, Flex } from "../styles/globalStyles";
import {
    Nav,
    NavList,
    NavFooter,
    NavContent,
    NavAbout,
    H2,
} from "../styles/navigationStyles";
import { FooterContent, FooterSocial } from "../styles/footerStyles";
//Icons
import { Instagram, Facebook } from "../assets/svg/social-icons";
//Framer Motion
import { motion, AnimatePresence } from "framer-motion";
import { imageWrapper, spanContainer, spanText } from "../framer/variants";
import { useBreakpoint } from "../context/breakpointContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import the icons you need
import {
    // faSearch,
    // faAmbulance,
    faCamera,
} from "@fortawesome/free-solid-svg-icons";
import profilePicture from "../assets/profilePic.jpg";

const Navigation = ({
    projects,
    toggleMenu,
    setToggleMenu,
    onCursor,
    setHamburgerPosition,
}) => {
    const instagramref = useRef(null);
    const facebookref = useRef(null);
    const phoneref = useRef(null);
    const projectsref = useRef(null);
    const aboutref = useRef(null);

    const [revealContent, setRevealContent] = useState({
        show: false,
        video: "featured-video.mp4",
        key: "0",
    });

    const breakpoints = useBreakpoint();

    const ProjectsView = projects ? (
        <NavList small={false}>
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
                                // initial={!breakpoints.sm ? { x: -60 } : { x: 0 }}
                                className="link"
                                whileHover={{
                                    x: 0,
                                    transition: {
                                        duration: 0.4,
                                        ease: [0.6, 0.05, -0.01, 0.9],
                                    },
                                }}
                            >
                                {!breakpoints.sm && (
                                    <span className="arrow">
                                        <FontAwesomeIcon icon={faCamera} />
                                    </span>
                                )}
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
                // whileHover="color"
                className="aboutImageWrapper"
            >
                {/* <Image */}
                <img
                    src={profilePicture.src}
                    alt="Profile Picture of Ogo Jonathan"
                    width={1440}
                    height={1440}
                    layout="fill"
                    className="aboutImage"
                    style={{ position: "relative" }}
                />
                {/* <Image
                    src={profilePicture}
                    alt="Picture of the author"
                    width="1048px"
                    height="1048px"
                    // className="aboutImage"
                    layout="fill"
                    style={{ position: "relative" }}

                /> */}
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
            ref: projectsref,
        },
        {
            name: "About",
            view: AboutView,
            ref: aboutref,
        },
    ];
    const [menuView, setMenuView] = useState(views[0]);

    const objectLockHover = (element) => {
        onCursor("locked");
        let eventposition = useElementPosition(element);
        setHamburgerPosition(eventposition);
    };

    const objectWrapHover = (element) => {
        onCursor("wrapped");
        let eventposition = useElementPosition(element);
        setHamburgerPosition(eventposition);
    };

    const RefListenAdd = (
        ref = window,
        func = objectLockHover,
        type = "mouseenter"
    ) => {
        if ((ref && ref.current) || ref === window) {
            ref.current.addEventListener(type, () => func(ref));
        }
    };

    const RefListenRemove = (
        ref = window,
        func = objectLockHover,
        type = "mouseenter"
    ) => {
        if ((ref && ref.current) || ref == window) {
            ref.current.removeEventListener(type, () => func(ref));
        }
    };

    useEffect(() => {
        RefListenAdd(instagramref);
        RefListenAdd(facebookref);
        RefListenAdd(phoneref, objectWrapHover);
        RefListenAdd(projectsref, objectWrapHover);
        RefListenAdd(aboutref, objectWrapHover);

        return () => {
            RefListenRemove(instagramref);
            RefListenRemove(facebookref);
            RefListenRemove(phoneref, objectWrapHover);
            RefListenRemove(projectsref, objectWrapHover);
            RefListenRemove(aboutref, objectWrapHover);
        };
    }, [facebookref, instagramref, phoneref, toggleMenu]);


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
                        <Container
                            padding={!breakpoints.sm ? "5em" : "6em 0.5em 2em 0.5em"}
                            fluid
                            // height={"100vh"}
                            // width={"80vw"}
                        >
                            {/* <Flex row> */}
                            {menuView.view}
                            {/* </Flex> */}
                        </Container>

                        <NavFooter>
                            <Flex spaceBetween={!breakpoints.sm} row={breakpoints.md}>
                                <Flex
                                    spaceBetween
                                    // width={!breakpoints.sm ? `20%`:`60%`}
                                    height={'fit-content'}
                                >
                                    {views.map((el, index) => (
                                        <H2
                                            key={`view_${index}`}
                                            to="/"
                                            onClick={() => setMenuView(el)}
                                            className={
                                                menuView.name == el.name
                                                    ? "activeView"
                                                    : ""
                                            }
                                            ref={el.ref}
                                            // onMouseEnter={() =>
                                            //     onCursor("pointer")
                                            // }
                                            onMouseLeave={onCursor}
                                        >
                                            {el.name}
                                        </H2>
                                    ))}
                                </Flex>
                                <Flex
                                    spaceBetween
                                    // width={`40%`}
                                    // row={breakpoints.md}
                                    gap={5}
                                >
                                    <FooterContent
                                        ref={phoneref}
                                        onMouseLeave={onCursor}
                                    >
                                        <Mailto
                                            email="iafinotan@yahoo.com"
                                            subject="Hello & Welcome"
                                            body="Hello world!"
                                        >
                                            iafinotan@yahoo.com
                                        </Mailto>
                                    </FooterContent>
                                    <FooterContent>
                                        <span>000.000.000</span>
                                    </FooterContent>
                                    <FooterSocial>
                                        <a
                                            ref={instagramref}
                                            onMouseLeave={onCursor}
                                            href="/"
                                            target="_blank"
                                        >
                                            <Instagram />
                                        </a>
                                        {/* <a
                                            ref={facebookref}
                                            onMouseLeave={onCursor}
                                            href="/"
                                            target="_blank"
                                        >
                                            <Facebook />
                                        </a> */}
                                        {/* <a
                                                onMouseEnter={() =>
                                                    onCursor("locked")
                                                }
                                                onMouseLeave={onCursor}
                                                href="/"
                                                target="_blank"
                                            >
                                                <Vimeo />
                                            </a> */}
                                    </FooterSocial>
                                </Flex>
                            </Flex>
                        </NavFooter>

                        <NavContent>
                            <motion.div
                                animate={{
                                    width: revealContent.show ? 0 : "100%",
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
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
                                                // zIndex: 5,
                                            }}
                                            transition={{
                                                duration: 0.5,
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

const Mailto = ({ email, subject = "", body = "", children }) => {
    let params = subject || body ? "?" : "";
    if (subject) params += `subject=${encodeURIComponent(subject)}`;
    if (body) params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;

    return <a href={`mailto:${email}${params}`}>{children}</a>;
};
