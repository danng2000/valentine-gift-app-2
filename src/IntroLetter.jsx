import React from 'react';
import { motion } from 'framer-motion';

const IntroLetter = ({ onContinue }) => {
    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">

            {/* Title image — "Will you be my Valen-teer?" (0.7x size) */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                className="absolute top-6 md:top-10 left-0 right-0 z-20 flex justify-center pointer-events-none select-none"
            >
                <img
                    src="/assets/text_on_top.png"
                    alt="Will you be my Valen-teer?"
                    className="h-auto"
                    style={{ maxWidth: 'min(37vw, 224px)' }}
                />
            </motion.div>

            {/* Main card (2x bigger, centered, lowered 100px) */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="relative z-10 flex items-center justify-center"
                style={{ width: 'min(180vw, 1400px)', marginTop: '200px' }}
            >
                {/* Main card image */}
                <img
                    src="/assets/main_card.png"
                    alt=""
                    className="w-full h-auto"
                />

                {/* Tin frame — draggable, constrained to screen */}
                <motion.div
                    drag
                    dragConstraints={{
                        top: -200,
                        left: -300,
                        right: 300,
                        bottom: 200,
                    }}
                    dragElastic={0.1}
                    dragMomentum={false}
                    initial={{ opacity: 0, rotate: 0 }}
                    animate={{ opacity: 1, rotate: 6 }}
                    transition={{ duration: 0.15, delay: 0.18 }}
                    whileHover={{ scale: 1.05, cursor: 'grab' }}
                    whileDrag={{ scale: 1.08, cursor: 'grabbing', zIndex: 100 }}
                    className="absolute z-30 cursor-grab active:cursor-grabbing"
                    style={{
                        top: '8%',
                        left: '22%',
                        width: '22%',
                    }}
                >
                    <img
                        src="/assets/tin_frame.png"
                        alt=""
                        className="w-full h-auto pointer-events-none"
                    />
                </motion.div>

                {/* Text div — moved left and up to fit inside right heart */}
                <div
                    className="absolute z-20 flex flex-col items-center justify-center"
                    style={{
                        top: 'calc(12% - 70px)',
                        right: '8%',
                        width: '40%',
                        bottom: '14%',
                    }}
                >
                    {/* "My Dearest," */}
                    <h2
                        className="italic mb-3 md:mb-5 text-center w-full"
                        style={{
                            color: '#B7292E',
                            fontSize: '1.125rem',
                        }}
                    >
                        My Dearest,
                    </h2>

                    {/* Message body */}
                    <div
                        className="leading-relaxed mb-3 md:mb-5 text-center px-4 md:px-8"
                        style={{
                            color: '#B7292E',
                            fontSize: '1.125rem',
                        }}
                    >
                        <p className="mb-2">
                            Đúng vậii, anh không đọc nhầm đâu. Gọi là "Valen-teer" vì em cần một tình nguyện viên để trải nghiệm ngày Tình Nhân tuyệt vời cùng em đầu xuân này, hihi.
                        </p>
                        <p className="font-semibold mt-2">
                            So, will you be my Valen-teer this year?
                        </p>
                    </div>

                    {/* Two buttons — rounded, thinner stroke */}
                    <div className="flex flex-col gap-2 md:gap-3 w-[80%] max-w-xs">
                        <motion.button
                            whileHover={{
                                scale: 1.03,
                                backgroundColor: '#B7292E',
                                color: '#f5e6d3',
                            }}
                            whileTap={{ scale: 0.97 }}
                            onClick={onContinue}
                            className="w-full py-2 md:py-3 tracking-[0.15em] uppercase rounded-full cursor-pointer transition-colors duration-300"
                            style={{
                                color: '#B7292E',
                                border: '0.75px solid #B7292E',
                                backgroundColor: 'transparent',
                                fontSize: '1.125rem',
                            }}
                        >
                            Yes :D
                        </motion.button>

                        {/* Lower button with arrows (flipped positions) */}
                        <div className="relative flex items-center justify-center">
                            {/* Left arrow — original orientation (points left, toward button) */}
                            <img
                                src="/assets/arrow.png"
                                alt=""
                                className="absolute pointer-events-none select-none"
                                style={{
                                    left: '-24px',
                                    top: '-10px',
                                    width: '20px',
                                    height: 'auto',
                                }}
                            />

                            <motion.button
                                whileHover={{
                                    scale: 1.03,
                                    backgroundColor: '#B7292E',
                                    color: '#f5e6d3',
                                }}
                                whileTap={{ scale: 0.97 }}
                                onClick={onContinue}
                                className="w-full py-2 md:py-3 tracking-[0.08em] uppercase rounded-full cursor-pointer transition-colors duration-300"
                                style={{
                                    color: '#B7292E',
                                    border: '0.75px solid #B7292E',
                                    backgroundColor: 'transparent',
                                    fontSize: '1.125rem',
                                }}
                            >
                                Tất nhiên là có rồi em yêu
                            </motion.button>

                            {/* Right arrow — flipped horizontally */}
                            <img
                                src="/assets/arrow.png"
                                alt=""
                                className="absolute pointer-events-none select-none"
                                style={{
                                    right: '-24px',
                                    top: '-10px',
                                    width: '20px',
                                    height: 'auto',
                                    transform: 'scaleX(-1)',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default IntroLetter;
