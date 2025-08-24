import React, { useEffect, useState } from 'react';
import { ensureFirebaseAdapter } from './utils/firebase';
import { Duck } from './components/duck-maskot';
import { AuthForm } from './pages/auth-page';
import { UpgradeBar } from './components/upgrade-bar';
import { TheoryModal } from './components/theory-modal';
import { LearnerView } from './pages/learner-page';
import { TeacherDashboard } from './components/teacher-dashboard';
import { FinishLessonBar } from './components/finish-button';
import { ResultsView } from './components/results';
import { useAuth } from './components/auth';
import { useProgress } from './hooks/useProgress';
import { CATEGORIES } from './components/categories';
import { Adapter } from './components/adapter';

export default function App() {
	const [ready, setReady] = useState(true);
	const { user, login, logout } = useAuth(Adapter);
	const [level, setLevel] = useState('B1');
	const { progress, markSolved, duck } = useProgress(
		user || { name: 'anon' },
		Adapter
	);

	// lesson tracking
	const [lessonStart, setLessonStart] = useState(Date.now());
	const [lessonSolved, setLessonSolved] = useState(0);
	const [lessonDuration, setLessonDuration] = useState(0);
	const [showResults, setShowResults] = useState(false);

	// навигация по категориям и разделам
	const [categoryKey, setCategoryKey] = useState<string | null>(null);
	const [sectionKey, setSectionKey] = useState<string | null>(null);

	const [showTheory, setShowTheory] = useState(false);

	const currentCategory = CATEGORIES.find((c) => c.key === categoryKey);
	const currentSection = currentCategory?.sections.find(
		(s) => s.key === sectionKey
	);

	function startNewLesson() {
		setLessonStart(Date.now());
		setLessonSolved(0);
		setLessonDuration(0);
		setShowResults(false);
		setCategoryKey(null);
		setSectionKey(null);
	}

	useEffect(() => {
		ensureFirebaseAdapter().then(() => setReady(true));
	}, []);

	useEffect(() => {
		if (user) startNewLesson();
	}, [user?.name]);

	// Генерируем банк упражнений для Satzbau, для Partizip II просто оставляем пусто
	const [bank, setBank] = useState<{ [key: string]: any[] }>({});
	useEffect(() => {
		const map: { [key: string]: any[] } = {};
		for (const cat of CATEGORIES) {
			for (const s of cat.sections) {
				if ('gen' in s && typeof s.gen === 'function') {
					// Satzbau разделы
					map[s.key] = s.gen(110, level);
				} else if ('exercises' in s) {
					// Partizip II разделы
					map[s.key] = s.exercises;
				} else {
					map[s.key] = [];
				}
			}
		}
		setBank(map);
	}, [level]);

	const [index, setIndex] = useState(0);
	const exercises = currentSection ? bank[currentSection.key] || [] : [];
	const current = exercises.length ? exercises[index % exercises.length] : null;

	function next() {
		setIndex((i) => i + 1);
	}

	function solved(spent: number) {
		if (!currentSection) return;
		markSolved(currentSection.key, spent);
		setLessonSolved((n) => n + 1);

		if (user) {
			const sessionKey = `satzbau_session_${user.name}`;
			const sessionData = JSON.parse(localStorage.getItem(sessionKey) || '{}');
			sessionData[currentSection.key] =
				(sessionData[currentSection.key] || 0) + 1;
			localStorage.setItem(sessionKey, JSON.stringify(sessionData));
		}
	}

	const duckLevel = duck;

	function finishLesson() {
		const duration = Date.now() - lessonStart;
		setLessonDuration(duration);
		setShowResults(true);

		if (!user) return;

		const lessonsKey = `satzbau_lessons_${user.name}`;
		const sessionKey = `satzbau_session_${user.name}`;

		const safeParse = (key: string, fallback: any) => {
			try {
				const raw = localStorage.getItem(key);
				return raw ? JSON.parse(raw) : fallback;
			} catch {
				return fallback;
			}
		};

		const lessons = safeParse(lessonsKey, []);
		const bySectionRaw = safeParse(sessionKey, {});
		const bySection =
			bySectionRaw && typeof bySectionRaw === 'object' ? bySectionRaw : {};

		const newLesson = {
			solved: lessonSolved,
			duration,
			finished: Date.now(),
			bySection,
		};

		localStorage.setItem(lessonsKey, JSON.stringify([...lessons, newLesson]));
		localStorage.removeItem(sessionKey);
	}

	if (!ready) return <div className="max-w-sm mx-auto p-4">Загрузка…</div>;

	// 1. Экран входа
	if (!user) {
		return (
			<div className="max-w-sm mx-auto p-4 pb-24 bg-[#fdf5e6]">
				<div className="text-center">
					<Duck level={0} />
					<h1 className="text-2xl font-bold">Klein-Entlein</h1>
					<p className="text-sm text-gray-600 mt-1">
						Только мобильная версия. Выберите роль и войдите.
					</p>
				</div>
				<AuthForm onLogin={login} />
			</div>
		);
	}

	// 2. Экран результатов
	if (showResults) {
		return (
			<div className="p-4">
				<ResultsView
					solved={lessonSolved}
					ms={lessonDuration}
					duckLevel={duckLevel}
					onRestart={startNewLesson}
					onLogout={logout}
				/>
			</div>
		);
	}

	// 3. Экран учителя
	if (user.role === 'teacher') {
		return (
			<div className="p-4">
				<div className="flex justify-between items-center">
					<h1 className="text-xl font-semibold">Журнал успеваемости</h1>
					<button onClick={logout} className="text-xs text-gray-500">
						Выйти
					</button>
				</div>
				<div className="mt-2 flex justify-center">
					<img
						src={require('./images/duck-3lv.png')}
						alt="Уточка"
						className="w-45 h-45 object-contain"
					/>
				</div>
				<TeacherDashboard />
			</div>
		);
	}

	// 4. Экран ученика
	return (
		<div className="max-w-sm mx-auto p-4 pb-24 bg-[#fdf5e6]">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<div className="text-xs text-gray-500">
						Привет, {user.name} (ученик)
					</div>
					<h1 className="text-xl font-semibold">Duck-Trainer</h1>
				</div>
				<button onClick={logout} className="text-xs text-gray-500">
					Выйти
				</button>
			</div>

			{/* Duck + Stats */}
			<div className="mt-2">
				<Duck level={duckLevel} />
				<div className="text-center text-xs text-gray-600">
					Решено всего: {lessonSolved} · Уровень уточки: {duckLevel}
				</div>
				<UpgradeBar total={duckLevel} />
			</div>

			{/* Категории → Разделы → Упражнения */}
			{!categoryKey ? (
				<div className="grid gap-3 mt-4">
					<h2 className="text-lg font-semibold">Выберите категорию</h2>
					{CATEGORIES.map((cat) => (
						<button
							key={cat.key}
							onClick={() => setCategoryKey(cat.key)}
							className="p-4 rounded-xl bg-white shadow text-lg font-medium"
						>
							{cat.title}
						</button>
					))}
				</div>
			) : !sectionKey ? (
				<div className="grid gap-3 mt-4">
					<button
						onClick={() => setCategoryKey(null)}
						className="px-4 py-2 rounded-xl text-sm font-medium active:scale-95 border w-full"
					>
						← Назад к категориям
					</button>
					<h2 className="text-lg font-semibold">
						Разделы: {currentCategory?.title}
					</h2>
					{currentCategory?.sections.map((sec) => (
						<button
							key={sec.key}
							onClick={() => setSectionKey(sec.key)}
							className="p-4 rounded-xl bg-white shadow text-lg font-medium"
						>
							{sec.title}
						</button>
					))}
				</div>
			) : (
				<LearnerView
					sectionKey={sectionKey}
					setSectionKey={setSectionKey}
					currentSection={currentSection}
					current={current}
					onSolved={solved}
					next={next}
					progress={progress}
					showTheory={showTheory}
					setShowTheory={setShowTheory}
					requestHint={() => true}
				/>
			)}

			{/* Bottom: Закончить урок */}
			{user.role !== 'teacher' && <FinishLessonBar onFinish={finishLesson} />}

			{/* Теория */}
			<TheoryModal
				open={showTheory}
				sectionKey={sectionKey}
				onStart={() => setShowTheory(false)}
				onClose={() => setShowTheory(false)}
			/>
		</div>
	);
}
