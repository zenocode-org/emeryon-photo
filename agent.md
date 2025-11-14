# Photo Gallery Filtering System

## Components

- **`[...collection].astro`** - Main page orchestrating views and sidebar visibility
- **`PhotoGridSidebar.astro`** - Filter sidebar with filtering logic
- **`PhotoGrid.astro`** - Grid view component
- **`PhotosLarge.astro`** - Vertical/list view component

## Sidebar Visibility Logic

### Desktop (≥1024px)

- **Starts hidden** (`sidebarVisible = false`)
- **Grid view**: Automatically shows sidebar, main content `lg:col-span-3`
- **Vertical view**: Automatically hides sidebar, main content `lg:col-span-4`
- **Manual toggle**: Filter button can override view-based behavior

### Mobile (<1024px)

- **Starts hidden** (`sidebarVisible = false`)
- **All views**: Sidebar hidden by default, must be manually toggled
- Appears inline above photo grid when visible

## State Management

```typescript
let currentView: string = 'grid';
let sidebarVisible: boolean = false;

// Key functions
setupViewSwitcher(); // Initializes handlers
isMobile(); // Checks if < 1024px
updateSidebarVisibility(); // Updates DOM
switchView(view); // Grid/vertical switching
toggleFilters(); // Toggles sidebar
```

## Filtering

**Filter categories**: Collections, Years, Cameras, Lenses, Film Types, Analog/Digital

**Data attributes** on photo items:

- `data-collections`, `data-camera`, `data-lens`, `data-film`, `data-analog`, `data-capture-date`

**Filter logic**: All active filters use AND logic (must all match). Counts update dynamically based on other active filters.

## View Switching

- **Grid**: Responsive grid (`grid-cols-2 sm:grid-cols-3 md:grid-cols-4`), sidebar shows on desktop
- **Vertical**: Single column, sidebar hidden
- **Persistence**: Saved to `localStorage` as `'photo-view'`, default `'grid'`

## Event Handlers

- `#view-grid` / `#view-vertical` - View switching
- `#toggle-filters` - Sidebar visibility toggle
- `.filter-btn` - Apply/remove filters
- `#clear-filters` - Clear all filters
- Window resize (debounced 100ms) - Adjusts sidebar based on screen size

## Troubleshooting

**Sidebar not showing on desktop grid**: Check `sidebarVisible = true` in `switchView('grid')` and `updateSidebarVisibility()` is called.

**Filters not working**: Verify `setupSidebarFiltering()` runs and sidebar has `data-filtering-initialized` attribute.

**View not persisting**: Check `localStorage` availability and that `setItem`/`getItem` are called correctly.
