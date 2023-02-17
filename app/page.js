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

export async function getStaticProps() {
   let projects = await getAllHomeProjects();
   let navProjects = await getAllProjects();
   return {
      props: { projects, navProjects },
   };
}

export default function Home({ projects }) {
   const mainRef = useRef(null);
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

   const loadedImages = loadImages(projects);
   // setLoading(false);

   return (
    //   <Layout projects={navProjects}>
         <Container fluid ref={mainRef}>
            <AnimatePresence>{loadedImages}</AnimatePresence>
            <TitleBanner>
               <div className="row">
                  <div className="text">OgoJonathan</div>
               </div>
            </TitleBanner>
         </Container>
    //   </Layout>
   );
}
