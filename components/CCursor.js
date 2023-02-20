import React, { useEffect, useState, useRef } from 'react';
//Context
import { useGlobalStateContext } from '../context/globalContext';
// Styled Components
import { Cursor } from '../styles/globalStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faMagnifyingGlassPlus, faEye } from '@fortawesome/free-solid-svg-icons';

const CCursor = ({ toggleMenu }) => {
   const { cursorType, cursorText } = useGlobalStateContext();
   const cursor = useRef(null);

   const onMouseMove = (event) => {
      const { clientX, clientY } = event;
      if (cursor.current) {
         cursor.current.style.left = `${clientX}px`;
         cursor.current.style.top = `${clientY}px`;
      }
   };

   const iconMap = {
      view: faEye,
      expand: faExpand,
      magnify: faMagnifyingGlassPlus,
   };

   useEffect(() => {
      document.addEventListener('mousemove', onMouseMove);
      return () => {
         document.removeEventListener('mousemove', onMouseMove);
      };
   }, []);
   return (
      <>
         <Cursor
            className={`${!!cursorType ? 'hovered' : ''} ${cursorType} ${
               toggleMenu ? 'nav-open' : ''
            }`}
            ref={cursor}
         >
            {iconMap[cursorText] && (
               <FontAwesomeIcon icon={iconMap[cursorText]} />
            )}
         </Cursor>
      </>
   );
};

export default CCursor;
