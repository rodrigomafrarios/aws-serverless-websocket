import { DynamoDBClientFactory } from '../../../infra/aws/factories/aws-config-factory'
import { VisitorDynamodbRepository } from '../../../infra/db/dynamodb/visitor-dynamodb-repository'
import { DbAddVisitor } from '../../../data/usecases/visitor/db-add-visitor'
import { AddVisitor } from '../../../domain/usecases/visitor/add-visitor'

export const makeDbAddVisitor = (): AddVisitor => {
  const dynamoClient = DynamoDBClientFactory({ apiVersion: '2012-08-10' })
  const repository = new VisitorDynamodbRepository(dynamoClient)
  return new DbAddVisitor(repository)
}
