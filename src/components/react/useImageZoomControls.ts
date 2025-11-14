import useMetaThemeColor from './useMetaThemeColor';
import type { ComponentProps, RefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Viewer from 'viewerjs';
import ZoomControls from './ZoomControls';

export default function useImageZoomControls({
	refImageContainer,
	selectImageElement,
	isEnabled,
}: {
	refImageContainer: RefObject<HTMLElement | null>;
} & Omit<ComponentProps<typeof ZoomControls>, 'ref' | 'children'>) {
	const viewerRef = useRef<Viewer | null>(null);

	const refViewerContainer = useRef<HTMLDivElement>(null);

	const [zoomLevel, setZoomLevel] = useState(1);

	const [colorLight, setColorLight] = useState<string>();

	useMetaThemeColor({ colorLight });

	const open = useCallback(() => viewerRef.current?.show(), []);

	const close = useCallback(() => viewerRef.current?.hide(), []);

	const zoomTo = useCallback((zoomLevel = 1) => viewerRef.current?.zoomTo(zoomLevel), []);

	const reset = useCallback(() => {
		setZoomLevel(1);
		viewerRef.current?.reset();
	}, []);

	useEffect(() => {
		if (!isEnabled || !refImageContainer.current) {
			return;
		}

		let imageRef: HTMLImageElement | null = null;
		let cleanup: (() => void) | null = null;

		const initViewer = () => {
			// Don't reinitialize if already initialized
			if (viewerRef.current) {
				return;
			}

			imageRef = (selectImageElement?.(refImageContainer.current) ??
				refImageContainer.current?.querySelector('img')) as HTMLImageElement | null;

			if (!imageRef) {
				return;
			}

			const createViewer = () => {
				if (viewerRef.current) {
					return;
				}
				try {
					viewerRef.current = new Viewer(imageRef!, {
						navbar: false,
						title: false,
						toolbar: {
							zoomIn: 1,
							reset: 2,
							zoomOut: 3,
						},
						ready: ({ target }) => {
							refViewerContainer.current = (target as any).viewer.viewer as HTMLDivElement;
						},
						url: (image: HTMLImageElement) => {
							// Addresses Safari bug where images don't load
							image.loading = 'eager';
							return image.src;
						},
						show: () => {
							setColorLight('#000');
						},
						hide: () => {
							// Optimizes Safari status bar animation
							setTimeout(() => setColorLight(undefined), 300);
						},
						zoom: ({ detail: { ratio } }) => {
							setZoomLevel(ratio);
						},
					});
				} catch (error) {
					console.error('Failed to initialize ViewerJS:', error);
				}
			};

			// If image is already loaded or has a src, initialize ViewerJS immediately
			if (imageRef.complete || imageRef.src) {
				createViewer();
			} else {
				// Wait for image to load
				const handleLoad = () => {
					createViewer();
				};
				imageRef.addEventListener('load', handleLoad, { once: true });
				cleanup = () => {
					imageRef?.removeEventListener('load', handleLoad);
				};
			}
		};

		// Try to initialize immediately
		initViewer();

		// Also try after delays in case image loads asynchronously
		const timeoutIds: NodeJS.Timeout[] = [];
		[100, 500, 1000].forEach((delay) => {
			const timeoutId = setTimeout(() => {
				if (!viewerRef.current) {
					initViewer();
				}
			}, delay);
			timeoutIds.push(timeoutId);
		});

		return () => {
			timeoutIds.forEach(clearTimeout);
			cleanup?.();
			viewerRef.current?.destroy();
			viewerRef.current = null;
		};
	}, [isEnabled, refImageContainer, selectImageElement]);

	return {
		open,
		close,
		reset,
		zoomTo,
		zoomLevel,
		refViewerContainer,
	};
}
