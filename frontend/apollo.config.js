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
