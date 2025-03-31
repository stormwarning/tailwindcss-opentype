---
layout: page
title: font-variant-alternates
description: Utilities for controlling the usage of alternate glyphs.
tags: Font variants
eleventyNavigation:
  key: font-variant-alternates
  order: 3
classData: alternates
---

## Usage

Use the `font-variant-alternates` utilities to access alternative styles for different characters. These can be applied to blocks of text, in the case of historical forms or stylesets, or to individual characters, as with swash glyphs or character variants.

### Historical forms :feat[hist]

Historical glyph variants may not be useful in everyday typesetting situations, but can prove useful when referencing the past.

```html fuchsia
<template preview>
	<p class="font-garamond text-4xl opacity-70">Jesuit</p>
	<p class="font-garamond historical-forms text-4xl">
		<mark>J</mark>e<mark>s</mark>uit
	</p>
</template>

<p class="**historical-forms**">Jesuit</p>
```
