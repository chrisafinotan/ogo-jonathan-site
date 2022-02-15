import { useState, useEffect } from "react";

export default function useElementPosition(el) {
    function getElement(x, y, w, h) {
        return {
            x: x,
            y: y,
            width: w,
            height: h,
        };
    }

    // const [elementPosition, setElementPosition] = useState(getElement);
    let elementPosition;
    // useEffect(() => {
    function handlePosition() {
        let element = el.current;
        let x =
            element.getBoundingClientRect().left +
            document.documentElement.scrollLeft +
            element.offsetWidth / 2;
        let y =
            element.getBoundingClientRect().top +
            document.documentElement.scrollTop +
            element.offsetHeight / 2;
        let w = element.getBoundingClientRect().width;
        let h = element.getBoundingClientRect().height;
        // setElementPosition(getElement(x, y));
        elementPosition = getElement(x, y, w, h);
    }
    if (el === null) {
        // setElementPosition(getElement(0, 0));
        elementPosition = getElement(0, 0);
    } else {
        handlePosition();
    }
    // }, [el]);

    return elementPosition;
}
