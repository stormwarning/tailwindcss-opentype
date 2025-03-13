const dedent = require('dedent')

module.exports = {
	'common-ligatures': dedent`--ot-liga: common-ligatures;
                               font-variant-ligatures: var(--ot-liga) var(--ot-dlig) var(--ot-calt);`,
	'no-common-ligatures': dedent`--ot-liga: no-common-ligatures;
                                  font-variant-ligatures: var(--ot-liga) var(--ot-dlig) var(--ot-calt);`,
	'discretionary-ligatures': dedent`--ot-dlig: discretionary-ligatures;
                                      font-variant-ligatures: var(--ot-liga) var(--ot-dlig) var(--ot-calt);`,
	'no-discretionary-ligatures': dedent`--ot-dlig: no-discretionary-ligatures;
                                         font-variant-ligatures: var(--ot-liga) var(--ot-dlig) var(--ot-calt);`,
	contextual: dedent`--ot-calt: contextual;
                       font-variant-ligatures: var(--ot-liga) var(--ot-dlig) var(--ot-calt);`,
	'no-contextual': dedent`--ot-calt: no-contextual;
                            font-variant-ligatures: var(--ot-liga) var(--ot-dlig) var(--ot-calt);`,
}
