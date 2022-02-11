import React, { useEffect, useState, useRef } from "react"
//Context
import { useGlobalStateContext } from "../context/globalContext"
// Styled Components
import { Cursor } from "../styles/globalStyles"

const CCursor = ({ toggleMenu }) => {
  const { cursorType } = useGlobalStateContext()
  const cursor = useRef(null);

  const onMouseMove = event => {
    const { clientX, clientY } = event
    if (cursor.current)
    {
      cursor.current.style.left = `${clientX}px`;
      cursor.current.style.top = `${clientY}px`;
    } 
  }

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove)
    return () => {
      document.removeEventListener("mousemove", onMouseMove)
    }
  }, [])
  console.log('cursor', cursor)
  return (
    <>
      <Cursor
        className={`${!!cursorType ? "hovered" : ""} ${cursorType} ${
          toggleMenu ? "nav-open" : ""
        }`}
        ref = {cursor}
      />
    </>
  )
}

export default CCursor
