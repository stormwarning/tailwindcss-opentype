---
layout: page
title: Font Variant Alternates
description: Utilities for controlling the usage of alternate glyphs.
eleventyNavigation:
    key: Font Variant Alternates
    order: 3
classData: alternates
---

## Usage

Use the `font-variant-alternates` utilities to access alternative styles for different characters. These can be applied to blocks of text, in the case of historical forms or stylesets, or to individual characters, as with swash glyphs or character variants.

### Historical forms {{ 'hist' | badge }}

Historical glyph variants aren’t likely to be useful in everyday typesetting situations, but may prove useful when referencing the past.

```html cyan
<template preview>
    <p class="font-historical historical-forms text-4xl text-cyan-600">
        Blasphemous
    </p>
</template>

<p class="historical-forms">Blasphemous</p>
```
