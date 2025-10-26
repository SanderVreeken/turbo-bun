export const load = async ({ fetch }) => {
	const response = await fetch('/api/tasks');

	const tasks = await response.json();

	return { tasks };
};
