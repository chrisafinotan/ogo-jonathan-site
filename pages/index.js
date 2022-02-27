import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Layout from "../components/layout";
import {
    useGlobalDispatchContext,
    useGlobalStateContext,
} from "../context/globalContext";
import { getAllHomeProjects, getAllProjects } from "../lib/projectsLib";
import { ContentBox, TitleBanner } from "../styles/indexStyles";
import { Container } from "../styles/globalStyles";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { sleep } from "../lib/projectsLib";

export async function getStaticProps() {
    let projects = await getAllHomeProjects();
    let projects2 = await getAllProjects();
    return {
        props: { projects, projects2 },
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

const RandomizeParams = (index, size) => {
    let width = size ? sizes[`${size}`][0] : GetRandomInt(minW, maxW);
    let height = size ? sizes[`${size}`][1] : GetRandomInt(minH, maxH);
    width = 45;
    // return { left: 15, top: 15, height: 70, width: 70 };

    if (index % 3 === 1) {
        return { left: 25, top: 25, height: 50, width: 50 };
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
        range2 = [height, 30];
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
    minH = 20,
    maxH = 30;

const sizes = {
    small: [minW, minH, 4],
    medium: [30, 25, 3],
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
    hidden: { opacity: 0, x: -1000 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 1000 },
};

export default function Home({ projects, projects2, setLoading }) {
    const startcount = 3;
    const transitionTime = 6;
    const mainRef = useRef(null);
    const { cursorStyles } = useGlobalStateContext();
    const dispatch = useGlobalDispatchContext();

    let initrandom = () => {
        // console.log("init randoms");
        let arr = [];
        for (let i = 0; i < projects.length; i++) {
            arr.push(RandomizeParams(i, projects[i].size));
        }
        // console.log(arr);
        return arr;
    };

    const [shuffledProjects, setShuffledProject] = useState(() =>
        Shuffle(projects)
    );
    const [random, setRandom] = useState(initrandom);
    const [spawnState, setSpawnState] = useState(
        Array.from(Array(projects.length)).map((e, i) => {
            return i < startcount ? true : false;
        })
    );
    const [display, setDisplay] = useState(null);

    const SpawnContent = (el, index) => {
        // console.log("spawnc", el.name, index);
        return (
            <ContentBox
                key={`${el}_${index}`}
                top={random[index].top}
                left={random[index].left}
                height={random[index].height}
                width={random[index].width}
                onMouseEnter={() => onCursor("hovered")}
                onMouseLeave={onCursor}
                transition={{ ease: "easeInOut", duration: 0.5 }}
                custom={index}
                variants={item2}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ originX: 0.5, originY: 0.5 }}
            >
                <Link href={`/project/${el.link}`} >
                    <a>
                        {el.type.includes("im") ? (
                            <img src={el.content}></img>
                        ) : (
                            <video src={el.content} loop autoPlay></video>
                        )}
                    </a>
                </Link>
                <div className="text">
                    <span>{el.name}</span>
                </div>
            </ContentBox>
        );
    };

    const SpawnAll = () => {
        let arr = shuffledProjects.map((el, index) => {
            // console.log(el.name);
            if (spawnState[index] === true) return SpawnContent(el, index);
        });
        // console.log("spawnall", arr);
        setDisplay(
            <motion.div
                initial="hidden"
                // animate={homeControls}
                animate="visible"
                exit="exit"
                variants={list}
            >
                {arr}
            </motion.div>
        );
    };

    const ChangeContent = () => {
        setShuffledProject(() => Shuffle(projects));
        setRandom(initrandom);
        // setRefresh((prev) => prev + 1);
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
        setLoading(false);
        // console.log("done loading");
        // RefListenAdd(mainRef, ChangeContent, "click");

        setInterval(() => {
            let testarr = spawnState;
            let end = testarr.pop();
            testarr.unshift(end);
            setSpawnState((prev) => [...testarr]);
        }, transitionTime * 1000);
        return () => {
            // RefListenRemove(mainRef, ChangeContent, "click");
        };
    }, []);

    useEffect(() => {
        // console.log("spawn state change", spawnState);
        SpawnAll();
    }, [spawnState, random]);

    // useEffect(() => {
    //     homeControls.start('visible')
    // }, [refresh])

    const onCursor = (cursorType) => {
        cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;
        dispatch({ type: "CURSOR_TYPE", cursorType: cursorType });
    };

    return (
        <Layout projects={projects2}>
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
