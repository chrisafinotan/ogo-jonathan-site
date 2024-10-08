'use client';

import { motion } from 'framer-motion';

function calculateRandomBlockDelay(rowIndex, totalRows) {
    const blockDelay = Math.random() * 0.5;
    const rowDelay = (totalRows - rowIndex - 1) * 0.05;
    return blockDelay + rowDelay;
}

export function Transition({ children }) {
    return (
        <>
            {children}

            <div className='blocks-container transition-in'>
                {Array.from({ length: 10 }, (_, x) => {
                    <div className='row' key={`transition_${x}`}>
                        {Array.from({ length: 11 }, (_, y) => {
                            <motion.div
                                className='block'
                                key={`transition_block${y}`}
                                initial={{ scaleY: 1 }}
                                animate={{ scaleY: 0 }}
                                exit={{ scaleY: 0 }}
                                transition={{
                                    duration: 1,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: calculateRandomBlockDelay(x, 10),
                                }}
                            ></motion.div>;
                        })}
                    </div>;
                })}
            </div>
        </>
    );
}
