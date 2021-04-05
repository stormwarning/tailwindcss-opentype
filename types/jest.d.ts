declare global {
    namespace jest {
        interface Matchers<R> {
            toMatchCss: (expected: string) => R
        }
    }
}

export {}
