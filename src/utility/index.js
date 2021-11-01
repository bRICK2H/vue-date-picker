const generateDays = (options, { initiated, selectable }) => {
	console.log(options)
	const {
		day: in_day,
		month: in_month,
		year: in_year
	} = initiated
	const {
		day: se_day,
		month: se_month,
		year: se_year
	} = selectable
	
	const {
		type,
		days,
		counter,
		month,
		year,
		isOutsideDays,
	} = options

	return new Array(days)
		.fill(null)
		.map((c, i) => {
			const day = i + counter
			
			return {
				type,
				day,
				month,
				year,
				isOutsideDays,
				isCurrent: day === in_day && month === in_month && year === in_year,
				isSelected: day === se_day && month === se_month && year === se_year,
			}
		})
}

export {
	generateDays
}