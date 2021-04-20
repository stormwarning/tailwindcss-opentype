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

### Historical forms :feat[hist]

Historical glyph variants aren’t likely to be useful in everyday typesetting situations, but may prove useful when referencing the past.

```html fuchsia
<template preview>
    <div class="text-grey-600 mix-blend-multiply">
        <p class="font-goudy text-4xl opacity-70">Blasphemous</p>
        <p class="font-goudy historical-forms text-4xl">
            Bla<mark>s</mark>phemou<mark>s</mark>
        </p>
    </div>
</template>

<p class="**historical-forms**">Blasphemous</p>
```
