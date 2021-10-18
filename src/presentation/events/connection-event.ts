import { AddVisitor } from '../../domain/usecases/visitor/add-visitor'
import { Event, EventData, EventResponse } from '../interfaces/event'
import { Validation } from '../interfaces/validation'

export class ConnectionEvent implements Event {
  constructor (
    private readonly validation: Validation,
    private readonly addVisitor: AddVisitor
  ) {}

  async handle (eventData: EventData): Promise<EventResponse> {
    try {
      const error = this.validation.validate(eventData)
      if (error) {
        return false
      }
      const visitor = await this.addVisitor.add({
        connectionId: eventData.connectionId,
        sourceIp: eventData.sourceIp,
        requestTimeEpoch: eventData?.requestTimeEpoch,
        route: eventData?.route,
        shop: eventData?.shop
      })
      if (!visitor) {
        return false
      }
      return true
    } catch (error) {
      return false
    }
  }
}
