import 'source-map-support/register'

import { APIGatewayEvent } from 'aws-lambda'
import { formatJSONResponse } from '../../../libs/apiGateway'
import { disconnectionEventFactory } from '../../factories/events/disconnect/disconnection-event-factory'

export const handler = async (event: APIGatewayEvent) => {
  const { connectionId, identity } = event.requestContext
  const disconnectionEvent = disconnectionEventFactory()
  await disconnectionEvent.handle({
    sourceIp: identity.sourceIp,
    connectionId
  })
  return formatJSONResponse({ message: 'Disconnected!' })
}
