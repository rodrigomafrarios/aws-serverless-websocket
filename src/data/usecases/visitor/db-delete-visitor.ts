import { DeleteVisitorRepository } from '../../interfaces/db/delete-visitor-repository'
import { DeleteVisitor, DeleteVisitorParams } from '../../../domain/usecases/visitor/delete-visitor'

export class DbDeleteVisitor implements DeleteVisitor {
  constructor (private readonly deleteVisitorRepository: DeleteVisitorRepository) {}
  async delete (deleteVisitorParams: DeleteVisitorParams): Promise<boolean> {
    const deleted = await this.deleteVisitorRepository.delete({
      clientId: deleteVisitorParams.connectionId,
      ip: deleteVisitorParams.sourceIp
    })
    return deleted
  }
}
