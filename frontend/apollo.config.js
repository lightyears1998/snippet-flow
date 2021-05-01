// This config is required to use Apollo Codegen feature.

module.exports = {
    client: {
        includes: [
            "./src/operations/**/*.ts"
        ],
        service: {
            name: 'snippet-flow', localSchemaFile: './schema.graphql'
        }
    }
};
