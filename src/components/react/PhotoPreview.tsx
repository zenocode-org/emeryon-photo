import { useRef } from 'react';
import ZoomControls, { type ZoomControlsRef } from './ZoomControls';

interface PhotoPreviewProps {
	imageSrc: string;
	imageAlt: string;
	imageWidth?: number;
	imageHeight?: number;
	className?: string;
	classNameImage?: string;
	isEnabled?: boolean;
	imageTitle?: string;
}

export default function PhotoPreview({
	imageSrc,
	imageAlt,
	imageWidth,
	imageHeight,
	className = '',
	classNameImage = '',
	isEnabled = true,
	imageTitle,
}: PhotoPreviewProps) {
	const refZoomControls = useRef<ZoomControlsRef>(null);

	const selectZoomImageElement = (container: HTMLElement | null) => {
		return container?.querySelector('img') as HTMLImageElement | null;
	};

	return (
		<ZoomControls
			ref={refZoomControls}
			selectImageElement={selectZoomImageElement}
			isEnabled={isEnabled}
			imageTitle={imageTitle}
		>
			<img
				src={imageSrc}
				alt={imageAlt}
				width={imageWidth}
				height={imageHeight}
				className={classNameImage || className}
			/>
		</ZoomControls>
	);
}
