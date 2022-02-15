import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import useElementPosition from "../hooks/useElementPosition";
import {
    useGlobalDispatchContext,
    useGlobalStateContext,
} from "../context/globalContext";
//Styled Components
import { Container, Flex } from "../styles/globalStyles";
import { Logo } from "../styles/headerStyles";
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
import { useBreakpoint } from "../context/breakpointContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import the icons you need
import {
    // faSearch,
    // faAmbulance,
    faCamera,
} from "@fortawesome/free-solid-svg-icons";

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

    const dispatch = useGlobalDispatchContext();
    const { currentTheme } = useGlobalStateContext();
    const breakpoints = useBreakpoint();

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
                                initial={{ x: -60 }}
                                className="link"
                                whileHover={{
                                    x: 0,
                                    transition: {
                                        duration: 0.4,
                                        ease: [0.6, 0.05, -0.01, 0.9],
                                    },
                                }}
                            >
                                <span className="arrow">
                                    <FontAwesomeIcon icon={faCamera} />

                                    {/* <motion.svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 101 57"
                                    >
                                        <path
                                            d="M33 34H0V24h81.429L66 7.884 73.548 0l19.877 20.763.027-.029L101 28.618 73.829 57l-7.548-7.884L80.753 34H33z"
                                            fill="#000"
                                            fillRule="evenodd"
                                        ></path>
                                    </motion.svg> */}
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
            ref: projectsref,
        },
        {
            name: "About",
            view: AboutView,
            ref: aboutref,
        },
    ];
    const [menuView, setMenuView] = useState(views[0]);

    const toggleTheme = () => {
        if (currentTheme === "dark") {
            dispatch({ type: "TOGGLE_THEME", theme: "light" });
        } else {
            dispatch({ type: "TOGGLE_THEME", theme: "dark" });
        }
    };

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

    const RefListenAdd = (ref, func = objectLockHover, type = "mouseenter") => {
        if (ref && ref.current) {
            ref.current.addEventListener(type, () => func(ref));
        }
    };

    const RefListenRemove = (
        ref,
        func = objectLockHover,
        type = "mouseenter"
    ) => {
        if (ref && ref.current) {
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
                        <Container>
                            {menuView.view}

                            <NavFooter>
                                <Flex spaceBetween width={`100%`}>
                                    <Flex
                                        spaceBetween
                                        noHeight
                                        width={`20%`}
                                        row={breakpoints.md}
                                    >
                                        {views.map((el, index) => (
                                            <h2
                                                key={`view_${index}`}
                                                to="/"
                                                onClick={() => setMenuView(el)}
                                                ref={el.ref}
                                                // onMouseEnter={() =>
                                                //     onCursor("pointer")
                                                // }
                                                onMouseLeave={onCursor}
                                            >
                                                {el.name}
                                            </h2>
                                        ))}
                                    </Flex>
                                    <Flex
                                        spaceBetween
                                        // width={`40%`}
                                        row={breakpoints.md}
                                        gap={5}
                                    >
                                        <FooterContent
                                            ref={phoneref}
                                            onMouseLeave={onCursor}
                                        >
                                            {/* <span> */}
                                            {/* </span> */}
                                            {/* <a href="mailto:iafinotan@yahoo.com?subject = Feedback&body = Message">
                                                iafinotan@yahoo.com
                                            </a> */}
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
                                            <a
                                                ref={facebookref}
                                                onMouseLeave={onCursor}
                                                href="/"
                                                target="_blank"
                                            >
                                                <Facebook />
                                            </a>
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

const Mailto = ({ email, subject = "", body = "", children }) => {
    let params = subject || body ? "?" : "";
    if (subject) params += `subject=${encodeURIComponent(subject)}`;
    if (body) params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;

    return <a href={`mailto:${email}${params}`}>{children}</a>;
};
