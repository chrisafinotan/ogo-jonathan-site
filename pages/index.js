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

export default function Home({ projects, navProjects, setLoading }) {
   // const [loading, setLoading] = useState(true);
   const breakpoints = useBreakpoint();
   const { cursorStyles } = useGlobalStateContext();
   const dispatch = useGlobalDispatchContext();
   const onCursor = (cursorType, cursorText) => {
      cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;
      dispatch({ type: 'CURSOR_TYPE', cursorType, cursorText });
   };

   return (
      <Layout projects={navProjects}>
         <Container center='true'>
            <ContentContainer small={breakpoints.md ? 'Yes' : 'No'}>
               <AnimatePresence>
                  {projects.map((el, index) => {
                     return (
                        <Link
                           href={`/project/${el.link}`}
                           key={`${index}_homepage_link`}
                        >
                           <Image
                              src={el.content}
                              alt={el.name}
                              width={breakpoints.md ? 400 : 1080}
                              height={breakpoints.md ? 620 : 1280}
                              style={{ objectFit: 'cover' }}
                              onMouseEnter={() => onCursor('hovered', 'view')}
                              onMouseLeave={onCursor}
                              key={`${index}_homepage_image`}
                              loading={'eager'}
                              onLoadingComplete={() => {
                                 if (index === projects.length - 1)
                                    setLoading(false);
                              }}
                           />
                        </Link>
                     );
                  })}
               </AnimatePresence>
            </ContentContainer>
         </Container>
      </Layout>
   );
}
