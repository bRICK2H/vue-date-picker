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
			v-for="({
				type,
				year,
				month,
				day,
				dt_selected = false,
				dt_current = false
			}, i) of days"
			:key="`${day}:${i}`"
			:year="year"
			:month="month"
			:day="day"
			:type="type"
			:size="size"
			:dt_selected="dt_selected"
			:dt_current="dt_current"
			:dt_outside_active="dt_outside_active"
			@select-day="selectDay(i, type, day, month, year)"
		>
			<slot v-bind="{ type, day, month, year, dt_selected, dt_current }" />
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
	props: ['daysWeek', 'init', 'selected', 'size', 'dt_outside_active'],
	data: () => ({
		days: [],
		amountDays: 42,
		amountMonth: 12,
		amountDayWeeks: 7,
	}),
	computed: {
		getCurrFirstDayWeekId() {
			const { year, month } = this.selected
			const FIRST_DAY = new Date(`${year}-${month}-1`).getDay()
			return FIRST_DAY === 0 ? this.amountDayWeeks : FIRST_DAY
		},
		getLastDayPrevMonth() {
			const { year, month } = this.selected
			return new Date(new Date(`${year}-${month}-1`) - 1).getDate()
		},
		getCurrLastDayMonth() {
			const { year } = this.selected
			return new Date(new Date(`${year}-${this.getNextMonth}-1`) - 1).getDate()
		},
		getNextMonth() {
			const { month } = this.selected
			return month === this.amountMonth
				? 1
				: month + 1
		},
		getPrevMonth() {
			const { month } = this.selected
			return month === 1
				? this.amountMonth
				: month - 1
		},
		getPrevYear() {
			const { year, month } = this.selected
			return month === 1
				? year - 1
				: year
		},
		getNextYear() {
			const { year, month } = this.selected
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
		createCalendarDays() {
			const { year: i_year, month: i_month, day: i_day } = this.init
			const { year: s_year, month: s_month, day: s_day } = this.selected
			const PREV_DAYS = this.getDays('prev')
			const CURR_DAYS = this.getDays('curr')
			const NEXT_DAYS = this.getDays('next', PREV_DAYS, CURR_DAYS)
			this.days = [...PREV_DAYS, ...CURR_DAYS, ...NEXT_DAYS]

			/**
			 * 1. Разобраться со всем текущим подходом вывода дат
			 * 2. Название переменных и функций
			 * 3. * на данных момент не работает свич дат и месяцев (продумать более выгодный подход)
			 */
	
			this.days.forEach((c, ci) => {
				if (c.month === s_month && c.year === s_year && c.day === s_day) {
					this.$set(this.days[ci], 'dt_selected', true)
				}
				
				if (c.month === i_month && c.year === i_year && c.day === i_day) {
					this.$set(this.days[ci], 'dt_current', true)
				}
			})
		},
		getDays(type, prevDays = 0, currDays = 0) {
			switch (type) {
				case 'prev': {
					const PREV_AMOUNT_DAYS = this.getCurrFirstDayWeekId - 1
	
					return PREV_AMOUNT_DAYS > 0
						? generateDays(
								type,
								PREV_AMOUNT_DAYS,
								this.getLastDayPrevMonth - (PREV_AMOUNT_DAYS - 1),
								this.getPrevMonth,
								this.getPrevYear
							)
						: generateDays(
								type,
								this.amountDayWeeks,
								this.getLastDayPrevMonth - (this.amountDayWeeks - 1),
								this.getPrevMonth,
								this.getPrevYear
							)
					}
	
				case 'curr': {
					const { year, month } = this.selected
					return generateDays(
						type,
						this.getCurrLastDayMonth,
						1,
						month,
						year
					)
				}
	
				case 'next': {
					console.warn('h', type, this.amountDays)
					return generateDays(
						type,
						this.amountDays - (prevDays.length + currDays.length),
						1,
						this.getNextMonth,
						this.getNextYear
					)
				}
			}
		},
	},
	watch: {
		init: {
			immediate: true,
			handler() {
				console.log('init')
				this.createCalendarDays()
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