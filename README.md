# Bid Template Generator

A React + TypeScript web application for generating bid text by combining job descriptions with pre-configured templates.

## Features

- **Templates Page**: View and manage bid templates
- **Generate Page**: Enter job descriptions and generate customized bid text
- **Local Storage**: All data is stored locally in the browser
- **Modern UI**: Clean and responsive design

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
  ├── pages/
  │   ├── TemplatesPage.tsx    # First page - displays templates
  │   └── GeneratePage.tsx      # Second page - generates bids
  ├── utils/
  │   └── storage.ts            # Local storage utilities
  ├── types.ts                  # TypeScript type definitions
  ├── App.tsx                   # Main app component with routing
  └── main.tsx                  # Entry point
```

## Usage

1. Navigate to the Templates page to view available bid templates
2. Go to the Generate page to:
   - Select a template from the dropdown
   - Enter a job description
   - Click "Generate Bid" to create the customized bid text
   - Copy the generated bid to your clipboard

## Technologies

- React 18
- TypeScript
- React Router DOM
- Vite
- Local Storage API

