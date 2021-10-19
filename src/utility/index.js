const generateDays = (options, { init, selected, switched }) => {
	console.log(options)
	const {
		day: in_day,
		month: in_month,
		year: in_year
	} = init
	const {
		day: se_day,
		month: se_month,
		year: se_year
	} = selected
	const {
		month: sw_month,
		year: sw_year
	} = switched

	console.log('init', init)
	
	const {
		type,
		days,
		counter,
		month,
		year,
		is_outside_active,
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
				is_outside_active,
				is_current: day === in_day && month === in_month && year === in_year,
				is_selected: day === se_day && month === se_month && year === se_year,
			}
		})
}

export {
	generateDays
}