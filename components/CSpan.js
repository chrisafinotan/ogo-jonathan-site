import React, { useEffect, useState, useRef } from "react";
import anime from "animejs";

const CSpan = ({ text, className }) => {
    const [animation, setanimation] = useState();
    const [loaded, setloaded] = useState(false);
    const myRef = useRef();

    const set = (target) => {
        setanimation([
            anime
                .timeline({
                    targets: target,
                    autoplay: false,
                })
                .add({
                    duration: 100,
                    delay: anime.stagger(30),
                    easing: "easeOutSine",
                    opacity: 1,
                    rotateY: [90, 0],
                    color: "#F00",
                }),

            anime
                .timeline({
                    targets: target,
                    autoplay: false,
                })
                .add({
                    duration: 100,

                    delay: anime.stagger(30, { direction: "reverse" }),
                    easing: "easeOutSine",
                    opacity: 1,
                    color: "#FFF",
                    rotateY: [-90, 0],
                }),
        ]);
    };
    useEffect(() => {
        myRef.current.innerHTML = myRef.current.textContent.replace(
            /\S/g,
            "<span class='letter'>$&</span>"
        );
        setloaded(true);
    }, []);

    useEffect(() => {
        if (loaded) {
            let target = `.text_${String(text).replace(/\s+/g, "")} .letter`;
            set(target);
        }
    }, [loaded]);

    useEffect(() => {
        animation && animation[0] && animation[1].play();
    }, [animation]);

    const play = (e) => {
        animation && animation[0].play();
    };

    const playEnd = (e) => {
        animation && animation[1].play();
    };
    return (
        <div className={className}>
            <span
                // className="text-wrapper"
                className={`text_${String(text).replace(/\s+/g, "")}`}
                // onMouseEnter={play}
                // onMouseLeave={playEnd}
            >
                <span ref={myRef} className="letters">
                    {text}
                </span>
            </span>
        </div>
    );
};

export default CSpan;
