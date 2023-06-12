import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useElementPosition from '../hooks/useElementPosition';
//Styled Components
import { Flex } from '../styles/globalStyles';
import {
   Nav,
   NavList,
   NavContent,
   NavFooter,
   NavAbout,
} from '../styles/navigationStyles';
import { FooterContent, FooterSocial } from '../styles/footerStyles';
//Icons
import { Instagram, Facebook } from '../assets/svg/social-icons';
//Framer Motion
import { motion, AnimatePresence } from 'framer-motion';
import { spanContainer, spanText } from '../framer/variants';
import { useBreakpoint } from '../context/breakpointContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import the icons you need
import {
   // faSearch,
   // faAmbulance,
   faCamera,
   faAngleDown,
   faAngleUp,
} from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
const Navigation = ({
   projects,
   toggleMenu,
   setToggleMenu,
   onCursor,
   setHamburgerPosition,
}) => {
   const instagramref = useRef(null);
   const facebookref = useRef(null);
   const phoneref = useRef(null);
   const navListScrollref = useRef(null);

   const [revealContent, setRevealContent] = useState({
      show: false,
      video: 'featured-video.mp4',
      key: '0',
   });
   const [category, setCategory] = useState('All');
   const [arrow, setArrow] = useState('null');

   const categories = _.chain(projects)
      .uniqBy('category')
      .map('category')
      .value();
   if (!_.isEmpty(categories)) categories.splice(0, 0, 'All');

   const breakpoints = useBreakpoint();

   const AboutView = (
      <NavAbout>
         {/* <motion.div
                variants={imageWrapper}
                initial="init"
                animate="anim"
                // whileHover="color"
                className="aboutImageWrapper"
            >
                <img
                    src={profilePicture.src}
                    alt="Profile Picture of Ogo Jonathan"
                    width={1440}
                    height={1440}
                    layout="fill"
                    className="aboutImage"
                    style={{ position: "relative" }}
                />
            </motion.div> */}
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

   const objectWrapHover = (element) => {
      onCursor('wrapped');
      let eventposition = useElementPosition(element);
      setHamburgerPosition(eventposition);
   };

   const scrollChecker = (element, a) => {
      const { offsetHeight, scrollTop, scrollHeight } = element;
      console.log({ a, offsetHeight, scrollHeight, scrollTop });
      if (
         scrollHeight <= 0 ||
         offsetHeight === scrollHeight ||
         offsetHeight + scrollTop + 4 >= scrollHeight
      ) {
         setArrow('null');
      } else if (scrollTop === 0 && offsetHeight < scrollHeight) {
         return setArrow('bottom');
      } else if (offsetHeight + scrollTop >= scrollHeight - 4) {
         return setArrow('top');
      } else if (offsetHeight + scrollTop < scrollHeight - 4) {
         return setArrow('null');
      }
   };

   const RefListenAdd = (
      ref = window,
      func = objectLockHover,
      type = 'mouseenter'
   ) => {
      if ((ref && ref.current) || ref === window) {
         ref.current.addEventListener(type, () => func(ref.current));
      }
   };

   const RefListenRemove = (
      ref = window,
      func = objectLockHover,
      type = 'mouseenter'
   ) => {
      if ((ref && ref.current) || ref == window) {
         ref.current.removeEventListener(type, () => func(ref));
      }
   };

   useEffect(() => {
      let element = navListScrollref.current;
      console.log(
         'element',
         element?.offsetHeight + element?.scrollTop + 4 <=
            element?.scrollHeight,
         element?.offsetHeight,
         element?.scrollHeight,
         element?.scrollTop,
         element,
         navListScrollref
      );
      if (element) {
         scrollChecker(element, 'hey');
      }
   }, [toggleMenu, category]);

   useEffect(() => {
      navListScrollref.current && scrollChecker(navListScrollref.current);

      RefListenAdd(instagramref);
      RefListenAdd(facebookref);
      RefListenAdd(phoneref, objectWrapHover);
      RefListenAdd(navListScrollref, scrollChecker, 'scroll');

      return () => {
         RefListenRemove(instagramref);
         RefListenRemove(facebookref);
         RefListenRemove(phoneref, objectWrapHover);
         RefListenRemove(navListScrollref, scrollChecker, 'scroll');
      };
   }, [
      facebookref,
      instagramref,
      phoneref,
      toggleMenu,
      navListScrollref,
      category,
   ]);

   return (
      <>
         <AnimatePresence>
            {toggleMenu && (
               <Nav
                  small={breakpoints.md ? 'Yes' : 'No'}
                  initial={{ x: '100%' }}
                  exit={{ x: '100%' }}
                  animate={{ x: toggleMenu ? 0 : '100%' }}
                  transition={{
                     duration: 0.8,
                     ease: [0.6, 0.05, -0.01, 0.9],
                  }}
               >
                  <NavList>
                     <div className='categories'>
                        {categories.map((el) => (
                           <div
                              key={`category${el}`}
                              onMouseEnter={() => onCursor('pointer')}
                              onMouseLeave={onCursor}
                              onClick={() => setCategory(el)}
                              className={el === category ? 'active' : ''}
                           >
                              {el}
                           </div>
                        ))}
                     </div>
                     <div className='list'>
                        {!breakpoints.md && (
                           <div className='scroll'>
                              <span
                                 className='up'
                                 style={
                                    arrow === 'top'
                                       ? { opacity: '1' }
                                       : { opacity: '0' }
                                 }
                              >
                                 <FontAwesomeIcon icon={faAngleUp} />
                              </span>
                              <span
                                 className='mid'
                                 style={
                                    arrow === 'null'
                                       ? { opacity: '1' }
                                       : { opacity: '0' }
                                 }
                              ></span>
                              <span
                                 className='down'
                                 style={
                                    arrow === 'bottom'
                                       ? { opacity: '1' }
                                       : { opacity: '0' }
                                 }
                              >
                                 <FontAwesomeIcon icon={faAngleDown} />
                              </span>
                           </div>
                        )}
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
                                    onHoverStart={() =>
                                       !breakpoints.md &&
                                       setRevealContent({
                                          show: true,
                                          content: route.content,
                                          key: `route_${index}`,
                                          type: route.type,
                                       })
                                    }
                                    onHoverEnd={() =>
                                       !breakpoints.md &&
                                       setRevealContent({
                                          show: false,
                                          content: route.content,
                                          key: `route_${index}`,
                                          type: route.type,
                                       })
                                    }
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
                  <NavFooter>
                     <Flex spaceBetween={!breakpoints.sm} row={breakpoints.md}>
                        {/* <Flex spaceBetween height={'fit-content'}>
                           {views.map((el, index) => (
                              <H2
                                 key={`view_${index}`}
                                 to='/'
                                 // onClick={() => setMenuView(el)}
                                 // className={
                                 //    menuView.name == el.name ? 'activeView' : ''
                                 // }
                                 ref={el.ref}
                                 onMouseEnter={() => onCursor('pointer')}
                                 onMouseLeave={onCursor}
                              >
                                 {el.name.toUpperCase()}
                              </H2>
                           ))}
                        </Flex> */}
                        <Flex spaceBetween gap={30}>
                           <FooterContent
                              ref={phoneref}
                              onMouseLeave={onCursor}
                           >
                              {/* <Mailto email='ogojonathanp@gmail.com'>
                                 Email me!
                              </Mailto> */}
                           </FooterContent>
                           <FooterSocial>
                              {/* <a
                                 ref={instagramref}
                                 onMouseLeave={onCursor}
                                 href='
                                            https://www.instagram.com/ogojonathan/'
                                 target='_blank'
                              >
                                 <Instagram />
                              </a> */}
                           </FooterSocial>
                        </Flex>
                     </Flex>
                  </NavFooter>
                  {!breakpoints.md && (
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
                  )}
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
