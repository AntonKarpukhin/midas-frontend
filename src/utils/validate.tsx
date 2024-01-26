export const validateInput = (fieldName: string, value: string) => {
	switch (fieldName) {
		case 'username':
			return value.trim().length > 2;

		case 'password':
			if (value === null) {
				return true
			} else if (value.trim().length === 0 ) {
				return true
			} else {
				return value.trim().length > 4;
			}
		case 'phone':
			return /^\+7\d{10}$/.test(value);

		case 'email':
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

		case 'street':
			return value.trim().length > 1;

		case 'house':
			return value.trim().length > 0;

		case 'room':
			return value.trim().length > 0;

		default:
			return true;
	}
};

export const validateData = (data: any) => {
	let validatedData: any = {};

	for (const fieldName in data) {
		const value = data[fieldName];
		const isValid = validateInput(fieldName, value);

		if (!isValid) {
			return fieldName
		}

		validatedData[fieldName] = value;
	}

	return validatedData;
};


export const checkMessageError = (s: string) => {
	switch (s) {
		case 'username':
			return 'Имя пользователя должно быть не менее 2 символов';

		case 'password':
			return 'Пароль должен быть не менее 6 символов';
		case 'phone':
			return 'Неккоректно заполнен телефон';

		case 'email':
			return 'Неккоректно заполнена почта';

		case 'street':
			return 'Название улицы должно быть не менее 2 букв';

		case 'house':
			return 'Номер дома должен быть не менее 1 цифры';

		case 'room':
			return 'Номер квартиры должен быть не менее 1 цифры';

		default:
			return '';
	}
}