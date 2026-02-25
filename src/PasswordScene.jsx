import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CORRECT = '260525';
const LENGTH = 6;

const PasswordScene = ({ onUnlock }) => {
    const [digits, setDigits] = useState(Array(LENGTH).fill(''));
    const [shake, setShake] = useState(false);
    const [unlocking, setUnlocking] = useState(false);
    const inputRefs = useRef([]);

    // Auto-focus first box on mount
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (val, idx) => {
        if (!/^\d?$/.test(val)) return;
        const next = [...digits];
        next[idx] = val;
        setDigits(next);

        // Move forward
        if (val && idx < LENGTH - 1) {
            inputRefs.current[idx + 1]?.focus();
        }

        // Auto-submit when all filled
        if (val && idx === LENGTH - 1) {
            const code = [...next].join('');
            checkCode(code, next);
        }
    };

    const handleKeyDown = (e, idx) => {
        if (e.key === 'Backspace') {
            if (digits[idx]) {
                const next = [...digits];
                next[idx] = '';
                setDigits(next);
            } else if (idx > 0) {
                inputRefs.current[idx - 1]?.focus();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, LENGTH);
        const next = Array(LENGTH).fill('');
        for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
        setDigits(next);
        if (pasted.length === LENGTH) {
            checkCode(pasted, next);
        } else {
            inputRefs.current[pasted.length]?.focus();
        }
    };

    const checkCode = (code, currentDigits) => {
        if (code === CORRECT) {
            setUnlocking(true);
            setTimeout(() => onUnlock(), 900);
        } else {
            setShake(true);
            setTimeout(() => {
                setShake(false);
                setDigits(Array(LENGTH).fill(''));
                inputRefs.current[0]?.focus();
            }, 600);
        }
    };

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">

            {/* Ambient glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(255,215,0,0.05) 0%, transparent 60%)',
                }}
            />

            {/* Floating particles */}
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

            {/* Scene: paper floats above the typewriter */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: unlocking ? 0 : 1, y: unlocking ? -60 : 0, scale: unlocking ? 1.04 : 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex items-end justify-center w-full h-full"
            >
                {/* WARNING paper overlay — CSS card */}
                <div
                    className="absolute z-[2] flex flex-col items-center"
                    style={{
                        width: '48%',
                        bottom: '45%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                >
                    {/* Paper card */}
                    <div
                        className="w-full flex flex-col items-center px-6 py-8"
                        style={{

                            mixBlendMode: 'multiply',
                            borderRadius: '2px',
                        }}
                    >
                        {/* WARNING heading */}
                        <p
                            className="font-cursive tracking-[0.15em] mb-4 text-center"
                            style={{ color: '#8B0000', fontSize: 'clamp(3rem, 1.8vw, 1.4rem)', fontStyle: 'italic' }}
                        >
                            WARNING
                        </p>

                        {/* Prompt */}
                        <p
                            className="font-cursive text-center leading-relaxed mb-6"
                            style={{ color: '#5a2a2a', fontSize: 'clamp(1.5rem, 1.1vw, 0.85rem)', fontStyle: 'italic' }}
                        >
                            Vui lòng nhập password.<br />
                            Ngày tui mình nhận tin lần đầu tiên?
                        </p>

                        {/* Digit boxes */}
                        <AnimatePresence>
                            <motion.div
                                className="flex gap-2 mb-5"
                                animate={shake ? { x: [-6, 6, -5, 5, -3, 3, 0] } : { x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {digits.map((d, i) => (
                                    <input
                                        key={i}
                                        ref={(el) => (inputRefs.current[i] = el)}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={d}
                                        onChange={(e) => handleChange(e.target.value, i)}
                                        onKeyDown={(e) => handleKeyDown(e, i)}
                                        onPaste={i === 0 ? handlePaste : undefined}
                                        className="font-cursive text-center outline-none bg-transparent"
                                        style={{
                                            width: 'clamp(18px, 3vw, 28px)',
                                            fontSize: 'clamp(2rem, 1.8vw, 1.4rem)',
                                            color: '#5a2a2a',
                                            borderBottom: `1.5px solid ${shake ? '#8B0000' : '#a06040'}`,
                                            caretColor: '#8B0000',
                                            paddingBottom: '2px',
                                        }}
                                    />
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {/* Hint */}
                        <p
                            className="font-cursive text-center"
                            style={{ color: '#a06040', fontSize: 'clamp(1rem, 0.9vw, 0.7rem)', fontStyle: 'italic', opacity: 0.8 }}
                        >
                            Gợi ý: Readingroom
                        </p>
                    </div>
                </div>

                {/* Typewriter */}
                <img
                    src="/assets/letter_typewriter.png"
                    alt="Typewriter"
                    className="absolute object-contain pointer-events-none"
                    style={{
                        width: '50%',
                        bottom: '-8%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1,
                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.7))',
                    }}
                />
            </motion.div>
        </div>
    );
};

export default PasswordScene;
