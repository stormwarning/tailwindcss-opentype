# tailwindcss-opentype

[![npm version][npm-img]][npm-url]
[![npm downloads][npm-dls]][npm-url]

> Tailwind CSS utility classes for advanced typographic features.

## Usage

```
npm install tailwindcss-opentype
```

### Font Variant Ligatures

| Class                        | Properties                                    |
|------------------------------|-----------------------------------------------|
| `common-ligatures`           | `font-variant-ligatures: common-ligatures`    |
| `no-common-ligatures`        | `font-variant-ligatures: no-common-ligatures` |
| `discretionary-ligatures`    | `font-variant-ligatures: discretionary-ligatures` |
| `no-discretionary-ligatures` | `font-variant-ligatures: no-discretionary-ligatures` |
| `contextual`                 | `font-variant-ligatures: contextual`          |
| `no-contextual`              | `font-variant-ligatures: no-contextual`       |

These utilities are composable so you can enable multiple `font-variant-ligatures` features by combining multiple classes in your HTML.

## Thanks

- [Utility OpenType](https://github.com/kennethormandy/utility-opentype) by [@kennethormandy](https://github.com/kennethormandy)
- [OpenType Features](https://sparanoid.com/lab/opentype-features/) by [@sparanoid](https://github.com/sparanoid)

[npm-url]: https://www.npmjs.com/package/tailwindcss-opentype

[npm-img]: https://img.shields.io/npm/v/tailwindcss-opentype.svg?style=flat-square

[npm-dls]: https://img.shields.io/npm/dt/tailwindcss-opentype.svg?style=flat-square
