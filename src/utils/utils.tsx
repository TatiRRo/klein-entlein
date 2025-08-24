import React from 'react';

// export function shuffle(arr) {
// 	const a = [...arr];
// 	for (let i = a.length - 1; i > 0; i--) {
// 		const j = Math.floor(Math.random() * (i + 1));
// 		[a[i], a[j]] = [a[j], a[i]];
// 	}
// 	return a;
// }

// shuffle
export function shuffle(array) {
	return array.sort(() => Math.random() - 0.5);
}

export function normalize(s) {
	return s
		.replace(/\s+/g, ' ')
		.replace(/\s([,.!?;:])/g, '$1')
		.trim()
		.toLowerCase();
}

export function formatDuration(ms) {
	const sec = Math.floor(ms / 1000);
	const h = Math.floor(sec / 3600);
	const m = Math.floor((sec % 3600) / 60);
	const s = sec % 60;
	const HH = h > 0 ? String(h).padStart(2, '0') + ':' : '';
	return `${HH}${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
