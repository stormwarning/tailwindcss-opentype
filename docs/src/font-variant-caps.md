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

### Small caps (`smcp`)

This feature turns lowercase characters into small capitals.

```
<p class="small-caps">Not all caps are Small Caps.</p>
```

### All small caps (`smcp`, `c2sc`)

Like `small-caps` but transforms uppercase characters into small capitals as well.

```
<p class="all-small-caps">All caps are Small Caps.</p>
```

### Titling caps (`titl`)

Uppercase letter glyphs are often designed for use with lowercase letters. When used in all uppercase titling sequences they can appear too strong. Titling capitals are designed specifically for this situation.

Note: This feature is not _exclusively_ for capital letters, but for any forms better suited for large type, as in titles. It is included with these utilities due to how it is applied in the W3C spec.

```
<p class="titling-caps">Quick Brown Lazy Grumpy</p>
```
