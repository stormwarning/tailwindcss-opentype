---
layout: page
title: Alternates
description: Utilities for controlling the usage of alternate glyphs.
tags: OpenType features
eleventyNavigation:
  key: Alternates
  order: 3
classData: ot-alternates
---

## Usage

These utilities provide access to OpenType alternate glyph features not currently available via the higher-level CSS properties. For other alternate glyph features, use the [Font Variant Alternates](/font-variant-alternates) utilities.

### Stylistic alternates :feat[salt]

Sometimes a significant portion of a typeface’s unique character comes from a few specific glyphs. Stylistic Alternates offer an opportunity to change these, and change the tone of the typeface.

```html /salt/
<template preview>
	<p class="font-exo text-4xl opacity-70">Easy like Sunday morning & fox</p>
	<p class="font-exo salt text-4xl">
		E<mark>a</mark>sy like S<mark>unda</mark>y
		<mark>m</mark>o<mark>rn</mark>i<mark>ng</mark> <mark>&</mark>
		<mark>f</mark>o<mark>x</mark>
	</p>
</template>

<p class="salt">Easy like Sunday morning & fox</p>
```

### Stylistic sets :feat[ss01–ss20]

This feature replaces sets of default character glyphs with stylistic variants. Glyphs in stylistic sets may be designed to harmonise visually, interact in particular ways, or otherwise work together.

```html /ss-02/
<template preview>
	<p class="font-sans font-semibold text-4xl opacity-70">Illegal</p>
	<p class="font-sans font-semibold ss-02 text-4xl">
		<mark>Ill</mark>ega<mark>l</mark>
	</p>
</template>

<p class="ss-02">Illegal</p>
```

Note that fonts may employ stylistic sets in completely arbitrary and individual ways. In this example, Inter uses `ss02` to change a series of glyphs into less ambiguous forms, but the same stylistic set in another font could produce completely different changes.

The OpenType spec allows for as many as 20 different sets to be defined in a font; by default this plugin includes utilities for `ss01` through `ss04`. To add additional sets or to change the label of the utility class for specific sets, use the `stylisticSets` key in your `theme` or `extends` config.

```js
// tailwind.config.js
module.exports = {
	theme: {
		stylisticSets: {
			'open-digits': 'ss01',
			disambiguate: 'ss02',
			'curved-r': 'ss03',
		},
		extend: {
			stylisticSets: {
				'04': 'ss04',
			},
		},
	},
}
```
