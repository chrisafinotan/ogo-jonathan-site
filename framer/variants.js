export const imageWrapper = {
    init: {
        opacity: 0,
        transition: { duration: 0.2 },
    },
    anim: {
        opacity: 1,
        transition: { duration: 1 },
    },
    color: {
        filter: "invert(1)",
    },
    exit: {
        transition: {
            staggerChildren: 1,
        },
    },
};

export const spanContainer = {
    show: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

export const spanText = {
    hidden: {
        opacity: 0,
        y: 20,
        rotateX: -90,
    },
    show: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            ease: [0.6, 0.01, -0.05, 0.95],
            duration: 1.7,
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: {
            ease: "easeInOut",
            duration: 0.7,
        },
    },
};
