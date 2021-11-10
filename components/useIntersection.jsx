import React, { useState, useEffect } from "react";

export function useIntersection(element, rootMargin) {
    const [isVisible, setState] = useState(false);

    console.log("intersection", element)

    useEffect(() => {
        console.log("effect called")
        const observer = new IntersectionObserver(
            ([entry]) => {
                setState(entry.isIntersecting);
                console.log("check")
            },
            { rootMargin }
        );

        element && observer.observe(element);

        return () => observer.unobserve(element);
    }, []);

    return isVisible;
};