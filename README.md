# Tailwind

This is a boilerplate we use internally for projects. It utilises the Tailwind CSS framework, to enable rapid development using utility / helper classes, with a mixture of BEM.

## Contents

- Installing
- Compiling
- Framework
- Colours
- CSS Blocks
- CSS Components
- CSS Mixins
- CSS Utilities
- CSS Naming
- JS Components
- JS Naming
- Favicons

### Installing

### Compiling

Use Gulp to run tasks within the project. See the `gulpfile.js` file for a list of available individual tasks. The build tasks are:

- `gulp dev`
- `gulp production`

All Gulp settings are stored in the `package.json` file, e.g. If you need to change the public folder from `web/` then edit `paths > public` in this file.

All assets should be placed in the root folder `assets`, seperated in to subfolders (E.g. `scss`, `js` etc). Use the `web > dist` folder to store any public files.

Any files placed inside `assets` will be compiled, minified and optimised and then moved to the `dist` folder.

### Framework

We use Tailwind CSS (https://tailwindcss.com) as the core framework - Read the docs to use this framework https://tailwindcss.com/docs

Edit the `tailwind.config.js` whenever you need to modify / add new CSS utility classes.

Use the `@apply` in custom CSS components where possible.

### Colours

Although we're English, use the word `color` where possible (Over `colour`).

All brand colours are specified using `primary`, `secondary` etc hierarchy. `500` is the base colour, with numbers lower (E.g. `300`) being lighter colours, and numbers (E.g. `800`) higher being darker colours.

### CSS Blocks

### CSS Components

### CSS Mixins

### CSS Naming

### JS Components

### JS Naming

### Favicons

## Roadmap

- Descriptions in docs / files
- Errors in gulp
