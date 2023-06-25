export const navMenu = {
   init: {
      opacity: 0,
      width: 0,
      height: 0,
      transition: {
         staggerChildren: 0.25,
         when: 'beforeChildren',
      },
   },
   anim: {
      opacity: 1,
      width: '85vw',
      height: 'fit-content',
      transition: {
         duration: 0.25,
         staggerChildren: 0.25,
         when: 'beforeChildren',
      },
   },
   animSmall: {
      opacity: 1,
      width: '100vw',
      height: '80vh',
      transition: {
         duration: 0.25,
         staggerChildren: 0.25,
         when: 'beforeChildren',
      },
   },
   exit: {
      opacity: 0,
      width: 0,
      height: 0,
      transition: {
         duration: 0.25,
         when: 'afterChildren',
         staggerDirection: -1
      },
   },
};

export const navMenuChild = {
   init: {
      opacity: 0,
   },
   anim: {
      opacity: 1,
   },
   animSmall: {
      opacity: 1,
   },
   exit: {
      opacity: 0,
   },
};

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
      filter: 'invert(1)',
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
         ease: 'easeInOut',
         duration: 0.7,
      },
   },
};

export const projectsContainer__motion = {
   show: {
      transition: {
         staggerChildren: 0.4,
      },
   },
};

export const project__motion = {
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
         ease: [0.6, 0.01, -0.05, 0.95],
         duration: 1.7,
      },
   },
};

export const imageViewer = {
   hidden: {
      opacity: 0,
      //   transition: {
      //      when: 'afterChildren',
      //   },
   },
   show: {
      opacity: 1,
      transition: {
         ease: 'easeIn',
         duration: 0.2,
         //  when: 'beforeChildren',
         delayChildren: 2,
      },
   },
   exit: {
      opacity: 0,
      //   transition: {
      //      when: 'beforeChildren',
      //   },
   },
};

export const imageViewerControls = {
   hidden: {
      y: 200,
   },
   show: {
      y: 0,
      transition: {
         ease: 'easeIn',
         duration: 0.6,
         when: 'afterChildren',
      },
   },
   exit: {
      y: 200,
   },
};
