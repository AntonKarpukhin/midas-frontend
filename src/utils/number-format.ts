export default function numberFormat(value, locale = 'ru-RU', options = {}) {
	return new Intl.NumberFormat(locale, options).format(value);
}
