module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        'react',
    ],
    "rules": {
        'react/sort-comp': 0,
        'react/prop-types': 0,
        'react/jsx-closing-bracket-location': 0,
        'react/jsx-first-prop-new-line': 0,
        'func-names': 0,
        'prefer-const': 0,
        'arrow-body-style': 0,
        'import/no-unresolved': 0,
        'no-param-reassign': ["error", { "props": false }],
        'no-return-assign': 0,
        'max-len': 0,
        'consistent-return': 0,
        "indent": 0,
    }
};
