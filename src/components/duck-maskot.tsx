import React from 'react';
import { motion } from 'framer-motion';

// импорт картинок уточки
import duckFirstLevel from './../images/duck-1lv-new-transparent.png';
import duckSecondLevel from './../images/duck-2lv-new-tr.png';
import duckThirdLevel from './../images/duck-3lv.png';
import duckFourthLevel from './../images/duck-4lv.png';
import duckFifthLevel from './../images/duck-5lv.png';

export function Duck({ level = 0 }) {
	let duckImage = duckFirstLevel;

	if (level >= 50) {
		duckImage = duckFifthLevel;
	} else if (level >= 30) {
		duckImage = duckFifthLevel;
	} else if (level >= 30) {
		duckImage = duckFourthLevel;
	} else if (level >= 20) {
		duckImage = duckThirdLevel;
	} else if (level >= 15) {
		duckImage = duckSecondLevel;
	} else if (level >= 5) {
		duckImage = duckFirstLevel;
	}

	return (
		<motion.img
			key={duckImage} // чтобы framer-motion анимировал при смене
			src={duckImage}
			alt="Duck"
			className="w-40 h-32 mx-auto object-contain"
			initial={{ scale: 0.9, rotate: -2, opacity: 0 }}
			animate={{ scale: 1, rotate: 0, opacity: 1 }}
			transition={{ type: 'spring', stiffness: 200, damping: 12 }}
		/>
	);
}
