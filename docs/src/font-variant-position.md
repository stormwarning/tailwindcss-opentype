---
layout: page
title: Font Variant Position
description: Utilities for controlling alternate glyphs for capital letters.
eleventyNavigation:
    key: Font Variant Position
    order: 5
    # inactive: true
classData: position
---

## Usage

### Super :feat[sups]

This feature replaces lining or oldstyle figures with superscript figures, often used for footnote indication, and replaces lowercase letters with superscript letters.

```html indigo
<template preview>
    <p class="font-hypatia text-4xl opacity-70">X2 Mme</p>
    <p class="font-hypatia font-features super-position text-4xl">
        X<mark>2</mark> M<mark>me</mark>
    </p>
</template>

<p class="font-features **super-position**">X2 Mme</p>
```
