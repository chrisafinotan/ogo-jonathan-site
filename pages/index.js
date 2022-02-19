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

export async function getStaticProps() {
    let projects = await getAllHomeProjects();
    let projects2 = await getAllProjects();
    return {
        props: { projects, projects2 },
    };
}

const Shuffle = (array) => {
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

const minW = 20,
    maxW = 40,
    minH = 20,
    maxH = 30;

const sizes = {
    small: [minW, minH, 4],
    medium: [30, 25, 3],
    large: [maxW, maxH, 2],
};

export default function Home({ projects, projects2, setLoading }) {
    const mainRef = useRef(null);
    const { cursorStyles } = useGlobalStateContext();
    const dispatch = useGlobalDispatchContext();
    const RandomizeParams = (index, size) => {
        // if (index === 0) {
        //     return { left: 37.5, top: 25, height: 50, width: 25 };
        // }
        let width = size ? sizes[`${size}`][0] : GetRandomInt(minW, maxW);
        let height = size ? sizes[`${size}`][1] : GetRandomInt(minH, maxH);
        // let height = GetRandomInt(20, 50);

        let range, range2;
        if (index % 3 === 0) {
            range = [width + 3, width + 5];
        } else if (index % 3 === 1) {
            range = [65, 70];
        } else if (index % 3 === 2) {
            range = [95, 97];
        }

        if (index % 2 === 0) {
            range2 = [height, 40];
        } else if (index % 2 === 1) {
            range2 = [60, 95];
        }

        let left = GetRandomInt(range[0], range[1]);
        left -= width;

        let top = GetRandomInt(range2[0], range2[1]);
        top -= height;
        let obj = { left: left, top: top, height: height, width: width };
        return obj;
    };

    const GetRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };

    const [spawnState, setspawnState] = useState(
        Array.from(Array(projects.length)).map((e, i) => {
            // return true;
            return i < 6 ? true : false;
        })
    );
    const [randVals, setrandVals] = useState(
        Array.from(Array(projects.length)).map((e, i) => {
            return RandomizeParams(i, projects[i].size);
        })
    );
    const [display, setdisplay] = useState(null);

    const SpawnContent = (el, index, rands) => {
        rands = rands!==undefined ? rands : randVals;
        // console.log('random', rands)
        return (
            <ContentBox
                key={`${el}_${index}`}
                top={rands[index].top}
                left={rands[index].left}
                height={rands[index].height}
                width={rands[index].width}
                hide={!spawnState[index]}
                zindex={index === 0 ? 0 : sizes[`${el.size}`][2]}
                onMouseEnter={() => onCursor("hovered")}
                onMouseLeave={onCursor}
            >
                <Link href={`/project/${el.link}`}>
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

    const ChangeContent = () => {
        projects = Shuffle(projects);
        console.log("shuflled");
        let random = Array.from(Array(projects.length)).map((e, i) => {
            return RandomizeParams(i, projects[i].size);
        });
        let arr = projects.map((el, index) => {
            return SpawnContent(el, index, random);
        });
        setdisplay(arr);
    };

    const ReSpawnContent = () => {
        
        ChangeContent();
    };

    useEffect(() => {}, []);

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
        console.log("done loading");
        RefListenAdd(mainRef, ReSpawnContent, "click");
        return () => {
            RefListenRemove(mainRef, ReSpawnContent, "click");
        };
    }, []);

    // useEffect(() => {
    //     router.events.on("routeChangeStart", () => ReSpawnContent());
    // }, [router]);

    useEffect(() => {
        ChangeContent();
    }, [spawnState]);

    const onCursor = (cursorType) => {
        cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;
        dispatch({ type: "CURSOR_TYPE", cursorType: cursorType });
    };

    return (
        <Layout projects={projects2}>
            <Container fluid ref={mainRef}>
                {display}
                <TitleBanner>
                    <div className="row">
                        <div className="text">OgoJonathan</div>
                    </div>
                </TitleBanner>
            </Container>
        </Layout>
    );
}
