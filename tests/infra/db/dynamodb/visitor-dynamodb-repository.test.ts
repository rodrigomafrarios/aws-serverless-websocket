import { DynamoDBClientFactory } from '@/infra/aws/factories/aws-config-factory'
import { VisitorDynamodbRepository } from '@/infra/db/dynamodb/visitor-dynamodb-repository'
import { mockDeleteVisitor, mockVisitor } from '@/tests/mocks/visitor-mocks'

import MockDate from 'mockdate'

type SutTypes = {
  sut: VisitorDynamodbRepository
  client: AWS.DynamoDB.DocumentClient
}

const makeSut = (): SutTypes => {
  const client = DynamoDBClientFactory({
    region: 'local',
    endpoint: 'http://localhost:8000',
    apiVersion: '2012-08-10'
  })
  const sut = new VisitorDynamodbRepository(client)
  return {
    sut,
    client
  }
}

describe('VisitorDynamodbRepository', () => {
  beforeAll(() => {
    MockDate.set(new Date())
    process.env.DYNAMODB_TABLE_VISITORS = 'test-visitors'
  })
  afterAll(() => {
    MockDate.reset()
  })
  describe('add()', () => {
    it('should add a visitor', async () => {
      const { sut } = makeSut()
      const visitor = await sut.add(mockVisitor())
      expect(visitor).toEqual(mockVisitor())
    })
  })
  describe('loadByIp()', () => {
    it('should load client by ip', async () => {
      const { sut } = makeSut()
      await sut.add(mockVisitor())

      const visitor = await sut.loadByIp('127.0.0.1')
      expect(visitor).toStrictEqual(mockVisitor())
    })
  })
  describe('deleted()', () => {
    it('should delete a visitor', async () => {
      const { sut } = makeSut()
      await sut.add(mockVisitor())

      const deleted = await sut.delete(mockDeleteVisitor())
      expect(deleted).toBeTruthy()
    })
  })
})
