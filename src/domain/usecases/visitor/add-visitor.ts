import { APIGatewayEvent } from 'aws-lambda'
import { Visitor } from '../../models/visitor'

export interface AddVisitorParams {
  connectionId: APIGatewayEvent['requestContext']['connectionId']
  sourceIp: APIGatewayEvent['requestContext']['identity']['sourceIp']
  requestTimeEpoch: APIGatewayEvent['requestContext']['requestTimeEpoch']
  route: string
  shop: string
}

export interface AddVisitor {
  add: (addVisitorParams: AddVisitorParams) => Promise<Visitor>
}
