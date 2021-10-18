<template>
	<div class="v-days-container"
		:style="setStyleDaysContainer"
	>
		<VDayWeek v-for="(dw, i) of daysWeek"
			:key="`${dw}:${i}`"
			:dayWeek="dw"
			:size="size"
		/>

		<VDay
			v-for="day of days"
			:key="`${day.month}:${day.day}`"
			:option="day"
			:size="size"
			@select-day="$emit('select-day', day)"
		>
			<slot v-bind="day" />
		</VDay>
	</div>
</template>

<script>
import { generateDays } from '../../utility/index'
import VDay from './v-day'
import VDayWeek from './v-day-week'

export default {
	name: 'VDays',
	components: {
		VDay,
		VDayWeek
	},
	props: [
		'init',
		'size',
		'daysWeek',
		'selected',
		'switched',
		'is_outside_active'
	],
	data: () => ({
		days: [],
		amountDays: 42,
		amountMonth: 12,
		amountDayWeeks: 7,
	}),
	computed: {
		getCurrFirstDayWeekId() {
			const { year, month } = this.switched
			const FIRST_DAY = new Date(`${year}-${month}-1`).getDay()
			return FIRST_DAY === 0 ? this.amountDayWeeks : FIRST_DAY
		},
		getLastDayPrevMonth() {
			const { year, month } = this.switched
			return new Date(new Date(`${year}-${month}-1`) - 1).getDate()
		},
		getCurrLastDayMonth() {
			const { year } = this.switched
			return new Date(new Date(`${year}-${this.getNextMonth}-1`) - 1).getDate()
		},
		getNextMonth() {
			const { month } = this.switched
			return month === this.amountMonth
				? 1
				: month + 1
		},
		getPrevMonth() {
			const { month } = this.switched
			return month === 1
				? this.amountMonth
				: month - 1
		},
		getPrevYear() {
			const { year, month } = this.switched
			return month === 1
				? year - 1
				: year
		},
		getNextYear() {
			const { year, month } = this.switched
			return month === this.amountMonth
				? year + 1
				: year
		},
		setStyleDaysContainer() {
			return {
				width: `${(this.size * 7) + this.size + 7}px`,
				height: `${(this.size * 7) + this.size + 7}px`,
			}
		},
	},
	methods: {
		createDays() {
			// const { year: i_year, month: i_month, day: i_day } = this.init
			// const { year: s_year, month: s_month, day: s_day } = this.selected
			const PREV_DAYS = this.getDays('prev')
			const CURR_DAYS = this.getDays('curr')
			const NEXT_DAYS = this.getDays('next', PREV_DAYS, CURR_DAYS)
			this.days = [...PREV_DAYS, ...CURR_DAYS, ...NEXT_DAYS]

			/**
			 * 1. Разобраться со всем текущим подходом вывода дат
			 * 2. Название переменных и функций
			 * 3. * на данных момент не работает свич дат и месяцев (продумать более выгодный подход)
			 * 
			 * 4. --- Доконца разобраться с вызовами функций и запясями значений (switched, selected)
			 */
	
			// this.days.forEach((c, ci) => {
			// 	if (c.month === s_month && c.year === s_year && c.day === s_day) {
			// 		this.$set(this.days[ci], 'dt_selected', true)
			// 	}
				
			// 	if (c.month === i_month && c.year === i_year && c.day === i_day) {
			// 		this.$set(this.days[ci], 'dt_current', true)
			// 	}
			// })
		},
		getDays(type, prevDays = 0, currDays = 0) {
			const extra = {
				init: this.init,
				selected: this.selected,
				switched: this.switched
			}

			switch (type) {
				case 'prev': {
					const PREV_AMOUNT_DAYS = this.getCurrFirstDayWeekId - 1
	
					return PREV_AMOUNT_DAYS > 0
						? generateDays({
								type,
								days: PREV_AMOUNT_DAYS,
								counter: this.getLastDayPrevMonth - (PREV_AMOUNT_DAYS - 1),
								month: this.getPrevMonth,
								year: this.getPrevYear,
								is_outside_active: this.is_outside_active,
							}, extra)
						: generateDays({
								type,
								days: this.amountDayWeeks,
								counter: this.getLastDayPrevMonth - (this.amountDayWeeks - 1),
								month: this.getPrevMonth,
								year: this.getPrevYear,
								is_outside_active: this.is_outside_active,
							}, extra)
					}
	
				case 'curr': {
					const { year, month } = this.switched
					return generateDays({
						type,
						days: this.getCurrLastDayMonth,
						counter: 1,
						month,
						year,
						is_outside_active: null,
					}, extra)
				}
	
				case 'next': {
					return generateDays({
						type,
						days: this.amountDays - (prevDays.length + currDays.length),
						counter: 1,
						month: this.getNextMonth,
						year: this.getNextYear,
						is_outside_active: this.is_outside_active,
					}, extra)
				}
			}
		},
	},
	watch: {
		// selected: {
		// 	deep: true,
		// 	immediate: true,
		// 	handler(value) {
		// 		console.log('selected', value)
		// 		this.createDays()
		// 	}
		// },
		switched: {
			deep: true,
			immediate: true,
			handler(value) {
				console.log('switched', value)
				this.createDays()
			}
		}
	}
}
</script>

<style lang="scss">
	.v-days-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-content: space-around;
	}
</style>