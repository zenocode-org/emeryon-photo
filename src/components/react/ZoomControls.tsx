import clsx from 'clsx';
import type { ReactNode, RefObject } from 'react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import useImageZoomControls from './useImageZoomControls';
import {
	RiCollapseDiagonalLine,
	RiExpandDiagonalLine,
	RiExternalLinkLine,
	RiCloseLine,
} from 'react-icons/ri';

export interface ZoomControlsRef {
	open: () => void;
	zoomTo: (zoomLevel?: number) => void;
}

export default function ZoomControls({
	ref,
	children,
	...props
}: {
	ref?: RefObject<ZoomControlsRef | null>;
	children: ReactNode;
	selectImageElement?: (container: HTMLElement | null) => HTMLImageElement | null;
	isEnabled?: boolean;
	imageTitle?: string;
}) {
	const refImageContainer = useRef<HTMLDivElement>(null);

	const { open, close, reset, zoomTo, zoomLevel, refViewerContainer } = useImageZoomControls({
		refImageContainer,
		...props,
	});

	useEffect(() => {
		if (ref) {
			ref.current = { open, zoomTo };
		}
	}, [ref, open, zoomTo]);

	const shouldZoomTo2x = zoomLevel !== 2;

	const imagePageUrl = props.imageTitle
		? `/photo/photo/${encodeURIComponent(props.imageTitle)}`
		: null;

	const buttonClass = clsx(
		'size-10 flex items-center justify-center',
		'rounded-full border-none',
		'text-white bg-black/50 hover:bg-black/85',
		'transition-colors',
	);

	const zoomButton = (
		<button
			type="button"
			className={buttonClass}
			onClick={() => (shouldZoomTo2x ? zoomTo(2) : reset())}
			title={shouldZoomTo2x ? 'Zoom in' : 'Reset zoom'}
		>
			{shouldZoomTo2x ? (
				<RiCollapseDiagonalLine className="shrink-0" size={20} />
			) : (
				<RiExpandDiagonalLine className="shrink-0" size={20} />
			)}
		</button>
	);

	const linkButton = imagePageUrl ? (
		<a href={imagePageUrl} className={clsx(buttonClass, 'no-underline')} title="View image page">
			<RiExternalLinkLine className="shrink-0" size={20} />
		</a>
	) : null;

	const closeButton = (
		<button type="button" className={buttonClass} onClick={close} title="Close">
			<RiCloseLine className="shrink-0" size={20} />
		</button>
	);

	const buttonContainer = (
		<div className="fixed bottom-[20px] right-[20px] flex flex-col gap-3 z-50">
			{linkButton}
			{zoomButton}
			{closeButton}
		</div>
	);

	return (
		<div
			ref={refImageContainer}
			className={clsx('h-full', props.isEnabled && 'cursor-zoom-in')}
			onClick={props.isEnabled ? open : undefined}
		>
			{children}
			{refViewerContainer.current
				? createPortal(buttonContainer, refViewerContainer.current)
				: null}
		</div>
	);
}
