import { useEffect, useState } from 'react';

function todayKey() {
	const d = new Date();
	return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

export function useProgress(user, Adapter) {
	const key = user ? `satzbau_progress_${user.name}` : null;
	const [progress, setProgress] = useState({});
	const [duck, setDuck] = useState(0); // separate level currency
	const [hints, setHints] = useState({ day: todayKey(), used: 0 });

	useEffect(() => {
		(async () => {
			if (!key) return;
			const p = await Adapter.get(key, {});
			setProgress(p);
			const d = await Adapter.get(`${key}_duck`, 0);
			setDuck(d);
			const h = await Adapter.get(`${key}_hints`, { day: todayKey(), used: 0 });
			// reset if day changed
			setHints(h.day === todayKey() ? h : { day: todayKey(), used: 0 });
		})();
	}, [key]);

	useEffect(() => {
		if (key) Adapter.set(key, progress);
	}, [progress, key]);
	useEffect(() => {
		if (key) Adapter.set(`${key}_duck`, duck);
	}, [duck, key]);
	useEffect(() => {
		if (key) Adapter.set(`${key}_hints`, hints);
	}, [hints, key]);

	function markSolved(sectionKey, msSpent) {
		setProgress((p) => {
			const sec = p[sectionKey] || { solved: 0, last: Date.now(), times: [] };
			const times = [...(sec.times || []), msSpent];
			return {
				...p,
				[sectionKey]: {
					solved: (sec.solved || 0) + 1,
					last: Date.now(),
					times,
				},
			};
		});
		setDuck((d) => d + 1);
	}

	function canRevealFree() {
		return hints.day === todayKey() && hints.used < 2;
	}
	function useHint() {
		setHints((h) => {
			const dayNow = todayKey();
			if (h.day !== dayNow) return { day: dayNow, used: 1 };
			return { day: h.day, used: h.used + 1 };
		});
	}
	function payHintIfNeeded() {
		if (canRevealFree()) {
			useHint();
			return true;
		}
		if (duck <= 0) return false; // can't pay
		useHint();
		setDuck((d) => Math.max(0, d - 1));
		return true;
	}

	return { progress, markSolved, duck, canRevealFree, payHintIfNeeded };
}
