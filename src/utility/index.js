const generateDays = (type, days, counter, month, year) => {
	return new Array(days)
		.fill(null)
		.map((c, i) => ({ type, day: i + counter, month, year }))
}

export {
	generateDays
}