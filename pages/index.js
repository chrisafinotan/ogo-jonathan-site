import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { getAllHomeProjects, getAllProjects } from '../lib/projectsLib';
import Layout from '../components/layout';
import { useBreakpoint } from '../context/breakpointContext';
import {
   useGlobalDispatchContext,
   useGlobalStateContext,
} from '../context/globalContext';
import { ContentContainer } from '../styles/indexStyles';
import { Container } from '../styles/globalStyles';

export async function getStaticProps() {
   let projects = await getAllHomeProjects();
   let navProjects = await getAllProjects();
   return {
      props: { projects, navProjects },
   };
}

export default function Home({ projects, navProjects }) {
   const breakpoints = useBreakpoint();
   const { cursorStyles } = useGlobalStateContext();
   const dispatch = useGlobalDispatchContext();
   const onCursor = (cursorType) => {
      cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;
      dispatch({ type: 'CURSOR_TYPE', cursorType: cursorType });
   };

   return (
      <Layout projects={navProjects}>
         <Container center>
            <div
               style={{
                  display: 'flex',
                  position: 'relative',
                  gap: '16px',
                  margin: '150px 0',
                  flexDirection: 'row',
               }}
            >
               <ContentContainer small={breakpoints.md ? 'Yes' : 'No'}>
                  <AnimatePresence>
                     {projects.map((el, index) => {
                        return (
                           <Link
                              href={`/project/${el.link}`}
                              key={`${index}_homepage_link`}
                           >
                              {el.type.includes('im') ? (
                                 <Image
                                    src={el.content}
                                    alt={el.name}
                                    width={breakpoints.md ? 400 : 1080}
                                    height={breakpoints.md ? 620 : 1280}
                                    style={{ objectFit: 'cover' }}
                                    onMouseEnter={() => onCursor('hovered')}
                                    onMouseLeave={onCursor}
                                    key={`${index}_homepage_image`}
                                 />
                              ) : (
                                 <video src={el.content} loop autoPlay></video>
                              )}
                           </Link>
                        );
                     })}
                  </AnimatePresence>
               </ContentContainer>
            </div>
         </Container>
      </Layout>
   );
}
