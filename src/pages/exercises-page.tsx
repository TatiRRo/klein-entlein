import React, { useState } from 'react';
import { DragSentence } from '../components/drag-drop';
import { PartizipExercise } from '../components/verb-exercises';
import { normalize } from '../utils/utils';

export function ExercisePage({ section }) {
	const [index, setIndex] = useState(0);

	// Для Satzbau используем gen()
	const exercises =
		section.type === 'satz'
			? section.gen({}) // или какие у тебя аргументы
			: section.exercises;

	const current = exercises[index];

	if (!current) {
		return <div className="p-4">Все задания выполнены!</div>;
	}

	function handleSolved() {
		setIndex((i) => i + 1);
	}

	return (
		<div className="p-4">
			{section.type === 'satz' && (
				<DragSentence
					ex={current}
					onSolved={handleSolved}
					requestHint={async () => true}
					onShowTheory={() => alert('Теория (заглушка)')}
				/>
			)}

			{section.type === 'verb' && (
				<PartizipExercise exercise={current} onSolved={handleSolved} />
			)}
		</div>
	);
}
