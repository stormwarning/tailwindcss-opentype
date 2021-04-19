---
layout: page
title: Font Variant Ligatures
description: Utilities for controlling ligatures and contextual forms.
eleventyNavigation:
    key: Font Variant Ligatures
    order: 1
classData: ligatures
---

## Usage

Use the `font-variant-ligatures` utilities to enable ligatures and contextual forms in textual content. Each setting can be disabled by prefixing the class with `no-`.

These utilities are composable so you can enable multiple `font-variant-ligatures` features by combining multiple classes in your HTML:

### Common ligatures {{ 'liga' | badge }}

Most common ligatures mitigate spacing issues between specific combinations of letters within a typeface, often by connecting glyphs that might otherwise collide. Common ligatures are usually enabled by default in fonts that support them, and can be disabled if needed.

```html orange
<template preview>
    <div class="text-grey-600 mix-blend-multiply">
        <p class="font-warnock no-common-ligatures text-4xl opacity-70">
            fi ff fl ffi Th
        </p>
        <p class="font-warnock common-ligatures text-4xl">
            <mark>fi</mark>
            <mark>ff</mark>
            <mark>fl</mark>
            <mark>ffi</mark>
            <mark>Th</mark>
        </p>
    </div>
</template>

<p class="**common-ligatures**">fi ff fl ffi Th</p>
```

### Discretionary ligatures {{ 'dlig' | badge }}

Discretionary ligatures’ defining characteristic is that they are available to enable at your discretion: they are disabled by default. Often, these are additional ligatures that might be considered too attention-grabbing or unconventional to be enabled in many situations.

```html rose
<template preview>
    <div class="text-grey-600 mix-blend-multiply">
        <p class="font-warnock no-discretionary-ligatures text-4xl opacity-70">
            ct sp st
        </p>
        <p class="font-warnock discretionary-ligatures text-4xl">
            <mark>ct</mark>
            <mark>sp</mark>
            <mark>st</mark>
        </p>
    </div>
</template>

<p class="**discretionary-ligatures**">ct sp st</p>
```

### Contextual alternates {{ 'calt' | badge }}

Like ligatures (though not strictly a ligature feature), contextual alternates are commonly used to harmonize the shapes of glyphs with the surrounding context. This feature is also enabled by default, except in Chrome, and cannot be disabled in Safari.

```html indigo
<template preview>
    <div class="text-grey-600 mix-blend-multiply">
        <p class="font-caflisch no-contextual text-4xl opacity-70">
            The bloom has gone off the rose
        </p>
        <p class="font-caflisch contextual text-4xl opacity-70">
            The <mark>bloom</mark> has g<mark>one</mark> off the
            <mark>rose</mark>
        </p>
    </div>
</template>

<p class="**contextual**">The bloom has gone off the rose</p>
```
