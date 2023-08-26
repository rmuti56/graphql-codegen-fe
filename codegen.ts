import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/graphql",
  documents: ["src/**/*.graphql"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "src/generated/index.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
      config: {
        fetcher: {
          endpoint: "http://localhost:3000/graphql",
          fetchParams: {
            headers: {
              "content-type": "application/json",
              "Apollo-Require-Preflight": "true",
            },
          },
        },
      },
    },
  },
};

export default config;
