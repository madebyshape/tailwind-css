# Tailwind CSS

This is a boilerplate we use internally for projects. It utilises the Tailwind CSS framework, to enable rapid development using utility / helper classes, with a mixture of BEM.

## Contents

- [Installing](#installing)
- [Compiling](#compiling)
- [Framework](#framework)
- [Colours](#colours)
- [CSS Blocks](#css-blocks)
- [CSS Components](#css-components)
- [CSS Helpers](#css-helpers)
- [CSS Utilities](#css-utilities)
- [JS Components](#js-components)
- [JS Naming](#js-naming)
- [Favicons](#favicons)

### Installing

### Compiling

Use Gulp to run tasks within the project. See the `gulpfile.js` file for a list of available individual tasks. The build tasks are:

- `gulp dev`
- `gulp production`

All Gulp settings are stored in the `package.json` file, e.g. If you need to change the public folder from `web/` then edit `paths > public` in this file.

All assets should be placed in the root folder `assets`, seperated in to subfolders (E.g. `scss`, `js` etc). Use the `web/dist` folder to store any public files.

Any files placed inside `assets` will be compiled, minified and optimised and then moved to the `dist` folder.

NOTE: Never place files directly into the `web/dist` folder, as these can be overwritten sometimes via build commands.

### Framework

We use Tailwind CSS (https://tailwindcss.com) as the core framework - Read the docs to use this framework https://tailwindcss.com/docs

Edit the `tailwind.config.js` whenever you need to modify / add new CSS utility classes.

Use the `@apply` in custom CSS components where possible.

For a grid, use Flex box mixed with width utilities as specified in the Tailwind CSS docs (https://tailwindcss.com/components/grids)

### Colours

Although we're English, use the word `color` where possible (Over `colour`).

All brand colours are specified using `primary`, `secondary` etc hierarchy. `500` is the base colour, with numbers lower (E.g. `300`) being lighter colours, and numbers (E.g. `800`) higher being darker colours.

### CSS Blocks

Use BEM (http://getbem.com) style of naming when creating bespoke blocks But try to use `@apply` where possible to use existing CSS rules generated by Tailwind.

Example:

```
.card
.card__content
.card__content--large
```

### CSS Components

Components are set styles that are used for repeat elements throughout a project. They are created in separate component files in `assets/scss/components`. Try to avoid creating components where possible and use utility classes;

Name | Base Class | File | Description
--- | --- | --- | ---
Button | `.button` | `button.scss` | Applies bases styles for buttons such as hovers and transition.
Form | `.form` | `form.scss` | Applies base styles for form elements (Fields, Labels etc)
Section | `.section` | `section.scss` | Used to limit the max width of a site, and adds a site gutter.

### CSS Helpers

Helpers are usually SCSS mixins or functions that can be used within components or blocks. They are created in separate helper files in `assets/scss/helpers`. If a new helper is created, or a helper is modified for a project consider submitting as a pull request to be used in future projects.

Name | Property | File | Description
--- | --- | --- | ---
Font Face | `font-face($family, $filename, $weight, $style)` | `font-face.scss` | Allows use of custom fonts within CSS. Ideally place this within `base.scss` when being used.
Hover | `hover()` | `hover.scss` | Used to detect if a browser supports `:hover`
REM | `rem($size)` | `rem.scss` | Converts pixels (px) to REM values

### CSS Utilities

Utilities are extra classes that can be used alongside Tailwind CSS to enable functionality not yet enabled within this framework. As they run off Tailwind these can also be used responsively e.g. `.aspect-ratio-4/3 .sm:aspect-ratio-1/1`

Name | Classes | File | Description
--- | --- | --- | ---
Aspect Ratio | `.aspect-ratio-1/1` `.aspect-ratio-3/2` `.aspect-ratio-4/3` `.aspect-ratio-16/9` | `aspect-ratio.scss` | Adds padding to the top of an element to allow for aspect ratio of images etc. Use with an child element with `.absolute` applied.
Transition | `.transition` `.transition-property` `.transition-property-none` `.transition-property-color` `.transition-property-background` `.transition-property-opacity` `.transition-property-shadow` `.transition-property-transform` `.transition-duration` `.transition-duration-100 to .transition-duration-1000 (In steps of 100)` `.transition-easing` `.transition-easing-in` `.transition-easing-out` `.transition-easing-in-out` `.transition-easing-linear` | `transition.scss` | Adds transition properties

### JS Components

@TODO

### JS Naming

@TODO

### Favicons

Place a file named `favicon.png` in `assets/images` to generate a favicon. Running `gulp favicon` will generate this and put the appropriate files in the `dist/images` folder. Use `gulp images` to optimise these files.

## Roadmap

- Descriptions in docs / files
- Errors in gulp
