import { AddVisitorRepository } from '../../interfaces/db/add-visitor-repository'
import { AddVisitor, AddVisitorParams } from '../../../domain/usecases/visitor/add-visitor'
import { Visitor } from '../../../domain/models/visitor'

export class DbAddVisitor implements AddVisitor {
  constructor (private readonly addVisitorRepository: AddVisitorRepository) {}

  async add (addVisitorParams: AddVisitorParams): Promise<Visitor> {
    const visitor = await this.addVisitorRepository.add({
      clientId: addVisitorParams.connectionId,
      trackedAt: new Date(addVisitorParams.requestTimeEpoch).toISOString(),
      ip: addVisitorParams.sourceIp,
      route: addVisitorParams.route,
      shop: addVisitorParams.shop
    })
    return visitor
  }
}
