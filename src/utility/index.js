const generateDays = (days, type, counter) => {
	return new Array(days)
		.fill(null)
		.map((c, i) => ({ type, day: i + counter }))
}

export {
	generateDays
}