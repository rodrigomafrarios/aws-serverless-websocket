import { AddVisitorRepository } from '@/data/interfaces/db/add-visitor-repository'
import { DbAddVisitor } from '@/data/usecases/visitor/db-add-visitor'
import { mockAddVisitorRepositoryStub, mockEventData, mockVisitor } from '@/tests/mocks/visitor-mocks'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbAddVisitor
  addVisitorRepositoryStub: AddVisitorRepository
}

const makeSut = (): SutTypes => {
  const addVisitorRepositoryStub = mockAddVisitorRepositoryStub()
  const sut = new DbAddVisitor(addVisitorRepositoryStub)
  return {
    sut,
    addVisitorRepositoryStub
  }
}

describe('DbAddVisitor - UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  it('should call AddVisitorRepository with correct values', async () => {
    const { sut, addVisitorRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addVisitorRepositoryStub, 'add')
    await sut.add(mockEventData())
    expect(addSpy).toHaveBeenCalledWith(mockVisitor())
  })
  it('should return a visitor if AddVisitorRepository succeeds', async () => {
    const { sut } = makeSut()
    const visitor = await sut.add(mockEventData())
    expect(visitor).toEqual(mockVisitor())
  })
  it('should return null if AddVisitorRepository fails', async () => {
    const { sut, addVisitorRepositoryStub } = makeSut()
    jest.spyOn(addVisitorRepositoryStub, 'add').mockReturnValueOnce(null)
    const visitor = await sut.add(mockEventData())
    expect(visitor).toBeNull()
  })
})
