import React from 'react';

export function FinishLessonBar({ onFinish }) {
	return (
		<div className="fixed bottom-0 left-0 right-0 bg-[#fdf5e6] pb-2 rounded-xl max-w-sm mx-auto">
			<button
				onClick={onFinish}
				className="w-full p-3 rounded-xl bg-black text-white text-sm font-medium active:scale-95"
			>
				Закончить урок
			</button>
		</div>
	);
}
