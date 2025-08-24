import React from 'react';
import { formatDuration } from '../utils/utils';
import { Duck } from './duck-maskot';
import { UpgradeBar } from './upgrade-bar';

export function ResultsView({ solved, ms, duckLevel, onRestart, onLogout }) {
	return (
		<div className="min-h-screen flex items-center justify-center bg-[#fdf5e6] p-6">
			<div className="w-full max-w-2xl p-8 rounded-3xl bg-[#fdf5e6] border border-gray-200 shadow-lg space-y-6">
				<div className="text-center">
					<div className="text-sm text-gray-500">Результат урока</div>
					<h2 className="text-2xl font-bold mt-1">Отличная работа! 🎉</h2>
				</div>

				<div className="flex flex-col items-center space-y-3">
					<Duck level={duckLevel} />
					<div className="text-center text-sm text-gray-600">
						Уровень уточки: <span className="font-medium">{duckLevel}</span>
					</div>
					<UpgradeBar total={duckLevel} />
				</div>

				<div className="grid gap-3 text-sm">
					<div className="p-4 rounded-xl bg-gray-50 border">
						Упражнений пройдено за урок:{' '}
						<span className="font-medium">{solved}</span>
					</div>
					{/* //ТАЙМЕР УРОКА */}
					{/* <div className="p-4 rounded-xl bg-gray-50 border">
						Время урока:{' '}
						<span className="font-medium">{formatDuration(ms)}</span>
					</div> */}
				</div>

				<div className="grid grid-cols-2 gap-4">
					<button
						onClick={onRestart}
						className="px-4 py-3 rounded-xl bg-black text-white text-sm font-medium active:scale-95"
					>
						Начать новый урок
					</button>
					<button
						onClick={onLogout}
						className="px-4 py-3 rounded-xl bg-rose-600 text-white text-sm font-medium active:scale-95"
					>
						Выйти
					</button>
				</div>
			</div>
		</div>
	);
}
