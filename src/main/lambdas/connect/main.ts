import 'source-map-support/register'

import { APIGatewayEvent } from 'aws-lambda'
import { formatJSONResponse } from '../../../libs/apiGateway'
import { connectionEventFactory } from '../../factories/events/connect/connection-event-factory'

export const handler = async (event: APIGatewayEvent) => {
  const { connectionId, identity, requestTimeEpoch } = event.requestContext
  const connectionEvent = connectionEventFactory()
  await connectionEvent.handle({
    sourceIp: identity.sourceIp,
    connectionId,
    requestTimeEpoch,
    shop: event.queryStringParameters?.shop,
    route: event.queryStringParameters?.route
  })
  return formatJSONResponse({ message: 'Connected!' })
}
