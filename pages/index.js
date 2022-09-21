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
import Image from "next/future/image";

export async function getStaticProps() {
   let projects = await getAllHomeProjects();
   let navProjects = await getAllProjects();
   return {
      props: { projects, navProjects },
   };
}

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
   const mainRef = useRef(null);
   const { cursorStyles } = useGlobalStateContext();
   const dispatch = useGlobalDispatchContext();

   const loadImages = (list) => {
      return list.map((el) => {
         return el.type.includes("im") ? (
            <Image
               src={`/${el.content}`}
               alt={el.name}
               width={600}
               height={450}
               layout="fill"
            />
         ) : (
            <video src={el.content} loop autoPlay></video>
         );
      });
   };

   const onCursor = (cursorType) => {
      cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;
      dispatch({ type: "CURSOR_TYPE", cursorType: cursorType });
   };

   const SpawnContent = (el, index, show) => {
      return (
         <ContentBox
            key={`${el}_${index}`}
            onMouseEnter={() => onCursor("hovered")}
            onMouseLeave={onCursor}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            custom={index}
            variants={item2}
            initial="hidden"
            animate={show ? "visible" : "visible2"}
            exit="exit"
            style={{ originX: 0.5, originY: 0.5 }}
            contain
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

   const SpawnAll = (arrToSpawn) => {
      return (
         <IndexWrapper
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={list}
            className={"indexDisplay"}
         >
            {arrToSpawn.map((spawnElement, index) => {
               return SpawnContent(projects[index], index, spawnElement);
            })}
         </IndexWrapper>
      );
   };

   const loadedImages = loadImages(projects);
   const display = SpawnAll(loadedImages);
   setLoading(false);

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
