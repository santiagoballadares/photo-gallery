# Optimized Virtualized Masonry Grid with Detailed Photo View

Simple responsive masonry grid built with React

## Setup

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (v18.20.8 or greater)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/santiagoballadares/photo-gallery.git
    cd photo-gallery
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

### API Key Setup

This project requires an API key for [pexels API](https://www.pexels.com/api/documentation).

1.  Duplicate the `.env.sample` file and rename it as `.env` (or create a `.env` file) in the root directory of the project.
2.  Add your API key to this file in the following format:

    ```
    VITE_PEXELS_API_KEY=[Your_Actual_API_Key_Here]
    ```

## Running the Project

To start the development server:

```bash
npm run dev
```

## Linting

```bash
npm run check
npm run check:eslint
npm run check:prettier

npm run fix
npm run fix:eslint
npm run fix:prettier
```

## Testing

```bash
npm run test
```

## Building for Production

```bash
npm run build
```

## Technical Discussion

The project containes 3 main components PhotosGrid, PhotoGridItem, and PhotoDetails. There are other components for error display, loading, and not found page.

#### Masonry Grid

The masony layout is implemented by placing grid items with absolute positions in relation the the grid container for easier virtualization.

#### Virtualization

The viewport height and the current scroll position are used to determinate which grid items are visible. So, only visible photos are rendered.

#####

React hooks:

- useEffect to execute side effects like fetching data from the API.
- useCallback is used to memoize functions that are potentially expensive like calculateLayout.
- useMemo is used to memoize the result of some calculations like columnCount.

In addition, debouncing techniques are used to handle scroll and resize events as well as fetch photos with the search input value.

#### Various

React router is used for navigation and to load initial data for both components: PhotosGrid and PhotoDetails. This way we avoid waterfall performance issues.

A singleton ApiService class encapsulates the pexels client api library [pexels-javascript](https://github.com/pexels/pexels-javascript).

PhotoGridItem renders a loading placeholder to enhance the UI.

#### TODO

The pexels API payload includes several URLs to get the image with different dimensions. An improvement would be to choose the most relevant URL based on screen size and device.

## Purpose / Disclaimer

This repository is **Not intended for public distribution or general use**. All rights to the code remain with the author unless otherwise specified by prior agreement or company policy.
