---
layout: page
title: Font Variant Caps
description: Utilities for controlling alternate glyphs for capital letters.
eleventyNavigation:
    key: Font Variant Caps
    order: 2
classData: caps
---

## Usage

Use the `font-variant-caps` utilities to transform letters into optimised capital forms. Small Caps are less distracting than all capitals for longer form text settings. They also provide an additional way to apply emphasis within text.

### Small caps :feat[cmcp]

This feature turns lowercase characters into small capitals.

```html amber
<template preview>
    <div class="text-grey-600 mix-blend-multiply">
        <p class="font-warnock text-4xl opacity-70">
            Not all caps are Small Caps.
        </p>
        <p class="font-warnock small-caps text-4xl">
            N<mark>ot all caps are</mark> S<mark>mall</mark>
            C<mark>aps</mark>.
        </p>
    </div>
</template>

<p class="**small-caps**">Not all caps are Small Caps.</p>
```

### All small caps :feat[smcp,c2sc]

Like `small-caps` but transforms uppercase characters into small capitals as well.

```html orange
<template preview>
    <div class="text-grey-600 mix-blend-multiply">
        <p class="font-warnock text-4xl opacity-70">All caps are Small Caps.</p>
        <p class="font-warnock all-small-caps text-4xl">
            <mark>All caps are Small Caps</mark>.
        </p>
    </div>
</template>

<p class="**all-small-caps**">All caps are Small Caps.</p>
```

### Titling caps :feat[titl]

Uppercase letter glyphs are often designed for use with lowercase letters. When used in all uppercase titling sequences they can appear too strong. Titling capitals are designed specifically for this situation.

Note: This feature is not _exclusively_ for capital letters, but for any forms better suited for large type, as in titles. It is included with these utilities due to how it is applied in the W3C spec.

```html emerald
<template preview>
    <div class="text-grey-600 mix-blend-multiply">
        <p class="font-allan text-4xl opacity-70">Quick, Brown, Lazy, Grumpy</p>
        <p class="font-allan titling-caps text-4xl opacity-70">
            Q<mark>u</mark>ick, B<mark>r</mark>own, Laz<mark>y</mark>,
            G<mark>ru</mark>mp<mark>y</mark>
        </p>
    </div>
</template>

<p class="**titling-caps**">Quick Brown Lazy Grumpy</p>
```
