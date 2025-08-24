import React from 'react';
import { DragSentence } from '../components/drag-drop';
import { PartizipExercise } from '../components/verb-exercises';
import { VerbGapExercise } from '../components/pqp-exercises';

export function LearnerView({
	sectionKey,
	setSectionKey,
	currentSection,
	current,
	onSolved,
	next,
	progress,
	showTheory,
	setShowTheory,
	requestHint,
}) {
	const secProg = progress[currentSection.key]?.solved || 0;

	return (
		<div className="mt-4 space-y-4">
			<button
				onClick={() => setSectionKey(null)}
				className="px-4 py-2 rounded-xl text-sm font-medium active:scale-95 border w-full"
			>
				← Назад к разделам
			</button>
			<div className="p-4 rounded-2xl bg-white border border-gray-200 shadow">
				<div className="flex items-center justify-between gap-2">
					<div>
						<div className="text-xs text-gray-500">Раздел</div>
						<div className="font-semibold">{currentSection.title}</div>
					</div>
					{/* <div className="text-xs text-gray-500">Решено: {secProg}</div> */}
				</div>

				<div className="mt-3">
					{current ? (
						currentSection.type === 'verb' ? (
							<PartizipExercise
								exercise={current}
								onSolved={(spent) => {
									onSolved(spent);
									next();
								}}
								theoryList={currentSection.exercises} // ✅ сюда передаём все глаголы
							/>
						) : currentSection.type === 'verb-gap' ? (
							<VerbGapExercise
								ex={current}
								onSolved={(spent) => {
									onSolved(spent);
									next();
								}}
								onShowTheory={() => setShowTheory(true)}
							/>
						) : (
							<DragSentence
								ex={current}
								onSolved={(spent) => {
									onSolved(spent);
									next();
								}}
								requestHint={requestHint}
								onShowTheory={() => setShowTheory(true)}
							/>
						)
					) : (
						<div className="text-sm text-gray-500">Задания загружаются…</div>
					)}

					<div className="mt-3 flex gap-2">
						<button
							onClick={next}
							className="px-4 py-2 rounded-xl text-sm font-medium active:scale-95 border w-full"
						>
							Пропустить
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
