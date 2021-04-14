module.exports = {
    'common-ligatures': `--ot-liga: common-ligatures;
    font-variant-ligatures: var(--ot-liga) var(--ot-dlig) var(--ot-calt);`,
    'no-common-ligatures': `--ot-liga: no-common-ligatures;
    font-variant-ligatures: var(--ot-liga) var(--ot-dlig) var(--ot-calt);`,
    'discretionary-ligatures': `--ot-dlig: discretionary-ligatures;
    font-variant-ligatures: var(--ot-liga) var(--ot-dlig) var(--ot-calt);`,
    'no-discretionary-ligatures': `--ot-dlig: no-discretionary-ligatures;
    font-variant-ligatures: var(--ot-liga) var(--ot-dlig) var(--ot-calt);`,
    contextual: `--ot-calt: contextual;
    font-variant-ligatures: var(--ot-liga) var(--ot-dlig) var(--ot-calt);`,
    'no-contextual': `--ot-calt: no-contextual;
    font-variant-ligatures: var(--ot-liga) var(--ot-dlig) var(--ot-calt);`,
}
