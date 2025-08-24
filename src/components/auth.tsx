import { useEffect, useState } from 'react';

export function useAuth(Adapter) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		(async () => setUser(await Adapter.getUser()))();
	}, []);

	async function login(name, role) {
		// ✅ Разрешаем роль teacher только для пользователя "Татиро"
		let finalRole = role;
		if (role === 'teacher' && name.trim().toLowerCase() !== 'татиро') {
			finalRole = 'student';
		}

		const u = { name, role: finalRole };
		setUser(u);
		await Adapter.saveUser(u);
	}

	async function logout() {
		setUser(null);
		await Adapter.remove('satzbau_user');
	}

	return { user, login, logout };
}
