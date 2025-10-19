/**
 * Extracts initials from a full name for display in avatars.
 * Takes the first character of the first word and the first character of the last word.
 *
 * @param fullName - The full name to extract initials from
 * @param fallback - The fallback character to return if no valid initials can be extracted
 * @returns The extracted initials in uppercase, or the fallback character
 *
 * @example
 * ```ts
 * getAvatarInitials('John Doe') // 'JD'
 * getAvatarInitials('John') // 'J'
 * getAvatarInitials('') // '?'
 * getAvatarInitials(undefined, 'X') // 'X'
 * ```
 */
export function getAvatarInitials(fullName?: string, fallback = '?'): string {
	if (!fullName) return fallback;
	const parts = fullName.trim().split(/\s+/);
	const initials =
		(parts[0]?.[0] ?? '') + (parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '');
	return initials.toUpperCase() || fallback;
}
