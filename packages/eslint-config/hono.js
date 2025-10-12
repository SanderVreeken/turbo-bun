import antfu from '@antfu/eslint-config'

export const config = antfu(
    {
        type: 'app',
        typescript: true,
        formatters: true,
        ignores: ['**/migrations/*'],
    },
    {
        rules: {
            'no-console': ['warn'],
            'antfu/no-top-level-await': ['off'],
            'node/prefer-global/process': ['off'],
            'perfectionist/sort-imports': [
                'error',
                {
                    tsconfigRootDir: '.',
                },
            ],
        },
    }
)