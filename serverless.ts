import type { AWS } from '@serverless/typescript'

import { connect, disconnect } from '@/main/lambdas'

const serverlessConfiguration: AWS = {
  service: 'aws-serverless-websocket',
  frameworkVersion: '2',
  plugins: [
    'serverless-plugin-typescript',
    'serverless-offline',
    'serverless-dynamodb-local'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    profile: 'dev',
    stage: 'dev',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:PutItem',
          'dynamodb:GetItem',
          'dynamodb:DeleteItem'
        ],
        Resource: [
          {"Fn::GetAtt": [ 'visitorsTable', 'Arn' ]},
        ]
      }
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  custom: {
    dynamodb: {
      stages: ['test'],
      start: {
        port: 8000,
        inMemory: true,
        migrate: true
      }
    },
    stage: '${opt:stage, self:provider.stage}',
    visitorsTable: '${opt:stage, self:provider.stage}-visitors'
  },
  resources: {
    Resources: {
      visitorsTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:custom.stage}-visitors',
          BillingMode: 'PROVISIONED',
          KeySchema: [
            {
              AttributeName: 'ip',
              KeyType: 'HASH'
            }
          ],
          AttributeDefinitions: [{
            AttributeName: 'ip',
            AttributeType: 'S'
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      }
    }
  },
  // import the function via paths
  functions: { connect, disconnect },
};

module.exports = serverlessConfiguration
