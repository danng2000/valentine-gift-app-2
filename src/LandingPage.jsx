import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LandingPage = ({ onOpen, onComplete }) => {
    const [isOpened, setIsOpened] = useState(false);

    const handleOpen = () => {
        setIsOpened(true);
        onOpen(); // Tell App to start loading IntroLetter immediately
    };

    return (
        <div
            className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden"
        >
            {/* Left Curtain */}
            <motion.div
                initial={{ x: 0 }}
                animate={{ x: isOpened ? '-100%' : 0 }}
                transition={{ duration: 3.5, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={() => {
                    if (isOpened) {
                        onComplete(); // Curtains done — remove overlay
                    }
                }}
                className="absolute left-0 top-0 w-1/2 h-full z-20"
            >
                <img
                    src="/assets/curtain_left.png"
                    alt="Left Curtain"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "right center" }}
                />
            </motion.div>

            {/* Right Curtain */}
            <motion.div
                initial={{ x: 0 }}
                animate={{ x: isOpened ? '100%' : 0 }}
                transition={{ duration: 3.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-0 top-0 w-1/2 h-full z-20"
            >
                <img
                    src="/assets/curtain_right.png"
                    alt="Right Curtain"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "left center" }}
                />
            </motion.div>

            {/* Center Content */}
            <motion.div
                animate={{ opacity: isOpened ? 0 : 1, scale: isOpened ? 1.1 : 1 }}
                transition={{ duration: 0.5 }}
                className="absolute z-30 flex flex-col items-center justify-center w-full h-full pointer-events-none"
            >
                {/* Heart Layer */}
                <motion.div
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{
                        scale: isOpened ? 50 : 1,
                        opacity: isOpened ? 0 : 1
                    }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute z-[-1] pointer-events-none flex items-center justify-center"
                >
                    {/* Theatrical Light Burn Effect */}
                    <div
                        className="absolute w-full h-full z-[-2]"
                        style={{
                            background: 'radial-gradient(circle at center, rgba(220, 0, 0, 0.6) 0%, rgba(100, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0) 70%)',
                            mixBlendMode: 'linear-dodge',
                            filter: 'blur(40px)',
                            transform: 'scale(1.5)',
                        }}
                    />

                    <img
                        src="/assets/heart.png"
                        alt="Heart"
                        className="w-[38rem] h-[38rem] md:w-[58rem] md:h-[58rem] object-contain opacity-50 mix-blend-overlay"
                        style={{
                            filter: 'drop-shadow(0 0 15px rgba(150, 0, 0, 0.6))'
                        }}
                    />
                </motion.div>

                {/* Hero Text */}
                <div className="mb-8 pointer-events-auto">
                    <img
                        src="/assets/hero_text.png"
                        alt="To My Dear"
                        className="max-w-[85vw] md:max-w-5xl object-contain drop-shadow-2xl"
                    />
                </div>

                {/* Stamp / Button */}
                <div className="absolute top-[20%] right-[10%] md:top-[25%] md:right-[20%] pointer-events-auto">
                    <motion.button
                        whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleOpen}
                        className="relative w-48 h-48 md:w-64 md:h-64"
                    >
                        <img
                            src="/assets/stamp.png"
                            alt="Open Here"
                            className="w-full h-full object-contain drop-shadow-xl"
                        />
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default LandingPage;
