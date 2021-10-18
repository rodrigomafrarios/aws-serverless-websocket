import { ConnectionEvent } from '@/presentation/events/connection-event'
import { Validation } from '@/presentation/interfaces/validation'
import { AddVisitor } from '@/domain/usecases/visitor/add-visitor'
import { makeValidation } from '@/tests/mocks/validation-mocks'
import { mockAddVisitorStub, mockEventData } from '@/tests/mocks/visitor-mocks'
import MockDate from 'mockdate'

type SutTypes = {
  sut: ConnectionEvent
  validatorStub: Validation
  addVisitorStub: AddVisitor
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidation()
  const addVisitorStub = mockAddVisitorStub()
  const sut = new ConnectionEvent(validatorStub, addVisitorStub)
  return {
    sut,
    validatorStub,
    addVisitorStub
  }
}

describe('ConnectionEvent', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  it('should call validation with correct values', async () => {
    const { sut, validatorStub } = makeSut()
    const validationSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle(mockEventData())
    expect(validationSpy).toHaveBeenCalledWith(mockEventData())
  })
  it('should return false if validation fails', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new Error())
    const response = await sut.handle(mockEventData())
    expect(response).toBeFalsy()
  })
  it('should call addVisitor with correct values', async () => {
    const { sut, addVisitorStub } = makeSut()
    const addSpy = jest.spyOn(addVisitorStub, 'add')
    await sut.handle(mockEventData())
    expect(addSpy).toHaveBeenCalledWith({
      sourceIp: '127.0.0.1',
      connectionId: 'any-connection-id',
      requestTimeEpoch: new Date().getTime(),
      route: 'any-route',
      shop: 'any-shop'
    })
  })
  it('should return false if addVisitor throws', async () => {
    const { sut, addVisitorStub } = makeSut()
    jest.spyOn(addVisitorStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.handle(mockEventData())
    expect(response).toBeFalsy()
  })
  it('should return false if addVisitor returns null', async () => {
    const { sut, addVisitorStub } = makeSut()
    jest.spyOn(addVisitorStub, 'add').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.handle(mockEventData())
    expect(response).toBeFalsy()
  })
  it('should return true if succeeds', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockEventData())
    expect(response).toBeTruthy()
  })
})
