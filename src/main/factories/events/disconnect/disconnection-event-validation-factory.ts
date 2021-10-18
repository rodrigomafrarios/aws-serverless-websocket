import { ValidationComposite, RequiredFieldValidation } from '../../../../presentation/helpers/validators'
import { Validation } from '../../../../presentation/interfaces/validation'

export const makeDisConnectionEventValidation = (): ValidationComposite => {
	const validations: Validation[] = []
	for (const field of ['sourceIp', 'connectionId']) {
		validations.push(new RequiredFieldValidation(field))
	}
	return new ValidationComposite(validations)
}
