import { AddVisitorRepository, AddVisitorRepositoryParams } from '@/data/interfaces/db/add-visitor-repository'
import { DeleteVisitorRepository, DeleteVisitorRepositoryParams } from '@/data/interfaces/db/delete-visitor-repository'
import { Visitor } from '@/domain/models/visitor'
import { AddVisitor } from '@/domain/usecases/visitor/add-visitor'
import { DeleteVisitor } from '@/domain/usecases/visitor/delete-visitor'

export const mockEventData = (): any => {
  return {
    connectionId: 'any-connection-id',
    requestTimeEpoch: new Date().getTime(),
    sourceIp: '127.0.0.1',
    route: 'any-route',
    shop: 'any-shop'
  }
}

export const mockVisitor = (): Visitor => {
  const event = mockEventData()
  return {
    clientId: event.connectionId,
    trackedAt: new Date(event.requestTimeEpoch).toISOString(),
    ip: event.sourceIp,
    route: event.route,
    shop: event.shop
  }
}

export const mockDeleteVisitor = (): DeleteVisitorRepositoryParams => {
  const event = mockEventData()
  return {
    clientId: event.connectionId,
    ip: event.sourceIp
  }
}

export const mockAddVisitorStub = (): AddVisitor => {
  class AddVisitorStub implements AddVisitor {
    async add (): Promise<Visitor> {
      return Promise.resolve(mockVisitor())
    }
  }
  return new AddVisitorStub()
}

export const mockDeleteVisitorStub = (): DeleteVisitor => {
  class DeleteVisitorStub implements DeleteVisitor {
    async delete (): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new DeleteVisitorStub()
}

export const mockAddVisitorRepositoryStub = (): AddVisitorRepository => {
  class AddVisitorRepositoryStub implements AddVisitorRepository {
    async add (addVisitorParams: AddVisitorRepositoryParams): Promise<Visitor> {
      return Promise.resolve(mockVisitor())
    }
  }
  return new AddVisitorRepositoryStub()
}

export const mockDeleteVisitorRepositoryStub = (): DeleteVisitorRepository => {
  class DeleteVisitorRepositoryStub implements DeleteVisitorRepository {
    async delete (deleteVisitorParams: DeleteVisitorRepositoryParams): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new DeleteVisitorRepositoryStub()
}
