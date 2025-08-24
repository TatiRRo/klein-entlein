import React, { useEffect, useState } from 'react';

export function Timer({ since }) {
	const [now, setNow] = useState(Date.now());
	useEffect(() => {
		const id = setInterval(() => setNow(Date.now()), 1000);
		return () => clearInterval(id);
	}, []);
	const elapsed = Math.max(0, Math.floor((now - since) / 1000));
	const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
	const ss = String(elapsed % 60).padStart(2, '0');
	return (
		<div className="px-4 py-2 rounded-xl text-sm font-medium border">
			<span className="text-xs text-gray-500">
				Время урока : {mm}:{ss}
			</span>
		</div>
	);
}
