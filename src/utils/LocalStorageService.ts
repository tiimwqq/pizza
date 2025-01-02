export const LocalStorageService = {
	get(key: string) {
		const data = window.localStorage.getItem(key);
		return data ? JSON.parse(data) : null;
	},
	set(key: string, value: any) {
		window.localStorage.setItem(key, JSON.stringify(value));
	},
	remove(key: string) {
		window.localStorage.removeItem(key);
	},
};
