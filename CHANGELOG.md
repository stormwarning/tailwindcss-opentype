# tailwindcss-opentype

## 1.1.0 — 2022-08-12

#### 🎁 Added

- Add stylistic alternates — `salt` — utility [#90](https://github.com/stormwarning/tailwindcss-opentype/pull/90)

## 1.0.0 — 2022-03-25

#### 💣 Breaking changes

- Drop support for legacy AOT mode in order to support v3 [#87](https://github.com/stormwarning/tailwindcss-opentype/pull/87)

  Plugin no longer supports v1, may still work in v2 as long as JIT mode is enabled.

## 0.5.0 — 2022-03-24

#### 🎁 Added

- Add stylistic sets utilities [#84](https://github.com/stormwarning/tailwindcss-opentype/pull/84)

## 0.4.0 — 2021-09-21

#### 🎁 Added

- Add historical ligatures — `hlig` — utility [#69](https://github.com/stormwarning/tailwindcss-opentype/pull/69)
- Add `font-kerning` utilities [#67](https://github.com/stormwarning/tailwindcss-opentype/pull/67)

## 0.3.0 — 2021-09-08

#### 🎁 Added

- Simplify `font-feature-settings` use in JIT-mode [#57](https://github.com/stormwarning/tailwindcss-opentype/pull/57)  
  Allows use of low-level font feature utilities without requiring the `.font-features` class to activate.

## 0.2.0 — 2021-08-20

#### 🎁 Added

- Add `position` utility classes [#10](https://github.com/stormwarning/tailwindcss-opentype/pull/10)  
  Uses the low-level `font-feature-settings` property under the hood.

## 0.1.0 — 2021-04-19

#### ♻️ Changed

- Update `font-variant-ligature` utilities [#6](https://github.com/stormwarning/tailwindcss-opentype/pull/6)  
  Adds negation utilities and makes classes composable.

#### 🎁 Added

- Add documentation microsite [#8](https://github.com/stormwarning/tailwindcss-opentype/pull/8)

## 0.0.2 — 2021-04-07

#### 🎉 Initial release!

- Add initial utility classes [#4](https://github.com/stormwarning/tailwindcss-opentype/pull/4)  
  A handful of the more common OpenType variant settings, no fallbacks yet.
