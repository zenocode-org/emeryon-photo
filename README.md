# 📸 Astro Photo Portfolio Template

A modern, fast, and highly customizable photography portfolio template built with [Astro](https://astro.build).
Ideal for photographers who want to showcase their work through a sleek, performant, and professional website.

## ✨ Features

- Lightning-fast performance with Astro
- Fully responsive design
- Optimized image loading and handling
- Automatic image optimization and compression
- Easy to customize
- Easy to organized gallery via a yaml file
- Multiple albums support
- Image zoom capabilities
- Automatic deployment to GitHub pages
- Script to automatically create a gallery from images
- **Pages CMS integration** - Web-based interface for clients to upload and manage images

## 🚀 Getting Started

### Prerequisites

- Check [AstroJS](https://docs.astro.build/en/install-and-setup/) documentation for prerequisites
- Basic knowledge of Astro and web development

### Installation

1. click "Use this template" on GitHub
2. Clone your newly created template
3. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

## 📝 Make it your own

### Configuration

Edit the `astro.config.ts` file to update your github pages details:

```typescript
export default defineConfig({
  site: '<github pages domain>',
  base: '<repository name>',
  // ...
});
```

Edit the `site.config.mts` file to update your personal information:

```typescript
export default {
  title: 'SO',
  favicon: 'favicon.ico',
  owner: "Sarah O'conor",
  // ... Other configurations
};
```

### Customize site icon

Replace `public/favicon.ico` with your icon and change the configuration
if your file has a different name/location.

### Customize the About page

- Replace the profile image (see [site.config.mts](site.config.mts) for configuration)
- Edit content in [about page](./src/pages/about.astro)

### Adding Your Photos

1. Place your images in the `src/gallery/<album>` directory
2. Run `npm run generate` to automatically optimize images and generate the gallery.yaml file
3. Update meta-data for images in the `src/gallery/gallery.yaml` file if needed
4. Images are automatically optimized during build

#### Image Optimization

The gallery generator automatically optimizes your images to reduce file sizes for GitHub while maintaining preview quality. When you run `npm run generate`, the script will:

- **Resize images** to a maximum dimension (default: 1920px) while maintaining aspect ratio
- **Compress images** with configurable quality settings (default: 80%)
- **Preserve EXIF metadata** (camera settings, capture date, etc.)
- **Create timestamped backups** before processing (stored in `backup/` directory)

**Usage:**

```bash
# Use default settings (1920px max dimension, 80% quality)
npm run generate

# Customize max dimension and quality
npm run generate -- --max-dimension 2560 --quality 85

# Skip optimization (only generate gallery.yaml)
npm run generate -- --skip-optimization
```

**Options:**

- `--max-dimension <number>` - Maximum width or height in pixels (default: 1920)
- `--quality <number>` - JPEG/PNG quality 1-100 (default: 80)
- `--skip-optimization` - Skip image optimization, only generate gallery.yaml

**Backups:**

Original images are automatically backed up to `backup/<timestamp>/` before processing. Each run creates a new timestamped folder (e.g., `backup/2024-01-15_14-30-45/`), allowing you to track backups over time and restore originals if needed. The backup directory is automatically excluded from git via `.gitignore`.

### Adding photos to the featured section

"featured" is a builtin collection, and images can be added to it by specifying it in the collections parameter like any
other collection.

### Managing Photos with Pages CMS

This project is integrated with [Pages CMS](https://pagescms.org/), allowing clients to easily upload images and manage gallery metadata through a web interface.

#### Getting Started with Pages CMS

1. **Connect your repository**: Visit [Pages CMS](https://pagescms.org/) and connect your GitHub repository
2. **Select your branch**: Choose the branch where you want to manage content (typically `main`)
3. **Access the CMS**: Once connected, you'll see:
   - **Media Library**: Upload images to collection folders (`src/gallery/<collection>/`)
   - **Gallery Configuration**: Edit the `gallery.yaml` file to manage metadata

#### Uploading Images

1. Navigate to the **Media** section in Pages CMS
2. Browse to a collection folder (e.g., `nature`, `travel`, `street`) or navigate to `src/gallery/` to create a new collection folder
3. Upload your images directly to the folder
4. Commit your changes - images will be automatically processed

#### Editing Image Metadata

1. Navigate to **Gallery Configuration** in Pages CMS
2. Edit the `gallery.yaml` file to:
   - Update image titles and descriptions
   - Assign images to collections (including "featured")
   - Add custom fields like `filmType` and `analog` for analog photos
   - Manage collection names
3. Your edits are preserved when new images are added (via merge settings)

#### Automatic Processing

When you upload images through Pages CMS and commit:

1. **On commit**: GitHub Actions automatically detects image changes
2. **Image optimization**: Images are resized and compressed (max 1920px, 80% quality)
3. **Gallery generation**: The `gallery.yaml` file is automatically regenerated with:
   - New images added with auto-generated titles (from filename)
   - EXIF data extracted from images (camera settings, capture date, etc.)
   - Collections automatically created from folder structure
   - Images assigned to their collection folder
   - **Existing metadata preserved** (your manual edits are maintained)
4. **Site rebuild**: The site is automatically rebuilt and deployed

**Note**: The workflow uses `[skip ci]` in commit messages when updating `gallery.yaml` to prevent infinite loops. Your manual edits to `gallery.yaml` are preserved during regeneration thanks to the merge settings.

## 🛠️ Built With

- [Astro](https://astro.build) - The web framework for content-driven websites
- [TypeScript](https://www.typescriptlang.org/) - For type safety
- [TailwindCSS](https://tailwindcss.com) - For styling
- [Sharp](https://sharp.pixelplumbing.com/) - For image optimization
- [GLightbox](https://biati-digital.github.io/glightbox/) - Responsive lightbox gallery

## ⚙️ Provided GitHub actions

- [Build & Test](./.github/workflows/test.yml) - Ensure build integrity
- [Quality](./.github/workflows/quality.yml) - Run pre-commit checks
- [Deploy Astro Site](./.github/workflows/deploy.yml) - Publish to GitHub pages

## 📄 License

This project uses a dual licensing approach:

- **Source Code**: Licensed under the [MIT License](LICENSE). The code, scripts, and software components are open source and free to use, modify, and distribute.

- **Photographic Images**: All images in this repository (including files in `src/gallery/` and `public/images/`) are **NOT** covered by the MIT License and remain protected by copyright. See the [COPYRIGHT](COPYRIGHT) file for details.

In summary: Feel free to use and modify the code, but the photographs themselves are protected by copyright and require permission for use.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or an Issue.

## 💖 Support

If you find this template useful, please consider giving it a ⭐️ on GitHub!

## 📧 Contact

- [Linkedin](https://linkedin.com/company/zenocode)
- [GitHub](https://github.com/zenocode-org)
