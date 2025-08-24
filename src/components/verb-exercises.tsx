import React, { useEffect, useState } from 'react';
import { VerbTheoryModal } from '../components/verb-theory-modal'; // ✅ подключаем модалку

export interface PartizipExerciseProps {
	exercise: {
		id: string;
		infinitiv: string;
		translation: string;
		prateritum: string[];
		partizip2: string;
	};
	onSolved: (spent: number) => void;
	theoryList?: {
		infinitiv: string;
		translation: string;
		prateritum: string[];
		partizip2: string;
	}[]; // ✅ добавляем список глаголов для модалки
}

export function PartizipExercise({
	exercise,
	onSolved,
	theoryList = [],
}: PartizipExerciseProps) {
	const [input, setInput] = useState('');
	const [locked, setLocked] = useState(false);
	const [startTime, setStartTime] = useState(Date.now());
	const [showAnswer, setShowAnswer] = useState(false);
	const [showTheory, setShowTheory] = useState(false); // ✅ состояние модалки

	// Сбрасываем состояние при смене упражнения
	useEffect(() => {
		setInput('');
		setLocked(false);
		setShowAnswer(false);
		setShowTheory(false);
		setStartTime(Date.now());
	}, [exercise.id]);

	function checkAnswer() {
		if (locked) return;
		const normalizedInput = input.trim().toLowerCase();
		const correct = exercise.partizip2.toLowerCase();

		if (normalizedInput === correct) {
			setInput('Super!');
			setLocked(true);
			const spent = Date.now() - startTime;

			setTimeout(() => {
				setLocked(false);
				setInput('');
				onSolved(spent);
			}, 800);
		} else {
			setInput('Упс');
			setLocked(true);

			setTimeout(() => {
				setInput('');
				setLocked(false);
			}, 800);
		}
	}

	return (
		<div className="p-4 rounded-2xl bg-white border shadow">
			{/* Инфинитив + перевод */}
			<h2 className="text-lg font-semibold mb-1">
				{exercise.infinitiv}{' '}
				<span className="text-gray-500 text-sm">({exercise.translation})</span>
			</h2>

			{/* Präteritum */}
			<div className="text-lg font-semibold mb-3">
				{exercise.prateritum.join(', ')}
				<span className="text-gray-500 text-sm"> (Präteritum)</span>
			</div>

			{/* Поле для ответа */}
			<div className="flex gap-2 mb-3 flex-wrap justify-center">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Введите Partizip II"
					className={`border rounded-xl px-3 py-2 w-full text-center text-lg font-medium transition
						${input === 'Упс' ? 'border-rose-400 bg-rose-50 text-rose-600' : ''}
						${input === 'Super!' ? 'border-emerald-400 bg-emerald-50 text-emerald-700' : ''}
					`}
					disabled={locked}
				/>
			</div>

			{/* Кнопки */}
			<div className="flex flex-wrap gap-2 mb-3 justify-center">
				<button
					onClick={checkAnswer}
					className="bg-emerald-500 text-white px-5 py-2 rounded-xl hover:bg-emerald-600 disabled:opacity-50"
					disabled={locked}
				>
					Проверить
				</button>
				<button
					onClick={() => setShowAnswer(true)}
					className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
					disabled={locked}
				>
					Показать ответ
				</button>
				<button
					onClick={() => setShowTheory(true)}
					className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 w-full"
				>
					Список глаголов этой группы
				</button>
			</div>

			{/* Ответ */}
			{showAnswer && (
				<div className="mt-3 p-2 rounded bg-yellow-50 border border-yellow-200 text-sm text-center">
					Правильный ответ:{' '}
					<span className="font-bold">{exercise.partizip2}</span>
				</div>
			)}

			{/* ✅ Модалка с теорией */}
			<VerbTheoryModal
				open={showTheory}
				onClose={() => setShowTheory(false)}
				verbs={theoryList}
			/>
		</div>
	);
}
