export function loadStateLocalStorage<T>( key: string): T | undefined {
	try {
		const jsonState = localStorage.getItem(key);
		if (!jsonState) {
			return undefined;
		}
		return JSON.parse(jsonState);
	} catch (e) {
		console.log(e)
		return undefined;
	}
}

export function saveStateLocalStorage<T>( state: T, key: string) {
	const stringState = JSON.stringify(state);
	localStorage.setItem(key, stringState);
}