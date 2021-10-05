import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "line-test",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-offline", "serverless-webpack"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: {
    lineTest: {
      handler: "src/handler.lineTest",
      events: [
        {
          http: {
            path: "/",
            method: "ANY",
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
