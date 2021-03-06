const path = require('path');
module.exports = {
    stories: ['../src/components/**/**/*.stories.tsx'],
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            use: [
                {
                    loader: require.resolve('babel-loader'),
                },
                {
                    loader: require.resolve('awesome-typescript-loader'),
                    options: {
                        configFileName: path.resolve(__dirname, './tsconfig.json'),
                    },
                },
                // Optional
                {
                    loader: require.resolve('react-docgen-typescript-loader'),
                    options: {
                        tsconfigPath: path.resolve(__dirname, './tsconfig.json'),
                    },
                },
            ],
        });
        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            include: path.resolve(__dirname, '../'),
        });
        config.resolve.extensions.push('.ts', '.tsx');
        return config;
    },
    addons: [
        '@storybook/addon-actions/register',
        '@storybook/addon-knobs/register',
        '@storybook/addon-notes/register',
        '@storybook/addon-viewport/register',
        '@storybook/addon-storysource',
        '@storybook/addon-backgrounds/register',
        '@storybook/addon-a11y/register',
    ],
};
