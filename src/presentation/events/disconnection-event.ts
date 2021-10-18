import { DeleteVisitor } from '../../domain/usecases/visitor/delete-visitor'
import { Event, EventData, EventResponse } from '../interfaces/event'
import { Validation } from '../interfaces/validation'

export class DisconnectionEvent implements Event {
  constructor (
    private readonly validation: Validation,
    private readonly deleteVisitor: DeleteVisitor
  ) {}

  async handle (eventData: EventData): Promise<EventResponse> {
    try {
      const error = this.validation.validate(eventData)
      if (error) {
        return false
      }
      const deleted = await this.deleteVisitor.delete(eventData)
      if (!deleted) {
        return false
      }
      return true
    } catch (error) {
      return false
    }
  }
}
