import path from 'path';
import type { GalleryImage, ImageExif } from './galleryData.ts';
import exifr from 'exifr';

/**
 * Checks if a value is a valid number (not NaN, Infinity, null, or undefined)
 */
function isValidNumber(value: unknown): value is number {
	return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * Filters out invalid values (NaN, Infinity, undefined, null) from EXIF data
 */
function cleanExifData(exif: Partial<ImageExif>): Partial<ImageExif> {
	const cleaned: Partial<ImageExif> = {};

	for (const [key, value] of Object.entries(exif)) {
		// Skip undefined and null values
		if (value === undefined || value === null) {
			continue;
		}

		// For numbers, check if they're valid (not NaN or Infinity)
		if (typeof value === 'number') {
			if (isValidNumber(value)) {
				cleaned[key as keyof ImageExif] = value;
			}
			// Skip NaN and Infinity values
			continue;
		}

		// Keep other valid types (strings, dates, etc.)
		cleaned[key as keyof ImageExif] = value;
	}

	return cleaned;
}

export const createGalleryImage = async (
	galleryDir: string,
	file: string,
): Promise<GalleryImage> => {
	const relativePath = path.relative(galleryDir, file);
	const exifData = await exifr.parse(file);
	const image = {
		path: relativePath,
		meta: {
			title: toReadableCaption(path.basename(relativePath, path.extname(relativePath))),
			description: '',
			collections: collectionIdForImage(relativePath),
		},
		exif: {},
	};
	if (exifData) {
		// Calculate shutterSpeed safely, only if ExposureTime is valid
		let shutterSpeed: number | undefined = undefined;
		if (isValidNumber(exifData.ExposureTime) && exifData.ExposureTime > 0) {
			shutterSpeed = 1 / exifData.ExposureTime;
			// Double-check the result is valid
			if (!isValidNumber(shutterSpeed)) {
				shutterSpeed = undefined;
			}
		}

		const rawExif = {
			captureDate: exifData.DateTimeOriginal
				? new Date(`${exifData.DateTimeOriginal} UTC`)
				: undefined,
			fNumber: exifData.FNumber,
			focalLength: exifData.FocalLength,
			iso: exifData.ISO,
			model: exifData.Model,
			shutterSpeed,
			lensModel: exifData.LensModel,
		};

		// Clean the EXIF data to remove any invalid values
		image.exif = cleanExifData(rawExif);
	}
	return image;
};

function toReadableCaption(input: string): string {
	return input
		.replace(/[^a-zA-Z0-9]+/g, ' ') // Replace non-alphanumerics with space
		.split(' ') // Split by space
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize
		.join(' ');
}

function collectionIdForImage(relativePath: string) {
	return path.dirname(relativePath) === '.' ? [] : [path.dirname(relativePath)];
}

export const createGalleryCollection = (dir: string) => {
	return {
		id: dir,
		name: toReadableCaption(dir),
	};
};
