import React, { useEffect, useRef, useState } from 'react';
import { normalize } from '../utils/utils';

export function DragSentence({ ex, onSolved, requestHint, onShowTheory }) {
	const [slots, setSlots] = useState<string[]>([]);
	const [bank, setBank] = useState<string[]>(ex.tokens);
	const [feedback, setFeedback] = useState<{ ok: boolean } | null>(null);
	const [revealed, setRevealed] = useState(false);
	const startRef = useRef(Date.now());

	const activeIdRef = useRef(ex.id);
	const totalTokensRef = useRef(ex.tokens.length);
	const pendingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Сброс состояния
	function resetState(newEx: typeof ex) {
		if (pendingTimeoutRef.current) {
			clearTimeout(pendingTimeoutRef.current);
			pendingTimeoutRef.current = null;
		}
		activeIdRef.current = newEx.id;
		totalTokensRef.current = newEx.tokens.length;

		setSlots([]);
		setBank(newEx.tokens);
		setFeedback(null);
		setRevealed(false);
		startRef.current = Date.now();
	}

	// Сброс при смене упражнения
	useEffect(() => {
		resetState(ex);
	}, [ex.id]);

	function add(t: string, i: number) {
		if (feedback) return;
		setSlots((s) => [...s, t]);
		setBank((b) => b.filter((_, idx) => idx !== i));
	}

	function remove(i: number) {
		if (feedback) return;
		setBank((b) => [...b, slots[i]]);
		setSlots((s) => s.filter((_, idx) => idx !== i));
	}

	const candidate = slots.join(' ');

	// Проверка корректности
	useEffect(() => {
		if (activeIdRef.current !== ex.id) return;

		const allPlaced =
			slots.length > 0 &&
			bank.length === 0 &&
			slots.length === totalTokensRef.current;

		if (!allPlaced) return;

		const currentExId = ex.id;
		const isCorrect = normalize(candidate) === normalize(ex.correct);

		if (pendingTimeoutRef.current) {
			clearTimeout(pendingTimeoutRef.current);
			pendingTimeoutRef.current = null;
		}

		if (isCorrect) {
			setFeedback({ ok: true });
			const spent = Date.now() - startRef.current;

			pendingTimeoutRef.current = setTimeout(() => {
				if (activeIdRef.current !== currentExId) return;
				resetState(ex);
				onSolved?.(spent);
			}, 1000);
		} else {
			setFeedback({ ok: false });

			pendingTimeoutRef.current = setTimeout(() => {
				if (activeIdRef.current !== currentExId) return;
				setFeedback(null);
				setSlots([]);
				setBank(ex.tokens);
				pendingTimeoutRef.current = null;
			}, 1000);
		}
	}, [bank, slots, candidate, ex, onSolved]);

	async function reveal() {
		const ok = await requestHint();
		if (!ok) return;
		setRevealed(true);
	}

	return (
		<div className="space-y-3">
			<div className="text-sm text-gray-500">
				Перетащи слова, чтобы составить предложение.
			</div>

			{/* <div
				className={`min-h-[64px] flex flex-wrap items-center justify-center gap-2 p-3 rounded-2xl border shadow-sm transition 
					${feedback?.ok === true ? 'border-emerald-400 bg-emerald-50' : ''}
					${feedback?.ok === false ? 'border-rose-400 bg-rose-50' : ''}
					${feedback === null ? 'border-gray-200 bg-white' : ''}
				`}
			> */}
			<div
				className={`h-40 flex flex-wrap items-center justify-center gap-2 p-3 rounded-2xl border shadow-sm transition
		${feedback?.ok === true ? 'border-emerald-400 bg-emerald-50' : ''}
		${feedback?.ok === false ? 'border-rose-400 bg-rose-50' : ''}
		${feedback === null ? 'border-gray-200 bg-white' : ''}
	`}
			>
				{feedback ? (
					<span
						className={`text-lg font-semibold ${
							feedback.ok ? 'text-emerald-600' : 'text-rose-600'
						}`}
					>
						{feedback.ok ? 'Super!' : 'Упс'}
					</span>
				) : (
					slots.map((t, i) => (
						<button
							key={i}
							onClick={() => remove(i)}
							className="px-3 py-2 rounded-xl bg-white border border-gray-400 text-gray-900 text-sm active:scale-95"
						>
							{t}
						</button>
					))
				)}
			</div>

			<div className="flex flex-wrap gap-2">
				{bank.map((t, i) => (
					<button
						key={i}
						onClick={() => add(t, i)}
						className="px-3 py-2 rounded-xl bg-gray-100 border border-gray-200 text-gray-800 text-sm active:scale-95"
						disabled={!!feedback}
					>
						{t}
					</button>
				))}
			</div>

			<div className="grid grid-cols-2 gap-3 w-full">
				<button
					onClick={reveal}
					className="w-full py-2 rounded-xl text-sm font-medium active:scale-95 border"
					disabled={!!feedback}
				>
					Показать ответ
				</button>
				<button
					onClick={onShowTheory}
					className="w-full py-2 rounded-xl text-sm font-medium active:scale-95 border"
					disabled={!!feedback}
				>
					Теория
				</button>
			</div>

			{revealed && (
				<div className="p-3 rounded-xl bg-yellow-50 border border-yellow-200 text-sm">
					Ответ: <span className="font-mono">{ex.correct}</span>
				</div>
			)}
		</div>
	);
}
