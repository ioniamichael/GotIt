module.exports = {
    parser: 'babel-eslint',
    root: true,
    extends: ['airbnb-base'],
    globals: {
        _DEV_: false,
    },
    env: {
        es6: true,
    },
    rules: {
        'prettier/prettier': 0,
        'import/prefer-default-export': 0,
        'import/no-cycle': 0,
        'no-underscore-dangle': 0,
        'object-curly-newline': 0,
        'global-require': 0,
        'no-undef': 0,
        'no-unused-vars': 0,
        'no-throw-literal': 0,
        'class-methods-use-this': 0,
        'no-console': 0,
        'consistent-return': 0,
        'no-restricted-syntax': 0,
        'no-shadow': 0,
        'array-callback-return': 0,
        'no-continue': 0,
        'max-len': 0,
        'no-loop-func': 0,
        'guard-for-in': 0,
        'no-plusplus': 0,
        'no-return-assign': 0,
        'no-param-reassign': 0, // From docs: If you want to allow assignment to function parameters, then you can safely disable this rule.
        'one-var-declaration-per-line': 0,
        'one-var': 0,
        'no-use-before-define': 0, // In order to place useEffect before functions - but then it's almost like cancelling the rule
        'comma-dangle': 0,
        'no-unused-expressions': 0, // Example a && b(). Allow ternary experssions when the expression before ? has no side effect
        'no-async-promise-executor': 0,
        'no-await-in-loop': 0,
        'no-case-declarations': 0,
        'arrow-parens': 0,
        'react/jsx-no-useless-fragment': 2,
        'react/jsx-sort-props': 2,
        'react/jsx-closing-bracket-location': 2,
        'react/jsx-closing-tag-location': 2,
        'padding-line-between-statements': [2,
            { blankLine: 'always', prev: ['var', 'let', 'const', 'expression', 'block', 'block-like'], next: 'return' },
            { blankLine: 'always', prev: ['block', 'block-like'], next: ['var', 'let', 'const', 'expression'] },
            { blankLine: 'never', prev: 'import', next: 'import' },
        ],
        indent: [2, 2, { SwitchCase: 1 }], // Validate JSX indentation (fixable)
        'react/jsx-indent': [2, 2], //  Validate props indentation in JSX (fixable)
        'react/jsx-key': [2], // Verify there's key for .map, [...] etc
        'react/jsx-equals-spacing': [2, 'never'], // No spaces around the = within jsx props
        'react/jsx-curly-spacing': [2, { when: 'never', children: true }], // No spaces between curly braces and its child. Child error example: <Hello>{ firstname }</Hello>
        'react/jsx-curly-brace-presence': [2, { props: 'never', children: 'never' }], // Disallow unnecessary curly braces in JSX. Error example 1: <App>Hello world'}</App>; Error example 2: <App prop={'Hello world'} attr={'foo'} />;
        'no-multi-spaces': 2
    },
    plugins: ['prettier', 'flowtype', 'react-hooks', 'react'],
};
