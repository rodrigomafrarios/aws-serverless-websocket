import { DeleteVisitor } from '@/domain/usecases/visitor/delete-visitor'
import { DisconnectionEvent } from '@/presentation/events/disconnection-event'
import { Validation } from '@/presentation/interfaces/validation'
import { makeValidation } from '@/tests/mocks/validation-mocks'
import { mockDeleteVisitorStub } from '@/tests/mocks/visitor-mocks'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DisconnectionEvent
  validatorStub: Validation
  deleteVisitorStub: DeleteVisitor
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidation()
  const deleteVisitorStub = mockDeleteVisitorStub()
  const sut = new DisconnectionEvent(validatorStub, deleteVisitorStub)
  return {
    sut,
    validatorStub,
    deleteVisitorStub
  }
}

describe('DisconnectionEvent', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  it('should call validation with correct values', async () => {
    const { sut, validatorStub } = makeSut()
    const validationSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle({
      sourceIp: '127.0.0.1',
      connectionId: 'any-connection-id'
    })
    expect(validationSpy).toHaveBeenCalledWith({
      sourceIp: '127.0.0.1',
      connectionId: 'any-connection-id'
    })
  })
  it('should return false if validation fails', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new Error())
    const response = await sut.handle({
      sourceIp: '127.0.0.1',
      connectionId: 'any-connection-id'
    })
    expect(response).toBeFalsy()
  })
  it('should call deleteVisitor with correct values', async () => {
    const { sut, deleteVisitorStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteVisitorStub, 'delete')
    await sut.handle({
      sourceIp: '127.0.0.1',
      connectionId: 'any-connection-id'
    })
    expect(deleteSpy).toHaveBeenCalledWith({
      sourceIp: '127.0.0.1',
      connectionId: 'any-connection-id'
    })
  })
  it('should return false if deleteVisitor throws', async () => {
    const { sut, deleteVisitorStub } = makeSut()
    jest.spyOn(deleteVisitorStub, 'delete').mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await sut.handle({
      sourceIp: '127.0.0.1',
      connectionId: 'any-connection-id'
    })
    expect(response).toBeFalsy()
  })
  it('should return false if deleteVisitor returns false', async () => {
    const { sut, deleteVisitorStub } = makeSut()
    jest.spyOn(deleteVisitorStub, 'delete').mockReturnValueOnce(Promise.resolve(false))
    const response = await sut.handle({
      sourceIp: '127.0.0.1',
      connectionId: 'any-connection-id'
    })
    expect(response).toBeFalsy()
  })
  it('should return true if succeeds', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      sourceIp: '127.0.0.1',
      connectionId: 'any-connection-id'
    })
    expect(response).toBeTruthy()
  })
})
