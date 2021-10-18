import { DeleteVisitorRepository } from '@/data/interfaces/db/delete-visitor-repository'
import { mockDeleteVisitor, mockDeleteVisitorRepositoryStub } from '@/tests/mocks/visitor-mocks'
import MockDate from 'mockdate'
import { DbDeleteVisitor } from '@/data/usecases/visitor/db-delete-visitor'

type SutTypes = {
  sut: DbDeleteVisitor
  deleteVisitorRepositoryStub: DeleteVisitorRepository
}

const makeSut = (): SutTypes => {
  const deleteVisitorRepositoryStub = mockDeleteVisitorRepositoryStub()
  const sut = new DbDeleteVisitor(deleteVisitorRepositoryStub)
  return {
    sut,
    deleteVisitorRepositoryStub
  }
}

describe('DbDeleteVisitor - UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  it('should call DeleteVisitorRepository with correct values', async () => {
    const { sut, deleteVisitorRepositoryStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteVisitorRepositoryStub, 'delete')
    await sut.delete({
      sourceIp: '127.0.0.1',
      connectionId: 'any-connection-id'
    })
    expect(deleteSpy).toHaveBeenCalledWith(mockDeleteVisitor())
  })
  it('should return false if DeleteVisitorRepository fails', async () => {
    const { sut, deleteVisitorRepositoryStub } = makeSut()
    jest.spyOn(deleteVisitorRepositoryStub, 'delete').mockResolvedValueOnce(false)
    const deleted = await sut.delete({
      sourceIp: '127.0.0.1',
      connectionId: 'any-connection-id'
    })
    expect(deleted).toBeFalsy()
  })
  it('should return true if DeleteVisitorRepository succeeds', async () => {
    const { sut } = makeSut()
    const deleted = await sut.delete({
      sourceIp: '127.0.0.1',
      connectionId: 'any-connection-id'
    })
    expect(deleted).toBeTruthy()
  })
})
