---
layout: page
title: Ligatures
description: Utilities for controlling ligatures and contextual forms.
tags: OpenType features
eleventyNavigation:
  key: Ligatures
  order: 1
classData: ot-ligatures
---

## Usage

These utilities provide access to OpenType ligature features not currently available via the higher-level CSS properties. For other ligature features, use the [Font Variant Ligatures](/font-variant-ligatures) utilities.

### Historical ligatures :feat[hlig]

Some ligatures were in common use in the past, but appear anachronistic today. Some fonts include the historical forms as alternates, so they can be used for a “period” effect. The most common example is the long s paired with most ascenders, while a tz ligature is also found in German blackletter type.

Depending on the font, historical ligatures may need to have [historical forms](/font-variant-alternates/#historical-forms-hist) enabled as well. Alternatively, using the actual historical glyph (`ſ` for the long `s` in this example) should apply the ligature without having to apply the historical forms for the entire run of text.

```html emerald
<template preview>
	<p class="font-garamond text-4xl opacity-70">Lost lesson</p>
	<p class="font-garamond historical-forms hlig text-4xl">
		Lo<mark>st</mark> le<mark>ss</mark>on
	</p>
</template>

<p class="historical-forms **hlig**">Lost lesson</p>
```

**Pro tip:** To _prevent_ a ligature from being rendered where it is not appropriate, insert a zero-width non-joiner — `&zwnj;` — between the glyphs. Conversely, a zero-width joiner — `&zwj;` — should render the ligature form, without any CSS needed!
