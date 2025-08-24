import React, { useState } from 'react';
import { SECTIONS } from './categories';

const safeParse = (key, fallback) => {
	try {
		const raw = localStorage.getItem(key);
		return raw ? JSON.parse(raw) : fallback;
	} catch {
		return fallback;
	}
};

export function TeacherDashboard() {
	const registry = safeParse('satzbau_registry', []);
	const [selected, setSelected] = useState<string | null>(null);

	const students = registry.map((name: string) => {
		const lessons = safeParse(`satzbau_lessons_${name}`, []);
		const lastLesson = lessons.length ? lessons[lessons.length - 1] : null;
		return { name, lessons, lastLesson };
	});

	return (
		<div className="space-y-4">
			<div className="text-sm text-gray-600">
				История уроков по ученикам. Нажмите на карточку для деталей.
			</div>

			<div className="grid grid-cols-1 gap-3">
				{students.map(({ name, lessons, lastLesson }) => {
					const lastDate = lastLesson
						? new Date(lastLesson.finished).toLocaleDateString()
						: '—';

					return (
						<div
							key={name}
							className="p-4 rounded-2xl bg-white border border-gray-200 shadow"
						>
							{/* Заголовок карточки ученика */}
							<button
								onClick={() => setSelected(selected === name ? null : name)}
								className="w-full text-left flex items-center justify-between"
							>
								<div>
									<div className="font-medium">{name}</div>
									<div className="text-xs text-gray-500">
										Последняя дата: {lastDate}
									</div>
								</div>
								<span className="text-xs text-gray-400">
									{selected === name ? '▲' : '▼'}
								</span>
							</button>

							{/* Детали: список уроков */}
							{selected === name && (
								<div className="mt-3 space-y-3">
									{(!lessons || lessons.length === 0) && (
										<div className="text-xs text-gray-500">Уроков пока нет</div>
									)}

									{lessons &&
										lessons
											.slice()
											.reverse()
											.map((lesson: any, i: number) => {
												const duration = Math.max(
													0,
													Number(lesson?.duration) || 0
												);
												const solved = Math.max(0, Number(lesson?.solved) || 0);
												const finished = lesson?.finished
													? new Date(lesson.finished)
													: null;
												const dateStr = finished
													? finished.toLocaleString()
													: '—';

												const bySection =
													lesson && typeof lesson.bySection === 'object'
														? lesson.bySection
														: {};

												const entries = Object.entries(bySection).filter(
													([, count]) => (Number(count) || 0) > 0
												);

												return (
													<div
														key={lesson?.finished ?? i}
														className="p-3 rounded-xl border bg-gray-50 text-sm"
													>
														<div className="font-medium">Урок от {dateStr}</div>
														{/* // С ПОДСЧЕТОМ ВРЕМЕНИ */}
														{/* <div className="text-xs text-gray-500">
															Решено: {solved} · Время:{' '}
															{Math.floor(duration / 60000)} мин.{' '}
															{Math.floor((duration % 60000) / 1000)} сек.
														</div> */}
														<div className="text-xs text-gray-500">
															Решено: {solved}
														</div>
														{entries.length > 0 ? (
															<div className="mt-2 space-y-1">
																{entries.map(([key, count]) => {
																	const section =
																		SECTIONS.find((s) => s.key === key) || null;
																	return (
																		<div
																			key={key}
																			className="flex justify-between text-xs text-gray-700"
																		>
																			<span>{section?.title || key}</span>
																			<span>{count as number}</span>
																		</div>
																	);
																})}
															</div>
														) : (
															<div className="mt-2 text-xs text-gray-400">
																Нет данных по разделам
															</div>
														)}
													</div>
												);
											})}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
