module.exports = {
    // ...
    // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
    src: './',
    schema: './src/schema/schema.graphql',
    exclude: ['**/.next/**', '**/node_modules/**', '**/test/**', '**/__generated__/**', '**/schema/**'],
    language: 'typescript',
    customScalars: {
        ItemId: 'string',
        BooleanType: 'boolean',
        UploadId: 'number',
        IntType: 'number',
        FloatType: 'number',
    },
};
