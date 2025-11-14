import { RiCameraLine, RiCameraLensFill, RiFolderLine, RiCloseLine } from 'react-icons/ri';
import PhotoPreview from './PhotoPreview';
import type { Image as ImageType } from '../../data/galleryData';

interface PhotoVerticalViewProps {
	image: ImageType;
	onClose?: () => void;
}

export default function PhotoVerticalView({ image, onClose }: PhotoVerticalViewProps) {
	return (
		<article
			className="photo-large-item photo-item-vertical border-b border-gray-200 pb-12 mb-12"
			data-collections={JSON.stringify(image.collections)}
			data-camera={image.exif?.model || ''}
			data-lens={image.exif?.lensModel || ''}
			data-focal={image.exif?.focalLength?.toString() || ''}
			data-iso={image.exif?.iso?.toString() || ''}
			data-aperture={image.exif?.fNumber?.toString() || ''}
			data-capture-date={image.exif?.captureDate?.toISOString() || ''}
			data-film={image.filmType || ''}
			data-analog={typeof image.analog === 'boolean' ? (image.analog ? 'yes' : 'no') : ''}
		>
			{/* Back to Gallery Button */}
			{onClose && (
				<div className="mb-8">
					<button
						type="button"
						aria-label="Fermer"
						className="inline-flex items-center justify-center rounded p-2 text-black hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
						onClick={onClose}
					>
						<RiCloseLine size={20} />
					</button>
				</div>
			)}

			<div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
				{/* Photo */}
				<div className="lg:col-span-3">
					<div className="flex items-center justify-center lg:min-h-[50vh]">
						<PhotoPreview
							imageSrc={image.src.src}
							imageAlt={image.title}
							imageWidth={image.src.width}
							imageHeight={image.src.height}
							className="max-w-full max-h-[85vh] object-contain"
							isEnabled={true}
							imageTitle={image.title}
						/>
					</div>
				</div>

				{/* Metadata */}
				<aside className="lg:col-span-2">
					<div>
						<div>
							<h2 className="text-2xl font-bold mb-2">
								<a
									href={`/photo/${encodeURIComponent(image.title)}`}
									className="text-black hover:text-gray-600 transition-colors"
								>
									{image.title}
								</a>
							</h2>
							{image.description && (
								<p className="text-gray-600 leading-relaxed">{image.description}</p>
							)}
						</div>

						{image.exif && (
							<div className="space-y-4">
								{image.exif.model && (
									<div className="flex items-center gap-3">
										<RiCameraLine size={20} className="text-gray-400 flex-shrink-0" />
										<div className="font-medium text-gray-900">{image.exif.model}</div>
									</div>
								)}
								{image.exif.lensModel && (
									<div className="flex items-center gap-3">
										<RiCameraLensFill size={20} className="text-gray-400 flex-shrink-0" />
										<div className="font-medium text-gray-900">{image.exif.lensModel}</div>
									</div>
								)}
								<div className="grid pt-2">
									{image.filmType && (
										<div className="font-medium text-gray-900">{image.filmType}</div>
									)}
									{typeof image.analog === 'boolean' && (
										<div className="font-medium text-gray-900">
											{image.analog ? 'Argentique' : 'Numérique'}
										</div>
									)}
									{image.exif.focalLength && (
										<div className="font-medium text-gray-900">{image.exif.focalLength}mm</div>
									)}
									{image.exif.fNumber && (
										<div className="font-medium text-gray-900">f/{image.exif.fNumber}</div>
									)}
									{image.exif.iso && (
										<div className="font-medium text-gray-900">ISO {image.exif.iso}</div>
									)}
									{image.exif.shutterSpeed && (
										<div className="font-medium text-gray-900">1/{image.exif.shutterSpeed}s</div>
									)}
								</div>
							</div>
						)}

						{image.collections && image.collections.length > 0 && (
							<div className="pt-2">
								<div className="flex items-start gap-3">
									<RiFolderLine size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
									<div className="flex-1">
										<div className="flex flex-wrap gap-2">
											{image.collections.map((collectionId) => (
												<span
													key={collectionId}
													className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
												>
													{collectionId}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</aside>
			</div>
		</article>
	);
}
