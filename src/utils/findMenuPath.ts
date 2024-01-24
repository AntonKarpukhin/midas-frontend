export const findMenuPath = ( text: string): string => {
	const initial = {
		['Акции']: 'stock',
		['Горячие блюда']: 'hot',
		['Супы']: 'soups',
		['Хинкали']: 'khinkali',
		['Холодные закуски']: 'cold',
		['Салаты']: 'salads',
		['Свежая выпечка']: 'bakery',
		['Десерты']: 'dessert',
		['Напитки']: 'beverages',
	}

	return Object.entries(initial).filter(item => item[1] === text).flat()[0]
}