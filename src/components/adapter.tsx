export const Adapter = {
	async getUser() {
		const raw = localStorage.getItem('satzbau_user');
		return raw ? JSON.parse(raw) : null;
	},
	async saveUser(user) {
		localStorage.setItem('satzbau_user', JSON.stringify(user));
	},
	async remove(key) {
		localStorage.removeItem(key);
	},
	async get(key, fallback) {
		const raw = localStorage.getItem(key);
		return raw ? JSON.parse(raw) : fallback;
	},
	async set(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	},
};
