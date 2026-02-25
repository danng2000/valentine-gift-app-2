import React from 'react';
import { motion } from 'framer-motion';

const Letter = ({ onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black"
            onClick={onClose}
        >
            <img
                src="/assets/letter_scene.png"
                alt="Letter Scene"
                className="w-full h-full object-cover"
                onClick={(e) => e.stopPropagation()}
            />

            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl transition z-10"
            >
                ✕
            </button>
        </motion.div>
    );
};

export default Letter;
