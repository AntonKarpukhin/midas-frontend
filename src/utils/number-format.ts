export default function numberFormat(value: number, locale = 'ru-RU', options = {}) {
	return new Intl.NumberFormat(locale, options).format(value);
}
