import { Visitor } from '../../../domain/models/visitor'

export interface AddVisitorRepositoryParams {
  clientId: string
  trackedAt: string
  ip: string
  shop: string
  route: string
}

export interface AddVisitorRepository {
  add: (addVisitorParams: AddVisitorRepositoryParams) => Promise<Visitor>
}
