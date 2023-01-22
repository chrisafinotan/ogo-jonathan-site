import { useEffect, useState, useRef, Suspense } from "react";
import Link from "next/link";
import Layout from "../components/layout";
import {
   useGlobalDispatchContext,
   useGlobalStateContext,
} from "../context/globalContext";
import { getAllHomeProjects, getAllProjects } from "../lib/projectsLib";
import {
   ContentContainer,
   IndexWrapper,
   TitleBanner,
} from "../styles/indexStyles";
import { Container } from "../styles/globalStyles";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useBreakpoint } from "../context/breakpointContext";
import { useRouter } from "next/router";
import Image from "next/image";
// import { getClient, overlayDrafts } from "../lib/sanity.server";
// import { indexQuery } from "../lib/queries";
// import { usePreviewSubscription } from "../lib/sanity";

export async function getStaticProps({ preview = false }) {
   let projects = await getAllHomeProjects();
   let navProjects = await getAllProjects();
   // const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery));
   return {
      props: { projects, navProjects },
   };
}

export default function Home({ projects, navProjects, setLoading }) {
   const mainRef = useRef(null);
   const breakpoints = useBreakpoint();

   const { cursorStyles } = useGlobalStateContext();
   const dispatch = useGlobalDispatchContext();
   const onCursor = (cursorType) => {
      cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;
      dispatch({ type: "CURSOR_TYPE", cursorType: cursorType });
   };

   const loadImages = (list) => {
      return list.map((el, index) => {
         return (
            <Link href={`/project/${el.link}`} key={`${index}_homepage_link`}>
               {el.type.includes("im") ? (
                  <Image
                     src={`/${el.content}`}
                     alt={el.name}
                     width={breakpoints.md ? 400 : 1080}
                     height={breakpoints.md ? 620 : 1280}
                     style={{ objectFit: "cover" }}
                     onMouseEnter={() => onCursor("hovered")}
                     onMouseLeave={onCursor}
                     key={`${index}_homepage_image`}
                  />
               ) : (
                  <video src={el.content} loop autoPlay></video>
               )}
            </Link>
         );
      });
   };

   const loadedImages = loadImages(projects);
   setLoading(false);
   const tags = ["Black and White", "Colour", "Polaroid", "5X5"];

   return (
      <Layout projects={navProjects}>
         <Container center ref={mainRef}>
            <div
               style={{
                  display: "flex",
                  position: "relative",
                  gap: "16px",
                  margin: "150px 0",
                  flexDirection: "row",
               }}
            >
               {/* <div
                  style={{
                     // position: "absolute",
                     display: 'inline-flex',
                     color: "black",
                     flexGrow: "1",
                     alignSelf: "flex-start",
                     flexBasis: "5%",
                     width: '100%',
                     overflowX: "scroll",
                     lineHeight: '1',
                     whiteSpace: 'nowrap',
                     gap: '10px',
                  }}
               >
                  {[...tags, ...tags, ...tags].map(tag => <span>{tag}</span>)}
               </div> */}
               <ContentContainer small={breakpoints.md ? "Yes" : "No"}>
                  <AnimatePresence>{loadedImages}</AnimatePresence>
               </ContentContainer>
            </div>
         </Container>
      </Layout>
   );
}
