# zeLinks

A modern, fast bookmark manager and personal directory for organizing tools, libraries, fonts, and AI services across different categories.

![zeLinks](https://img.shields.io/badge/zeLinks-Bookmark%20Manager-blue)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6)
![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3.0-38B2AC)

## Features

- **Categorized Organization**: Group bookmarks into categories with emoji support for visual distinction
- **Real-time Search**: Filter bookmarks instantly by title or URL
- **Responsive Design**: Mobile-first layout with sticky sidebar navigation on desktop
- **Modern UI**: Clean, minimalist interface built with Tailwind CSS
- **Fast Performance**: Built with Vite for optimal development and production builds
- **Type-Safe**: Full TypeScript implementation for reliability
- **Auto Favicons**: Automatically fetches website favicons using Google's favicon service

## Tech Stack

- **Frontend Framework**: React
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Linting**: ESLint with Prettier

## Project Structure

```
zelinks/
├── public/
│   └── favicon.png          # Application favicon
├── src/
│   ├── components/
│   │   └── Index.tsx        # Main bookmark display component
│   ├── data/
│   │   └── bookmarks.json  # Bookmark data store
│   ├── main.tsx             # Application entry point
│   └── styles.css           # Global styles
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── eslint.config.js         # ESLint configuration
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zelinks
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building

Build for production:

```bash
npm run build
```

The optimized build will be output to the `dist/` directory.

Preview the production build locally:

```bash
npm run preview
```

## Adding Bookmarks

Bookmarks are stored in `src/data/bookmarks.json`. The structure follows this format:

```json
[
  {
    "name": "🤖 Category Name",
    "subs": [
      {
        "name": "Subcategory Name (or null)",
        "links": [
          {
            "title": "Link Title",
            "url": "https://example.com"
          }
        ]
      }
    ]
  }
]
```

### Guidelines for Adding Bookmarks

1. **Categories**: Use emoji prefixes for visual categorization
2. **Subcategories**: Use `null` if no subcategory is needed
3. **URLs**: Include full URLs with `https://`
4. **Titles**: Use clear, descriptive titles

## Code Quality

Run linting:

```bash
npm run lint
```

Format code:

```bash
npm run format
```

## Customization

### Styling

Global styles and Tailwind configuration can be modified in:
- `src/styles.css` - Custom CSS variables and styles
- Tailwind CSS is configured via the Vite plugin

### Fonts

The application uses Google Fonts:
- **Inter**: Primary font family
- **Instrument Serif**: Display font for headings
- **JetBrains Mono**: Monospace font for code elements

Modify fonts in `index.html` or `src/styles.css` as needed.

## Deployment

### Static Hosting

This project builds to static files and can be deployed to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: Connect repository and deploy
- **GitHub Pages**: Use `gh-pages` branch
- **Cloudflare Pages**: Connect repository

### Build Configuration

The production build is optimized for:
- Minimal bundle size
- Fast initial load
- Efficient caching
- SEO-friendly structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
