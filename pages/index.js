import { useEffect, useState, useRef, Suspense } from "react";
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
// import OGL from "../lib/ogl";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Environment, OrbitControls } from "@react-three/drei";
import { PlaneGeometry } from "three";

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
            className="content"
         >
            <Link href={`/project/${el.link}`}>{loadedImages[index]}</Link>
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

   const [active, setActive] = useState(false);
   const myMesh = useRef(null);

   return (
      <Layout projects={navProjects}>
         <Container fluid ref={mainRef}>
            {/* <AnimatePresence>{display}</AnimatePresence>
            <TitleBanner>
               <div className="row">
                  <div className="text">OgoJonathan</div>
               </div>
            </TitleBanner> */}
            <div
               id="canvas-container"
               style={{ height: "50vh", border: "1px solid red" }}
            >
               <Canvas>
                  <mesh
                     scale={active ? 2.5 : 1}
                     onClick={() => setActive(!active)}
                     ref={myMesh}
                  >
                     <boxBufferGeometry />
                     <meshStandardMaterial color="hotpink" transparent />
                     {/* <meshPhongMaterial /> */}
                  </mesh>
                  <mesh
                     scale={active ? 2.5 : 1}
                     onClick={() => setActive(!active)}
                     // ref={myMesh}
                  >
                     {/* <boxBufferGeometry /> */}
                     <ringGeometry args={[1,2,30]}/>
                     <meshStandardMaterial color="hotpink" side={'doubleSide'}/>
                  </mesh>
                  <ambientLight args={[0xff0000]} intensity={0.1} />
                  <directionalLight position={[3, 5, 5]} intensity={0.5} />
                  <Suspense fallback={null}>
                     {/* <Model /> */}
                     <OrbitControls />
                     {/* <Environment preset="sunset" background /> */}
                  </Suspense>
               </Canvas>
            </div>
         </Container>
      </Layout>
   );
}
