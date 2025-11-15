import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://zenocode-org.github.io/photo-portfolio',
	base: '/',
	integrations: [react()],
	vite: {
		plugins: [tailwindcss()],
	},
});
