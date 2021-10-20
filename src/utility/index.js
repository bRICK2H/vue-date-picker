const generateDays = (options, { initiated, selectable, switchable }) => {
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
		month: sw_month,
		year: sw_year
	} = switchable

	console.log('initiated', initiated)
	
	const {
		type,
		days,
		counter,
		month,
		year,
		outsideActive,
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
				outsideActive,
				isCurrent: day === in_day && month === in_month && year === in_year,
				isSelected: day === se_day && month === se_month && year === se_year,
			}
		})
}

export {
	generateDays
}