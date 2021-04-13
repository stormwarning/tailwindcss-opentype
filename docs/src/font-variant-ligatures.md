---
layout: base.njk
title: Font Variant Ligatures
description: Description goes here.
eleventyNavigation:
    key: font-variant-ligatures
    order: 1
---

## Usage

Use the `font-variant-ligatures` utilities to enable additional glyphs for numbers, fractions, and ordinal markers (in fonts that support them).

These utilities are composable so you can enable multiple `font-variant-ligatures` features by combining multiple classes in your HTML:

### Common ligatures

Common ligatures are usually enabled by default, but they can be disabled as well.

```
<p class="common-ligatures">fi ff fl ffi Th</p>
```

### Discretionary ligatures

```
<p class="discretionary-ligatures">ct sp st</p>
```
