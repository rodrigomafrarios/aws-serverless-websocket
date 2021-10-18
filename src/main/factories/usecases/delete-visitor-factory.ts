import { DynamoDBClientFactory } from '../../../infra/aws/factories/aws-config-factory'
import { VisitorDynamodbRepository } from '../../../infra/db/dynamodb/visitor-dynamodb-repository'
import { DbDeleteVisitor } from '../../../data/usecases/visitor/db-delete-visitor'
import { DeleteVisitor } from '../../../domain/usecases/visitor/delete-visitor'

export const makeDbDeleteVisitor = (): DeleteVisitor => {
  const dynamoClient = DynamoDBClientFactory({ apiVersion: '2012-08-10' })
  const repository = new VisitorDynamodbRepository(dynamoClient)
  return new DbDeleteVisitor(repository)
}
