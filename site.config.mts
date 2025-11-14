import type { AstroInstance } from 'astro';
import { Github, Instagram } from 'lucide-astro';

export interface SocialLink {
	name: string;
	url: string;
	icon: AstroInstance;
}

export default {
	title: 'A Photographer',
	favicon: 'favicon.ico',
	owner: 'A photographer',
	profileImage: 'profile.webp',
	socialLinks: [
		{
			name: 'GitHub',
			url: 'https://github.com/zenocode-org/photo-portfolio',
			icon: Github,
		} as SocialLink,
		{
			name: 'Instagram',
			url: 'https://www.instagram.com/',
			icon: Instagram,
		} as SocialLink,
	],
};
