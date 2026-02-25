import React from 'react';
import { motion } from 'framer-motion';

const HandLetter = ({ onReplay }) => {
    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">

            {/* Same crimson background as global bg_texture */}
            {/* (bg_texture from App.jsx already covers this, so nothing extra needed) */}

            {/* Ambient glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.06) 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, rgba(198, 40, 40, 0.1) 0%, transparent 50%)',
                }}
            />

            {/* Floating gold particles */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: 2 + Math.random() * 3,
                        height: 2 + Math.random() * 3,
                        background: 'rgba(255, 215, 0, 0.3)',
                        left: `${10 + i * 11}%`,
                        top: `${15 + (i % 4) * 20}%`,
                    }}
                    animate={{ y: [0, -20, 0], opacity: [0.1, 0.5, 0.1] }}
                    transition={{ duration: 4 + i * 0.3, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
                />
            ))}

            {/* Scene container — letter paper + typewriter stacked */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex items-end justify-center w-full h-full"
                style={{ maxHeight: '90vh' }}
            >
                {/* Letter paper — sits on top of typewriter, centered */}
                <img
                    src="/assets/letter_paper.png"
                    alt="Letter Paper"
                    className="absolute object-contain pointer-events-none"
                    style={{
                        width: '22%',
                        bottom: '20%',          /* floats above the typewriter carriage */
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 2,

                        mixBlendMode: 'multiply',
                    }}
                />

                {/* Typewriter — anchored to bottom-center */}
                <img
                    src="/assets/letter_typewriter.png"
                    alt="Typewriter"
                    className="absolute object-contain pointer-events-none"
                    style={{
                        width: '50%',
                        bottom: '-14%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1,

                    }}
                />
            </motion.div>

            {/* START OVER button — overlaid on typewriter body */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="absolute z-20"
                style={{
                    bottom: '14%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            >
                <button
                    onClick={onReplay}
                    className="font-cursive cursor-pointer transition-all"
                    style={{
                        fontSize: '1.1rem',
                        letterSpacing: '0.15em',
                        color: '#B7292E',
                        background: 'linear-gradient(180deg, #f0e6d3 0%, #ddd0bb 100%)',
                        border: '1.5px solid #B7292E',
                        borderRadius: '999px',
                        padding: '0.45rem 2.2rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.5)',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(180deg, #fff5e8 0%, #e8d8c0 100%)';
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.6)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(180deg, #f0e6d3 0%, #ddd0bb 100%)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.5)';
                    }}
                >
                    START OVER
                </button>
            </motion.div>
        </div>
    );
};

export default HandLetter;
