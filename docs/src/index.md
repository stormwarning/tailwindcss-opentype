---
layout: home
title: TailwindCSS OpenType — utility classes for advanced typographic features.
eleventyNavigation:
  key: home
---

:::figure

> OpenType features are like secret compartments in fonts. Unlock them and you'll find ways to make fonts look and behave differently in subtle and dramatic ways. Not all OpenType features are appropriate to use all of the time, but some features are critical for great typography.

::figcaption[— Tim Brown, Head of Typography at Adobe]

:::

OpenType fonts include widely expanded character sets and layout features, which provide richer linguistic support and advanced typographic control.

## Getting started

After installing the plugin, include it your Tailwind config and the utility classes will be available.

```js
// tailwind.config.js
module.exports = {
    ...
    plugins: [
        require('tailwindcss-opentype'),
    ],
}
```

Don’t forget to use PurgeCSS or Tailwind’s JIT mode to ensure only the classes you need are included in your production code.

The styles applied by these classes don’t enable these features in any and every font. There may be some cases where the browser will try to synthesize some features like small caps, but for best (or indeed, any) results, check which feature your chosen font supports. Each OpenType feature has a corresponding four-letter code — check for these in your typeface documentation or with your font provider to see which ones are available.

## Compatibility

In addition to the feature availability mentioned before, there’s also the issue of browser compatibility. Happily, browser support for OpenType features is quite good. Applying them isn’t always easy, however (something this plugin aims to address). This is primarily due to how the widely-supported `font-feature-settings` property works.

## Variants

Includes no variants by default since it's unlikely you'd need to change these settings in different contexts, but hey I'm not the cops. Variants can be set for each variant group individually.
