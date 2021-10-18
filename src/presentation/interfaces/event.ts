export interface EventData {
  sourceIp: string
  connectionId: string
  requestTimeEpoch?: number
  shop?: string
  route?: string
}

export type EventResponse = true | false

export interface Event {
  handle: (eventData: EventData) => Promise<EventResponse>
}
