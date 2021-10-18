import { APIGatewayEvent } from 'aws-lambda'

export interface DeleteVisitorParams {
  connectionId: APIGatewayEvent['requestContext']['connectionId']
  sourceIp: APIGatewayEvent['requestContext']['identity']['sourceIp']
}

export interface DeleteVisitor {
  delete: (deleteVisitorParams: DeleteVisitorParams) => Promise<boolean>
}
