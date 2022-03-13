import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Layout from "../components/layout";
import {
    useGlobalDispatchContext,
    useGlobalStateContext,
} from "../context/globalContext";
import { getAllHomeProjects, getAllProjects } from "../lib/projectsLib";
import { ContentBox, IndexWrapper, TitleBanner } from "../styles/indexStyles";
import { Container } from "../styles/globalStyles";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useBreakpoint } from "../context/breakpointContext";
import { useRouter } from "next/router";
import Image from "next/image";

export async function getStaticProps() {
    let projects = await getAllHomeProjects();
    let navProjects = await getAllProjects();
    return {
        props: { projects, navProjects },
    };
}

const Shuffle = (array) => {
    // // console.log("shuffling");
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
};

const GetRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

let reg = { left: 27.5, top: 25, height: 50, width: 45 };
let big = { left: 10, top: 10, height: 80, width: 80 };

const RandomizeParams = (index, size) => {
    let width = size ? sizes[`${size}`][0] : GetRandomInt(minW, maxW);
    let height = size ? sizes[`${size}`][1] : GetRandomInt(minH, maxH);
    width = 25;
    // return { left: 15, top: 15, height: 70, width: 70 };

    if (index % 3 === 1) {
        return reg;
    }

    let range, range2;
    if (index % 3 === 0) {
        range = [width + 3, width + 5];
    } else if (index % 3 === 1) {
        range = [65, 70];
    } else if (index % 3 === 2) {
        range = [95, 97];
    }

    let lr = GetRandomInt(0, 2);
    // // console.log("lr", lr);
    if (lr) {
        range2 = [height, 45];
    } else {
        range2 = [60, 95];
    }

    let left = GetRandomInt(range[0], range[1]);
    left -= width;

    let top = GetRandomInt(range2[0], range2[1]);
    top -= height;
    let obj = { left: left, top: top, height: height, width: width };
    return obj;
};

const minW = 20,
    maxW = 40,
    minH = 18,
    maxH = 40;

const sizes = {
    small: [minW, minH, 4],
    medium: [30, 30, 3],
    large: [maxW, maxH, 2],
};

const list = {
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.8,
        },
    },
    hidden: {
        opacity: 0,
        transition: {
            when: "afterChildren",
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 0, scale: 0 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { delay: 0.5 } },
    exit: { opacity: 0, y: 0, scale: 0 },
};

const item2 = {
    hidden: { opacity: 0, y: 1000 },
    visible: { opacity: 1, y: 0 },
    visible2: { opacity: 0, y: 1000 },
    exit: { opacity: 0, y: -1000 },
};

export default function Home({ projects, navProjects, setLoading }) {
    const transitionTime = 4.5;
    const mainRef = useRef(null);
    const router = useRouter();
    const { cursorStyles } = useGlobalStateContext();
    const dispatch = useGlobalDispatchContext();
    const breakpoints = useBreakpoint();

    const initrandom = (large) => {
        let randomArr = [];
        if (large) {
            for (let i = 0; i < projects.length; i++) {
                randomArr.push(RandomizeParams(i, projects[i].size));
            }
        } else {
            randomArr = Array(projects.length).fill(big);
        }
        return randomArr;
    };

    const getArr = () => {
        let newstartcount =
            !breakpoints.md !== undefined ? (!breakpoints.md ? 3 : 1) : 3;
        let newArr = Array.from(Array(projects.length)).map((e, i) => {
            return i < newstartcount ? true : false;
        });
        return newArr;
    };

    const MapImages = (list) => {
        return list.map((el, index) => {
            return el.type.includes("im") ? (
                <Image
                    onLoad={() => {
                        setLoadStatus(index);
                    }}
                    src={`/${el.content}`}
                    alt={el.name}
                    width={600}
                    height={450}
                    // loading="eager"
                    // layout="responsive"
                    layout="fill"
                    // placeholder="blur"
                    // className="home__image"
                />
            ) : (
                <video src={el.content} loop autoPlay></video>
            );
        });
    };
    // let initshuffle = Shuffle(projects);
    // console.log('init',initshuffle);
    const [shuffledProjects, setShuffledProject] = useState(() =>
        Shuffle(projects)
    );
    const [loadedImages, setloadedImages] = useState(() => MapImages(projects));
    const [loadStatus, setLoadStatus] = useState(0);
    const [ready, setReady] = useState(false);
    const [display, setDisplay] = useState(<div>'hello'</div>);

    const SpawnContent = (el, index, random, show) => {
        return (
            <ContentBox
                key={`${el}_${index}`}
                top={random.top}
                left={random.left}
                height={random.height}
                width={random.width}
                onMouseEnter={() => onCursor("hovered")}
                onMouseLeave={onCursor}
                transition={{ ease: "easeInOut", duration: 0.5 }}
                custom={index}
                variants={item2}
                initial="hidden"
                animate={show ? "visible" : "visible2"}
                exit="exit"
                style={{ originX: 0.5, originY: 0.5 }}
                // show={false}
            >
                <Link href={`/project/${el.link}`}>
                    <a>{loadedImages[index]}</a>
                </Link>
                <div className="text">
                    <span>{el.name.toUpperCase()}</span>
                </div>
            </ContentBox>
        );
    };

    const SpawnAll = (arrToSpawn, positions) => {
        let arr = arrToSpawn.map((el, index) => {
            // if (el === true) {
            // console.log("spawn", el);
            return SpawnContent(
                shuffledProjects[index],
                index,
                positions[index],
                el
            );
            // }
        });
        setDisplay(
            <IndexWrapper
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={list}
                className={"indexDisplay"}
            >
                {arr}
            </IndexWrapper>
        );
    };

    const getNew = (arr, random) => {
        let newSpawnState = arr;
        let end = newSpawnState.pop();
        newSpawnState.unshift(end);
        SpawnAll(newSpawnState, random);
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
        // setloadedImages(() => MapImages(shuffledProjects));
        // setLoading(false);
        // console.log("done loading");
        // RefListenAdd(mainRef, ChangeContent, "click");
        return () => {
            // RefListenRemove(mainRef, ChangeContent, "click");
            setDisplay(<div>'hello'</div>);
        };
    }, []);

    useEffect(() => {
        ready === true && setLoading(false);
    }, [ready]);

    useEffect(() => {
        let initSpawnState = [],
            random = [];
        if (!breakpoints.md !== undefined) {
            initSpawnState = getArr();
            random = initrandom(!breakpoints.md);
        }
        getNew(initSpawnState, random);
        // setup new interval
        let spawnInterval = setInterval(
            getNew,
            transitionTime * 1000,
            initSpawnState,
            random
        );
        return () => {
            // clear prev interval if it exists
            clearInterval(spawnInterval);
        };
    }, [breakpoints]);

    useEffect(() => {
        if (loadStatus >= shuffledProjects.length - 2) setReady(true);
    }, [loadStatus]);

    const onCursor = (cursorType) => {
        cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;
        dispatch({ type: "CURSOR_TYPE", cursorType: cursorType });
    };

    return (
        <Layout projects={navProjects}>
            <Container fluid ref={mainRef}>
                <AnimatePresence>{display}</AnimatePresence>
                <TitleBanner>
                    <div className="row">
                        <div className="text">OgoJonathan</div>
                    </div>
                </TitleBanner>
            </Container>
        </Layout>
    );
}
