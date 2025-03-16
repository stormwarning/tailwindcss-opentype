---
layout: page
title: Font Kerning
description: Utilities to set the use of the kerning information stored in a font.
tags: typography
eleventyNavigation:
  key: Font Kerning
  order: 1
classData: kerning
---

## Usage

Although a well-designed typeface has consistent inter-glyph spacing overall, some glyph combinations require adjustment for improved legibility. If the `letter-spacing` property is defined, kerning adjustments are considered part of the default spacing and letter spacing adjustments are made _after_ kerning has been applied.

### Kerning :feat[kern]

```html emerald
<template preview>
	<p class="font-warnock text-4xl opacity-70 kerning-none">You Will Try</p>
	<p class="font-warnock text-4xl kerning">
		<mark>Yo</mark>u <mark>Wi</mark>ll <mark>Try</mark>
	</p>
</template>

<p class="**kerning**">You Will Try</p>
```

Kerning often defaults to `auto` in the browser, which may disable kerning at smaller font sizes. It can be disabled manually if needed using `.kerning-none`, or force-enabled using `.kerning-normal`.
