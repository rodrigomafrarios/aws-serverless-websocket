# Visitors

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/). 

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## The project

This is a API Gateway Websocket + Dynamodb example tracking visitors:
- $connect
    - add visitors
    - the route wss://URL/dev?**route=any&shop=any** (attention for queryStringParameters)
- $disconnect
    - delete visitors



## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS
- Run `npm run deploy:dev`to deploy this stack to AWS profile dev

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

## Template features

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `data`         - containing use cases
- `domain`       - containing models and use cases interfaces
- `infra`        - containing infrastructure techs (like databases interfaces)
- `libs`         - containing shared code base between your lambdas
- `main`         - containing lambda functions and factories
- `presentation` - containing events layer called by lambda function
