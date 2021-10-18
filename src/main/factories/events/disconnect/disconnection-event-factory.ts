import { DisconnectionEvent } from '../../../../presentation/events/disconnection-event'
import { Event } from '../../../../presentation/interfaces/event'
import { makeDbDeleteVisitor } from '../../usecases/delete-visitor-factory'
import { makeDisConnectionEventValidation } from './disconnection-event-validation-factory'

export const disconnectionEventFactory = (): Event => {
  return new DisconnectionEvent(makeDisConnectionEventValidation(), makeDbDeleteVisitor())
}
