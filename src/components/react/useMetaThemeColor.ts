import { useEffect } from 'react';

export default function useMetaThemeColor({
	colorLight,
	colorDark,
}: {
	colorLight?: string;
	colorDark?: string;
}) {
	useEffect(() => {
		// Simple implementation without theme detection - just use light color
		const preferredThemeColor = colorLight || colorDark;

		if (preferredThemeColor) {
			// Temporarily create meta tag for overlays,
			// which prevents stale headers on theme changes
			const meta = document.createElement('meta');
			meta.name = 'theme-color';
			meta.content = preferredThemeColor;
			document.getElementsByTagName('head')[0]?.appendChild(meta);
			return () => meta.remove();
		}
	}, [colorLight, colorDark]);
}
