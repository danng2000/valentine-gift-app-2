import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
    {
        id: 1,
        question: "Where did we have our first date?",
        options: ["The Movies", "A Fancy Restaurant", "The Park", "Coffee Shop"],
        correct: 0
    },
    {
        id: 2,
        question: "What is my favorite color?",
        options: ["Blue", "Red", "Pink", "Green"],
        correct: 1
    },
    {
        id: 3,
        question: "What is our song?",
        options: ["Perfect", "All of Me", "Lover", "Just the Way You Are"],
        correct: 2
    },
    {
        id: 4,
        question: "Who said 'I love you' first?",
        options: ["Me", "You", "At the same time", "My Cat"],
        correct: 0
    },
    {
        id: 5,
        question: "How much do I love you?",
        options: ["A lot", "To the moon and back", "Infinity", "More than pizza"],
        correct: 2
    }
];

const QuizModal = ({ isOpen, onClose, onComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isWrong, setIsWrong] = useState(false);
    const [selectedCorrect, setSelectedCorrect] = useState(null);

    if (!isOpen) return null;

    const handleAnswer = (index) => {
        if (index === questions[currentQuestion].correct) {
            setSelectedCorrect(index);
            setIsWrong(false);
            setTimeout(() => {
                setSelectedCorrect(null);
                if (currentQuestion < questions.length - 1) {
                    setCurrentQuestion(currentQuestion + 1);
                } else {
                    // All questions answered — unlock the letter
                    setCurrentQuestion(0);
                    onComplete();
                }
            }, 600);
        } else {
            setIsWrong(true);
            setTimeout(() => setIsWrong(false), 500);
        }
    };

    const q = questions[currentQuestion];
    const progress = ((currentQuestion) / questions.length) * 100;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(10, 0, 0, 0.7)', backdropFilter: 'blur(8px)' }}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{
                    scale: 1,
                    y: 0,
                    x: isWrong ? [0, -10, 10, -10, 10, 0] : 0,
                }}
                transition={{ type: "spring", duration: 0.4 }}
                className="relative max-w-md w-full rounded-xl overflow-hidden"
                style={{
                    background: 'linear-gradient(145deg, #3a0a08 0%, #260201 50%, #1a0100 100%)',
                    border: '1px solid rgba(198, 40, 40, 0.3)',
                    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                }}
            >
                {/* Progress bar */}
                <div className="h-1 w-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                    <motion.div
                        className="h-full"
                        style={{
                            background: 'linear-gradient(90deg, #8B0000, #C62828, #FFD700)',
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4 }}
                    />
                </div>

                <div className="p-6 md:p-8">
                    {/* Question counter */}
                    <div className="mb-5 text-center">
                        <span
                            className="inline-block px-4 py-1.5 rounded-full text-sm font-bold tracking-widest"
                            style={{
                                background: 'rgba(198, 40, 40, 0.15)',
                                color: '#e8c4a0',
                                border: '1px solid rgba(198, 40, 40, 0.2)',
                            }}
                        >
                            {currentQuestion + 1} / {questions.length}
                        </span>
                    </div>

                    {/* Question */}
                    <AnimatePresence mode="wait">
                        <motion.h3
                            key={q.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-2xl md:text-3xl font-cursive text-center mb-8"
                            style={{ color: '#e8c4a0' }}
                        >
                            {q.question}
                        </motion.h3>
                    </AnimatePresence>

                    {/* Options */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={q.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid gap-3"
                        >
                            {q.options.map((option, idx) => (
                                <motion.button
                                    key={idx}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleAnswer(idx)}
                                    className="w-full p-4 text-lg font-cursive rounded-lg transition-all cursor-pointer text-left"
                                    style={{
                                        background: selectedCorrect === idx
                                            ? 'rgba(34, 139, 34, 0.2)'
                                            : 'rgba(255, 255, 255, 0.04)',
                                        color: selectedCorrect === idx ? '#90EE90' : '#c9a88a',
                                        border: selectedCorrect === idx
                                            ? '1px solid rgba(34, 139, 34, 0.4)'
                                            : '1px solid rgba(255, 255, 255, 0.06)',
                                    }}
                                >
                                    <span className="mr-3" style={{ color: 'rgba(255, 215, 0, 0.4)' }}>
                                        {String.fromCharCode(65 + idx)}.
                                    </span>
                                    {option}
                                </motion.button>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="mt-6 w-full text-center text-sm cursor-pointer"
                        style={{ color: 'rgba(201, 168, 138, 0.4)' }}
                    >
                        Close
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default QuizModal;
