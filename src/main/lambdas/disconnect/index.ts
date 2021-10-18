import { handlerPath } from '../../../libs/handlerResolver'

export default {
  handler: `${handlerPath(__dirname)}/main.handler`,
  environment: {
    // eslint-disable-next-line no-template-curly-in-string
    DYNAMODB_TABLE_VISITORS: '${self:custom.visitorsTable}'
  },
  events: [
    {
      websocket: {
        route: '$disconnect'
      }
    }
  ]
}
