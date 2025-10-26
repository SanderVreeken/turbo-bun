export const load = async ({ fetch }) => {
	const response = await fetch('/api/todos');

	const todos = await response.json();

	return { todos };
};
