"use client";

import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import Navbar from './navbar';
import { usePathname } from 'next/navigation';

const AnimatedPage = ({ children }) => {
    const pathName = usePathname();

    const blockVariants = {
        initial: { 
            scaleY: 1,
            backgroundColor: "#E9D5FF" // lighter purple
        },
        animate: { 
            scaleY: 0,
            height: "200vh",
            backgroundColor: ["#E9D5FF", "#DDD6FE", "#C4B5FD"],
            transition: {
                backgroundColor: {
                    duration: 0.4,
                    repeat: 1,
                    repeatType: "reverse"
                }
            }
        },
        exit: { 
            scaleY: 1,
            backgroundColor: "#E9D5FF"
        }
    };

    const blockTransition = { 
        duration: 0.4, 
        ease: [0.34, 1.56, 0.64, 1] // bouncy effect
    };

    return (
        <AnimatePresence mode="wait">
            <div key={pathName} className="w-screen h-screen bg-black overflow-hidden relative">
                {/* Animated Blocks with reduced count and optimized rendering */}
                <div className="absolute inset-0 flex z-40 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="h-full"
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={blockVariants}
                            transition={{ 
                                ...blockTransition, 
                                delay: i * 0.04
                            }}
                            style={{
                                width: "20.1%",
                                backfaceVisibility: "hidden",
                                transform: "translate3d(0, 0, 0)",
                                willChange: "transform",
                                marginLeft: i === 0 ? "0" : "-1px"
                            }}
                        />
                    ))}
                </div>

                {/* Text Animation with bouncy effect */}
                <motion.div
                    className="fixed m-auto top-0 bottom-0 left-0 right-0 text-purple-200 text-8xl cursor-default z-50 pointer-events-none w-fit h-fit"
                    initial={{ opacity: 1, scale: 0.8, rotate: -5 }}
                    animate={{ 
                        opacity: 0, 
                        scale: 1,
                        rotate: 5,
                    }}
                    exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    transition={{ 
                        duration: 0.5, 
                        ease: [0.34, 1.56, 0.64, 1]
                    }}
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "translate3d(0, 0, 0)",
                        willChange: "transform, opacity"
                    }}
                >
                    {pathName.substring(1)}
                </motion.div>

                {/* Main Content */}
                <div className="relative z-30">
                    <div className="">
                        <Navbar />
                    </div>

                    <motion.div
                        className="h-[calc(100vh-6rem)] z-10"
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ 
                            duration: 0.4,
                            ease: [0.34, 1.56, 0.64, 1]
                        }}
                        style={{
                            backfaceVisibility: "hidden",
                            transform: "translate3d(0, 0, 0)",
                            willChange: "transform, opacity"
                        }}
                    >
                        {children}
                    </motion.div>
                </div>
            </div>
        </AnimatePresence>
    );
};

export default AnimatedPage;