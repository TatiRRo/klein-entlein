import React, { useState } from 'react';

export function AuthForm({ onLogin }) {
	const [role, setRole] = useState<'student' | 'teacher'>('student');
	const [name, setName] = useState('');
	const [error, setError] = useState('');

	function handleLogin() {
		// Сбрасываем ошибку
		setError('');

		// Проверка: если выбрана роль учителя, а имя не Татиро
		if (role === 'teacher' && name.trim().toLowerCase() !== 'татиро') {
			setError('Вход только для учителя');
			return;
		}

		onLogin(name.trim(), role);
	}

	return (
		<div className="mt-6 space-y-3">
			{/* Переключатель ролей */}
			<div className="grid grid-cols-2 gap-2">
				<button
					onClick={() => setRole('student')}
					className={`p-3 rounded-2xl border ${
						role === 'student'
							? 'bg-emerald-50 border-emerald-300'
							: 'bg-white border-gray-200'
					}`}
				>
					Ученик
				</button>
				<button
					onClick={() => setRole('teacher')}
					className={`p-3 rounded-2xl border ${
						role === 'teacher'
							? 'bg-emerald-50 border-emerald-300'
							: 'bg-white border-gray-200'
					}`}
				>
					Учитель
				</button>
			</div>

			{/* Поле для имени */}
			<input
				value={name}
				onChange={(e) => setName(e.target.value.trimStart())}
				placeholder="Имя пользователя"
				className="w-full p-3 rounded-2xl border border-gray-200"
			/>

			{/* Ошибка */}
			{error && <div className="text-red-600 text-sm">{error}</div>}

			{/* Кнопка входа */}
			<button
				disabled={!name}
				onClick={handleLogin}
				className="w-full p-3 rounded-2xl bg-black text-white disabled:opacity-40"
			>
				Войти
			</button>
		</div>
	);
}
