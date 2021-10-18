import { Visitor } from '../../../domain/models/visitor'
import { AddVisitorRepository, AddVisitorRepositoryParams } from '../../../data/interfaces/db/add-visitor-repository'
import { DeleteVisitorRepository, DeleteVisitorRepositoryParams } from '../../../data/interfaces/db/delete-visitor-repository'

export class VisitorDynamodbRepository implements AddVisitorRepository, DeleteVisitorRepository {
  constructor (private readonly client: AWS.DynamoDB.DocumentClient) {}

  async add (addVisitorParams: AddVisitorRepositoryParams): Promise<Visitor> {
    await this.client.transactWrite({
      TransactItems: [{
        Put: {
          TableName: process.env.DYNAMODB_TABLE_VISITORS,
          Item: {
            ...addVisitorParams
          }
        }
      }]
    }).promise()
    const output = await this.loadByIp(addVisitorParams.ip)
    return output
  }

  async loadByIp (ip: string): Promise<Visitor> {
    const output = await this.client.get({
      TableName: process.env.DYNAMODB_TABLE_VISITORS,
      Key: {
        ip
      }
    }).promise()

    return output?.Item && ({
      ip: output.Item.ip,
      trackedAt: output.Item.trackedAt,
      clientId: output.Item.clientId,
      route: output.Item.route,
      shop: output.Item.shop
    })
  }

  async delete (deleteVisitorParams: DeleteVisitorRepositoryParams): Promise<boolean> {
    const output = await this.client.transactWrite({
      TransactItems: [{
        Delete: {
          TableName: process.env.DYNAMODB_TABLE_VISITORS,
          Key: {
            ip: deleteVisitorParams.ip
          },
          ConditionExpression: 'clientId = :clientId AND ip = :ip',
          ExpressionAttributeValues: {
            ':clientId': deleteVisitorParams.clientId,
            ':ip': deleteVisitorParams.ip
          }
        }
      }]
    }).promise()
    return output.$response.error === null
  }
}
