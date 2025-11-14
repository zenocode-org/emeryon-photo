import GLightbox from 'glightbox';

export function setupPhotoGallery() {
	if (typeof document === 'undefined') return;

	// Initialize GLightbox
	const lightbox = GLightbox({
		selector: '.glightbox',
		openEffect: 'zoom',
		closeEffect: 'fade',
		width: 'auto',
		height: 'auto',
	});

	// View switcher
	const gridViewBtn = document.getElementById('view-grid');
	const verticalViewBtn = document.getElementById('view-vertical');
	const gridContainer = document.getElementById('photo-grid-container');
	const verticalContainer = document.getElementById('photo-vertical-container');

	function switchView(view: string) {
		if (view === 'grid') {
			gridContainer?.classList.remove('hidden');
			verticalContainer?.classList.add('hidden');
			gridViewBtn?.classList.add('active');
			verticalViewBtn?.classList.remove('active');
			localStorage.setItem('photo-view', 'grid');
		} else {
			gridContainer?.classList.add('hidden');
			verticalContainer?.classList.remove('hidden');
			gridViewBtn?.classList.remove('active');
			verticalViewBtn?.classList.add('active');
			localStorage.setItem('photo-view', 'vertical');
		}
	}

	gridViewBtn?.addEventListener('click', () => switchView('grid'));
	verticalViewBtn?.addEventListener('click', () => switchView('vertical'));

	// Restore saved view preference
	const savedView = localStorage.getItem('photo-view') || 'grid';
	switchView(savedView);

	// Filter functionality
	const filterSelects = document.querySelectorAll('.filter-select');
	const photoItems = document.querySelectorAll('.photo-item, .photo-item-vertical');

	function applyFilters() {
		const cameraFilter = document.getElementById('filter-camera') as HTMLSelectElement | null;
		const lensFilter = document.getElementById('filter-lens') as HTMLSelectElement | null;
		const focalFilter = document.getElementById('filter-focal') as HTMLSelectElement | null;
		const isoFilter = document.getElementById('filter-iso') as HTMLSelectElement | null;
		const apertureFilter = document.getElementById('filter-aperture') as HTMLSelectElement | null;
		const filmFilter = document.getElementById('filter-film') as HTMLSelectElement | null;
		const analogFilter = document.getElementById('filter-analog') as HTMLSelectElement | null;

		const filters = {
			camera: cameraFilter?.value || '',
			lens: lensFilter?.value || '',
			focal: focalFilter?.value || '',
			iso: isoFilter?.value || '',
			aperture: apertureFilter?.value || '',
			film: filmFilter?.value || '',
			analog: analogFilter?.value || '',
		};

		photoItems.forEach((item) => {
			const element = item as HTMLElement;
			const matches =
				(!filters.camera || element.dataset.camera === filters.camera) &&
				(!filters.lens || element.dataset.lens === filters.lens) &&
				(!filters.focal || element.dataset.focal === filters.focal) &&
				(!filters.iso || element.dataset.iso === filters.iso) &&
				(!filters.aperture || element.dataset.aperture === filters.aperture) &&
				(!filters.film || element.dataset.film === filters.film) &&
				(!filters.analog || element.dataset.analog === filters.analog);
			if (matches) {
				element.style.display = '';
			} else {
				element.style.display = 'none';
			}
		});
	}

	filterSelects.forEach((select) => {
		select.addEventListener('change', applyFilters);
	});
}

// Run setupPhotoGallery once the page is loaded
if (typeof window !== 'undefined') {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', setupPhotoGallery);
	} else {
		setupPhotoGallery();
	}
}
