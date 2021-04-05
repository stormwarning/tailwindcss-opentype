import postcss from 'postcss'
import tailwindcss from 'tailwindcss'

export async function generateCss(
    plugin: any,
    theme?: any,
    variants: string[] = [],
    config?: any,
    base: boolean = false,
    components: boolean = false,
    utilities: boolean = true,
    plugins: string[] | false = false,
): Promise<string> {
    let process =
        (base ? '@tailwind base; ' : '') +
        (components ? '@tailwind components; ' : '') +
        (utilities ? '@tailwind utilities; ' : '')
    let result = await postcss(
        tailwindcss({
            ...config,
            theme,
            variants,
            corePlugins: plugins,
            plugins: [plugin],
        }),
    ).process(process, {
        from: undefined,
    })

    return result.css
}
