// import React, { useState } from 'react';

// export function VerbGapExercise({
// 	ex,
// 	onSolved,
// }: {
// 	ex: any;
// 	onSolved: (spent: number) => void;
// }) {
// 	const [selected, setSelected] = useState<string[]>([]);
// 	const [startTime] = useState(Date.now());

// 	function selectWord(word: string) {
// 		if (selected.includes(word)) return;
// 		setSelected([...selected, word]);
// 	}

// 	function check() {
// 		const correct = ex.correct.every(
// 			(w: string, i: number) => selected[i] === w
// 		);
// 		if (correct) {
// 			const spent = Date.now() - startTime;
// 			onSolved(spent);
// 		} else {
// 			alert('Falsch! Versuche es noch einmal.');
// 			setSelected([]);
// 		}
// 	}

// 	const parts = ex.text.split('___');

// 	return (
// 		<div className="space-y-4">
// 			{/* Предложение */}
// 			<div className="text-lg font-medium">
// 				{parts.map((p: string, i: number) => (
// 					<span key={i}>
// 						{p}
// 						{i < ex.correct.length && (
// 							<span className="inline-block min-w-[80px] border-b border-gray-400 text-center">
// 								{selected[i] || '___'}
// 							</span>
// 						)}
// 					</span>
// 				))}
// 			</div>

// 			{/* Банк слов */}
// 			<div className="flex flex-wrap gap-2 mt-3">
// 				{ex.bank.map((word: string) => (
// 					<button
// 						key={word}
// 						onClick={() => selectWord(word)}
// 						className={`px-3 py-1 rounded-lg border ${
// 							selected.includes(word) ? 'bg-gray-200' : 'bg-white'
// 						}`}
// 					>
// 						{word}
// 					</button>
// 				))}
// 			</div>

// 			{/* Кнопки */}
// 			<div className="flex gap-2">
// 				<button
// 					onClick={check}
// 					className="px-4 py-2 rounded-xl text-sm font-medium bg-green-500 text-white"
// 				>
// 					Проверить
// 				</button>
// 				<button
// 					onClick={() => setSelected([])}
// 					className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-300"
// 				>
// 					Сбросить
// 				</button>
// 			</div>
// 		</div>
// 	);
// }

import React, { useState, useEffect, useRef } from 'react';
import { normalize } from '../utils/utils';

export function VerbGapExercise({ ex, onSolved, onShowTheory }) {
	const [answers, setAnswers] = useState<string[]>([]);
	const [feedback, setFeedback] = useState<{ ok: boolean } | null>(null);
	const [revealed, setRevealed] = useState(false);
	const startRef = useRef(Date.now());
	const pendingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Сброс при смене упражнения
	useEffect(() => {
		resetState();
	}, [ex.id]);

	function resetState() {
		if (pendingTimeoutRef.current) {
			clearTimeout(pendingTimeoutRef.current);
			pendingTimeoutRef.current = null;
		}
		setAnswers(new Array(ex.gaps.length).fill(''));
		setFeedback(null);
		setRevealed(false);
		startRef.current = Date.now();
	}

	function handleChange(value: string, idx: number) {
		if (feedback) return;
		const updated = [...answers];
		updated[idx] = value.trim();
		setAnswers(updated);
	}

	const allFilled = answers.every((a) => a.length > 0);

	useEffect(() => {
		if (!allFilled || feedback) return;

		const userAnswer = ex.template
			.replace(/___/g, (_, i = 0) => answers[i++])
			.trim();
		const isCorrect = normalize(userAnswer) === normalize(ex.correct);

		if (isCorrect) {
			setFeedback({ ok: true });
			const spent = Date.now() - startRef.current;
			pendingTimeoutRef.current = setTimeout(() => {
				onSolved?.(spent);
				resetState();
			}, 1000);
		} else {
			setFeedback({ ok: false });
			pendingTimeoutRef.current = setTimeout(() => {
				setFeedback(null);
				resetState();
			}, 1000);
		}
	}, [answers, allFilled, ex, onSolved]);

	return (
		<div className="space-y-3">
			<div className="text-sm text-gray-500">
				Заполни пропуски правильными словами.
			</div>

			<div
				className={`p-3 rounded-2xl border shadow-sm min-h-[64px]
					${feedback?.ok ? 'border-emerald-400 bg-emerald-50' : ''}
					${feedback?.ok === false ? 'border-rose-400 bg-rose-50' : ''}
					${feedback === null ? 'border-gray-200 bg-white' : ''}`}
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
					<p>
						{ex.template.split('___').map((chunk, idx) => (
							<span key={idx}>
								{chunk}
								{idx < ex.gaps.length && (
									<input
										type="text"
										value={answers[idx]}
										onChange={(e) => handleChange(e.target.value, idx)}
										className="border rounded px-2 py-1 w-20 mx-1"
									/>
								)}
							</span>
						))}
					</p>
				)}
			</div>

			<div className="grid grid-cols-2 gap-3">
				<button
					onClick={() => setRevealed(true)}
					className="py-2 rounded-xl border text-sm font-medium active:scale-95"
					disabled={!!feedback}
				>
					Показать ответ
				</button>
				<button
					onClick={onShowTheory}
					className="py-2 rounded-xl border text-sm font-medium active:scale-95"
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

			{/* Банк слов */}
			<div className="flex flex-wrap gap-2 mt-3">
				{ex.bank.map((word, idx) => (
					<span
						key={idx}
						className="px-3 py-2 rounded-xl bg-gray-100 border text-gray-800 text-sm"
					>
						{word}
					</span>
				))}
			</div>
		</div>
	);
}
