---
layout: page
title: Installation
# description: Utilities for controlling ligatures and contextual forms.
tags: Getting started
eleventyNavigation:
  key: Installation
  order: 1
---

First, follow the [steps to install Tailwind CSS] first, if you haven’t already.

[steps to install Tailwind CSS]: https://tailwindcss.com/docs/installation/using-vite

Install the plugin using your favourite JavaScript package manager.

```sh
npm install tailwindcss-opentype
```

Include the plugin in your CSS using the `@plugin` directive. This will enable the plugin with it’s default settings, which should be all you need for most cases.

```css
@import "tailwindcss";
@plugin "tailwindcss-opentype";
```

If you’re using TailwindCSS v3, or if you’d like to add or customize some utilities, you can import the plugin in a JavaScript config file.

```css
@import "tailwindcss";
@config "../tailwind.config.js";
```

```js
import opentypePlugin from 'tailwindcss-opentype'

/** @type {import('tailwindcss').Config} */
const config = {
	plugins: [opentypePlugin],
}

export default config
```

The [Stylistic sets documentation] has more detail on customizing the utility classes for that feature.

[Stylistic sets documentation]: /feature-alternates/#stylistic-sets-ss01ss20

## Feature availability

The styles applied by these classes don’t enable these features in any and every font. There may be some cases where the browser will try to synthesize some features like small caps, but for best (or indeed, any) results, check which feature your chosen font supports. Each OpenType feature has a corresponding four-letter code — check for these in your typeface documentation or with your font provider to see which features are available.

## Compatibility

In addition to the feature availability mentioned before, there’s also the issue of browser compatibility. Happily, browser support for OpenType features is quite good. Applying them isn’t always easy, however (something this plugin aims to address). This is primarily due to how the widely-supported `font-feature-settings` property works.

## Variants

Includes no variants by default since it's unlikely you'd need to change these settings in different contexts, but hey I'm not the cops. Variants can be set for each variant group individually.
