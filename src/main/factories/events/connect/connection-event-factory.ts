import { ConnectionEvent } from '../../../../presentation/events/connection-event'
import { Event } from '../../../../presentation/interfaces/event'
import { makeDbAddVisitor } from '../../usecases/add-visitor-factory'
import { makeConnectionEventValidation } from './connection-event-validation-factory'

export const connectionEventFactory = (): Event => {
  return new ConnectionEvent(makeConnectionEventValidation(), makeDbAddVisitor())
}
