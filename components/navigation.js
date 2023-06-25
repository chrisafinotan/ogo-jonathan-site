import React, { useState, useRef } from 'react';
import Link from 'next/link';
import useElementPosition from '../hooks/useElementPosition';
import { Flex } from '../styles/globalStyles';
import { Nav, NavList, NavFooter, NavAbout } from '../styles/navigationStyles';
import { FooterContent, FooterSocial } from '../styles/footerStyles';
import { Instagram } from '../assets/svg/social-icons';
import { motion, AnimatePresence } from 'framer-motion';
import {
   navMenu,
   navMenuChild,
   spanContainer,
   spanText,
} from '../framer/variants';
import { useBreakpoint } from '../context/breakpointContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useTheme } from 'styled-components';

const Navigation = ({
   projects,
   toggleMenu,
   setToggleMenu,
   onCursor,
   setHamburgerPosition,
}) => {
   const theme = useTheme();
   const instagramref = useRef(null);
   const phoneref = useRef(null);
   const navListScrollref = useRef(null);

   // const [revealContent, setRevealContent] = useState({
   //    show: false,
   //    video: 'featured-video.mp4',
   //    key: '0',
   // });
   const [category, setCategory] = useState('All');

   const categories = _.chain(projects)
      .uniqBy('category')
      .map('category')
      .value();
   if (!_.isEmpty(categories)) categories.splice(0, 0, 'All');

   const breakpoints = useBreakpoint();

   const AboutView = (
      <NavAbout>
         <motion.div className='aboutDesc'>ABOUT ME!</motion.div>
         <motion.div className='aboutText'>
            <motion.div
               variants={spanContainer}
               initial='hidden'
               animate='show'
               exit='exit'
               className='aboutText__span'
            >
               <motion.div variants={spanText} style={{ originX: 0 }}>
                  Nigerian born portrait and fashion photographer based in
                  Canada.
               </motion.div>
               <motion.div variants={spanText} style={{ originX: 0 }}>
                  My art is an expression of my freedom.
               </motion.div>
               <motion.div variants={spanText} style={{ originX: 0 }}>
                  I present my work as if it were a boundless blank canvas,
               </motion.div>
               <motion.div variants={spanText} style={{ originX: 0 }}>
                  rarely bearing a fixed meaning.
               </motion.div>
               <motion.div variants={spanText} style={{ originX: 0 }}>
                  Providing my viewers with the opportunity to create meaning,
               </motion.div>
               <motion.div variants={spanText} style={{ originX: 0 }}>
                  their interpretations ultimately paint the picture through
                  their emotional response.
               </motion.div>
            </motion.div>
         </motion.div>
      </NavAbout>
   );

   const objectLockHover = (element) => {
      onCursor('locked');
      let eventposition = useElementPosition(element);
      setHamburgerPosition(eventposition);
   };

   // const objectWrapHover = (element) => {
   //    onCursor('wrapped');
   //    let eventposition = useElementPosition(element);
   //    setHamburgerPosition(eventposition);
   // };

   // const RefListenAdd = (
   //    ref = window,
   //    func = objectLockHover,
   //    type = 'mouseenter'
   // ) => {
   //    if ((ref && ref.current) || ref === window) {
   //       ref.current.addEventListener(type, () => func(ref.current));
   //    }
   // };

   // const RefListenRemove = (
   //    ref = window,
   //    func = objectLockHover,
   //    type = 'mouseenter'
   // ) => {
   //    if ((ref && ref.current) || ref == window) {
   //       ref.current.removeEventListener(type, () => func(ref));
   //    }
   // };

   return (
      <>
         <AnimatePresence>
            {toggleMenu && (
               <Nav
                  small={breakpoints.md ? 'Yes' : 'No'}
                  variants={navMenu}
                  layout
                  initial='init'
                  animate={breakpoints.md ? 'animSmall' : 'anim'}
                  exit='exit'
               >
                  <NavList layout variants={navMenuChild}>
                     <div className='categories'>
                        <Select
                           value={category}
                           onChange={(e) => setCategory(e.target.value)}
                           id='categorySelect'
                           sx={{
                              border: 0,
                              padding: '0px',
                              textDecoration: `underline ${theme.main}`,
                              textDecorationThickness: '0.3em',
                              fontSize: '24px',
                              '& svg': {
                                 display: 'none',
                              },
                              '& fieldset': {
                                 border: 'none',
                                 borderRadius: 0,
                              },
                           }}
                        >
                           {categories.map((el) => (
                              <MenuItem
                                 key={`category${el}`}
                                 onMouseEnter={() => onCursor('pointer')}
                                 onMouseLeave={onCursor}
                                 className={
                                    'bob' + (el === category ? 'active' : '')
                                 }
                                 value={el}
                              >
                                 {el}
                              </MenuItem>
                           ))}
                        </Select>
                     </div>
                     <div className='list'>
                        <ul ref={navListScrollref}>
                           {projects
                              .filter((el) => {
                                 return category !== 'All'
                                    ? el.category === category
                                    : el;
                              })
                              .map((route, index) => (
                                 <motion.li
                                    key={`navlist_${route.id}_${index}`}
                                    onMouseEnter={() =>
                                       !breakpoints.md && onCursor('pointer')
                                    }
                                    onMouseLeave={onCursor}
                                    // onHoverStart={() =>
                                    //    !breakpoints.md &&
                                    //    setRevealContent({
                                    //       show: true,
                                    //       content: route.content,
                                    //       key: `route_${index}`,
                                    //       type: route.type,
                                    //    })
                                    // }
                                    // onHoverEnd={() =>
                                    //    !breakpoints.md &&
                                    //    setRevealContent({
                                    //       show: false,
                                    //       content: route.content,
                                    //       key: `route_${index}`,
                                    //       type: route.type,
                                    //    })
                                    // }
                                    onClick={() => {
                                       setToggleMenu(false);
                                    }}
                                 >
                                    <Link href={`/project/${route.id}`}>
                                       <motion.div
                                          className='link'
                                          whileHover={
                                             !breakpoints.md && {
                                                x: 0,
                                                // transition: {
                                                //    duration: 0.4,
                                                //    ease: [0.6, 0.05, -0.01, 0.9],
                                                // },
                                             }
                                          }
                                       >
                                          <span className='index'>{`${
                                             index + 1
                                          }`}</span>
                                          <span className='routeName'>
                                             {route.name}
                                          </span>
                                          {category === 'All' && (
                                             <span className='tag'>
                                                {route.category !==
                                                   'Photoshoot' &&
                                                   route.category}
                                             </span>
                                          )}
                                       </motion.div>
                                    </Link>
                                 </motion.li>
                              ))}
                        </ul>
                     </div>
                  </NavList>
                  <NavFooter layout variants={navMenuChild}>
                     <Flex flexEnd={true} gap={16}>
                        <FooterContent
                           ref={phoneref}
                           // onMouseLeave={onCursor}
                        >
                           <Mailto email='ogojonathanp@gmail.com'>
                              <FontAwesomeIcon icon={faEnvelope} />
                           </Mailto>
                        </FooterContent>
                        <FooterSocial>
                           <a
                              ref={instagramref}
                              onMouseLeave={onCursor}
                              href='https://www.instagram.com/ogojonathan/'
                              target='_blank'
                           >
                              <Instagram />
                           </a>
                        </FooterSocial>
                     </Flex>
                  </NavFooter>
                  {/* {!breakpoints.md && (
                     <NavContent>
                        <motion.div
                           animate={{
                              width: revealContent.show ? 0 : '100%',
                           }}
                           transition={{
                              duration: 0.5,
                              ease: 'easeInOut',
                           }}
                           className='reveal'
                        ></motion.div>
                        {revealContent.type === 'video' ? (
                           <motion.div className='video'>
                              <AnimatePresence initial={false} exitBeforeEnter>
                                 <motion.video
                                    key={revealContent.id}
                                    src={`/video/easy.mp4`}
                                    layoutId={`${revealContent.id}_pic`}
                                    initial={{ opacity: 0 }}
                                    exit={{ opacity: 0 }}
                                    animate={{
                                       opacity: 1,
                                    }}
                                    transition={{
                                       duration: 0.2,
                                       ease: 'easeInOut',
                                    }}
                                    loop
                                    autoPlay
                                 ></motion.video>
                              </AnimatePresence>
                           </motion.div>
                        ) : (
                           <motion.div className='image'>
                              <AnimatePresence initial={false} exitBeforeEnter>
                                 <motion.img
                                    key={revealContent.id}
                                    src={revealContent.content}
                                    layoutId={`${revealContent.id}_pic`}
                                    initial={{ opacity: 0 }}
                                    exit={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                       duration: 0.5,
                                       ease: 'easeInOut',
                                    }}
                                 ></motion.img>
                              </AnimatePresence>
                           </motion.div>
                        )}
                     </NavContent>
                  )} */}
               </Nav>
            )}
         </AnimatePresence>
      </>
   );
};

export default Navigation;

const Mailto = ({ email, subject = '', body = '', children }) => {
   let params = subject || body ? '?' : '';
   if (subject) params += `subject=${encodeURIComponent(subject)}`;
   if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;

   return <a href={`mailto:${email}${params}`}>{children}</a>;
};
