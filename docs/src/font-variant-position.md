---
layout: page
title: Font Variant Position
description: Utilities for controlling alternate, smaller glyphs that are positioned as superscript or subscript.
eleventyNavigation:
    key: Font Variant Position
    order: 5
    # inactive: true
classData: position
---

## Usage

While it is possible to use the `font-variant-position` utilities at the "block" level, depending on the typeface this may result in other characters being substituted for the repositioned glyphs. To avoid this, wrap the appropriate characters in an inline element, such as `<sup>` or `<sub>`.

Using `<sup>` or `<sub>` elements has its own pitfalls, however. Common "reset" styles and even browser default styles often try to approximate superscript or subscript glyphs, which should be disabled if you are using a font designed with these features. These resets and defaults vary, so these utilities don't attempt to disable any default styles for these elements. Either account for this in your own baseline styles, or use a more neutral wrapper, like `<span>`.

The examples below use `<sub>` and `<sup>` with the default Tailwind CSS reset styles for the initial result, and `<span>` elements with the utility classes added for the final result, in order to show the difference between the "synthesized" characters and the specifically designed forms.

### Superscript :feat[sups]

This feature replaces lining or oldstyle figures with superscript figures, often used for footnote indication, and replaces lowercase letters with superscript letters.

```html emerald
<template preview>
    <p class="font-warnock text-4xl opacity-70">
        M<sup>me</sup> <sup>3</sup>He <sup>$</sup>2
    </p>
    <p class="font-warnock text-4xl">
        M<span class="font-features super-position"><mark>me</mark></span>
        <span class="font-features super-position"><mark>3</mark></span
        >He <span class="font-features super-position"><mark>$</mark></span
        >2
    </p>
</template>

<p>M<sub class="font-features **super-position**">me</sub></p>
```

This illustrates a case where blanket application of the feature wouldn't work:
in **:span[3]{.font-features.super-position}He** we want the :kbd[3] superscripted, but not the lowercase :kbd[e].

### Subscript :feat[subs]

Perhaps the most familiar example of subscripts is in chemical formulas.

```html orange
<template preview>
    <p class="font-hypatia text-4xl opacity-70">H<sub>2</sub>O x<sub>0</sub></p>
    <p class="font-hypatia text-4xl">
        H<span class="font-features sub-position"><mark>2</mark></span
        >O x<span class="font-features sub-position"><mark>0</mark></span>
    </p>
</template>

<p>H<sub class="font-features **sub-position**">2</sub>O</p>
```

### Scientific inferior :feat[sinf]

Scientific inferior are for chemical and mathematical typesetting, and include optically corrected letters and numbers. This feature is often conflated with subscripts and may not be fully supported for every scientific notation form. For optimal results, something like [LaTeX](https://katex.org/) may be a better option.

```html rose
<template preview>
    <p class="font-warnock text-4xl opacity-70">
        H<sub>2</sub>O YC<sub>b</sub>C<sub>r</sub> ν<sub>μ</sub>
    </p>
    <p class="font-warnock text-4xl">
        H<mark class="font-features inferior-position">2</mark>O YC<mark
            class="font-features inferior-position"
            >b</mark
        >C<mark class="font-features inferior-position">r</mark> ν<mark
            class="font-features inferior-position"
            >μ</mark
        >
    </p>
</template>

<p class="font-features **inferior-position**">H2O YCbCr νμ</p>
```
