import type { AstroInstance } from 'astro';
import { Github, Instagram } from 'lucide-astro';

export interface SocialLink {
	name: string;
	url: string;
	icon: AstroInstance;
}

export default {
	title: 'Emeryon',
	favicon: 'favicon.ico',
	owner: 'Axel Frau-Orsini',
	profileImage: 'profile.webp',
	socialLinks: [
		{
			name: 'Instagram',
			url: 'https://www.instagram.com/emeryon_photo',
			icon: Instagram,
		} as SocialLink,
	],
};
