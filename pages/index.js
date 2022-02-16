import Layout from "../components/layout";
//ANIME IMPORTS';
import anime from "animejs";
import { useEffect, useState } from "react";
import { getAllHomeProjects, getAllProjects } from "../lib/projectsLib";

import Link from "next/link";

import { ContentBox, TitleBanner } from "../styles/indexStyles";

import {
    useGlobalDispatchContext,
    useGlobalStateContext,
} from "../context/globalContext";

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

export default function Home({ projects, projects2 }) {
    projects = Shuffle(projects);
    const { cursorStyles, currentTheme } = useGlobalStateContext();
    const dispatch = useGlobalDispatchContext();
    const RandomizeParams = (index, size) => {
        if (index === 0) {
            return { left: 37.5, top: 25, height: 50, width: 25 };
        }
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
            range2 = [80, 95];
        }

        let left = GetRandomInt(range[0], range[1]);
        left -= width;

        let top = GetRandomInt(range2[0], range2[1]);
        top -= height;
        // if ((index+1) % 4 === 0) {
        //     left = (100 - width) / 2;
        //     top = (100 - height) / 2;
        // }
        let obj = { left: left, top: top, height: height, width: width };
        // console.log("random", obj, size, sizes[`${size}`], index);
        return obj;
    };

    const GetRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };

    const [spawnState, setspawnState] = useState(
        Array.from(Array(projects.length)).map((e, i) => {
            return true;
            return i < 6 ? true : false;
        })
    );
    const [randVals, setrandVals] = useState(
        Array.from(Array(projects.length)).map((e, i) => {
            return RandomizeParams(i, projects[i].size);
        })
    );
    const [display, setdisplay] = useState(<div>LOADING</div>);

    const SpawnContent = (el, index) => {
        // console.log("hi", el.name, el);
        // console.log("sizes", sizes[`${el.size}`], sizes);

        return (
            <ContentBox
                key={`${el}_${index}`}
                top={randVals[index].top}
                left={randVals[index].left}
                height={randVals[index].height}
                width={randVals[index].width}
                // width={randVals[index].width}
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
        let arr = projects.map((el, index) => {
            return SpawnContent(el, index);
        });
        setdisplay(arr);
    };

    const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));

    useEffect(() => {
        // delay(4000).then(() => {
        //     let newArr = spawnState;
        //     newArr[0] = false;
        //     setspawnState(newArr);
        //     ChangeContent();
        // });
        // delay(3000).then(() => {
        //     let newArr = spawnState;
        //     newArr[3] = true;
        //     setspawnState(newArr);
        //     ChangeContent();
        // });
        //get theme if in browser
    }, []);

    useEffect(() => {
        ChangeContent();
    }, [spawnState]);

    const onCursor = (cursorType) => {
        cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;
        dispatch({ type: "CURSOR_TYPE", cursorType: cursorType });
    };

    return (
        <Layout projects={projects2}>
            {display}
            <TitleBanner>
                {/* <div className="row"> */}
                <div className="text">Ogo</div>
                <div className="text 2">Jonathan</div>
                <span></span>
                {/* </div> */}
            </TitleBanner>
        </Layout>
    );
}
