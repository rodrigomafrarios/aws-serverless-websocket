import { ValidationComposite, RequiredFieldValidation } from '../../../../presentation/helpers/validators'
import { Validation } from '../../../../presentation/interfaces/validation'

export const makeConnectionEventValidation = (): ValidationComposite => {
	const validations: Validation[] = []
	for (const field of ['sourceIp', 'connectionId', 'requestTimeEpoch']) {
		validations.push(new RequiredFieldValidation(field))
	}
	return new ValidationComposite(validations)
}
