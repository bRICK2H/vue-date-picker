<template>
	<div class="v-date-picker-container wrapper__v-date-picker-container">

		<div class="v-date-picker-header v-date-picker-container__v-date-picker-header">
			<span class="v-date-btn v-date-prev"
				@click="calculateMonth(-1)"
			>&larr;</span>
			<div :style="setStyleTitle">
				<span class="v-date-picker-title">{{ getCurrMonth }}, {{ currYear }}</span>
			</div>
			<span class="v-date-btn v-date-next"
				@click="calculateMonth(1)"
			>&rarr;</span>
		</div>
		
		<div class="v-date-picker-body"
			:style="setStyleCalendarContainer"
		>
			<VDayWeek v-for="(dw, i) of daysWeek"
				:key="`${dw}:${i}`"
				:dayWeek="dw"
				:cellSize="cellSize"
			/>

			<VDay
				v-for="({ type, day, selected = null }, i) of calendarDays"
				:key="`${day}:${i}`"
				:type="type"
				:day="day"
				:selected="selected"
				:cellSize="cellSize"
				:isActiveOutside="isActiveOutside"
				@select-day="selectDay(type, i, day)"
			>
				<slot name="item"
					v-bind="{ type, day, i }"
				/>
			</VDay>
		</div>

	</div>
</template>

<script>
import VDay from './v-day.vue'
import VDayWeek from './v-day-week.vue'
import { generateDays } from '../utility'

export default {
	name: 'VDatePicker',
	components: {
		VDay,
		VDayWeek
	},
	props: {
		date: {
			type: Date,
			default: new Date
		},
		cellSize: {
			type: Number,
			default: 36
		},
		isActiveOutside: {
			type: Boolean,
			default: false
		}
	},
	data: () => ({
		daysWeek: {
			1: 'Пн',
			2: 'Вт',
			3: 'Ср',
			4: 'Чт',
			5: 'Пт',
			6: 'Сб',
			7: 'Вс'
		},
		months: {
			1: 'Январь',
			2: 'Ферваль',
			3: 'Март',
			4: 'Апрель',
			5: 'Май',
			6: 'Июнь',
			7: 'Июль',
			8: 'Август',
			9: 'Сентябрь',
			10: 'Октябрь',
			11: 'Ноябрь',
			12: 'Декабрь'
		},
		calendarDays: [],
		totalDays: 42,
		lastMonth: 12,
		dayWeeks: 7,
		currDay: null,
		currMonth: null,
		currYear: null,
		initDate: {},
		selectedDate: {}
	}),
	computed: {
		getCurrMonth() {
			return this.months[this.currMonth]
		},
		getCurrFirstDayWeekId() {
			const FIRST_DAY = new Date(`${this.currYear}-${this.currMonth}-1`).getDay()
			return FIRST_DAY === 0 ? this.dayWeeks : FIRST_DAY
		},
		getCurrLastDayMonth() {
			return new Date(new Date(`${this.currYear}-${this.getNextMonthId}-1`) - 1).getDate()
		},
		getNextMonthId() {
			return this.currMonth + 1 > this.lastMonth ? 1 : this.currMonth + 1
		},
		getPrevMonthId() {
			return this.currMonth - 1 === 0 ? this.lastMonth : this.currMonth - 1
		},

		getLastDayPrevMonth() {
			return new Date(new Date(`${this.currYear}-${this.currMonth}-1`) - 1).getDate()
		},

		setStyleCalendarContainer() {
			return {
				width: `${(this.cellSize * 7) + this.cellSize + 7}px`,
				height: `${(this.cellSize * 7) + this.cellSize + 7}px`,
			}
		},
		setStyleTitle() {
			return { fontSize: `${this.cellSize / 2}px` }
		}
	},
	methods: {
		calculateMonth(count) {
			this.currMonth += count

			if (this.currMonth > this.lastMonth) {
				this.currMonth = 1
				this.currYear += 1
			} else if (this.currMonth < 1) {
				this.currMonth = this.lastMonth
				this.currYear -= 1
			}


			this.createCalendar()
		},
		createCalendar() {
			const PREV_AMOUNT_DAYS = this.getCurrFirstDayWeekId - 1
			console.warn(PREV_AMOUNT_DAYS)
			const PREV_DAYS = PREV_AMOUNT_DAYS > 0
				? generateDays(PREV_AMOUNT_DAYS, 'prev', this.getLastDayPrevMonth - (PREV_AMOUNT_DAYS - 1))
				: generateDays(this.dayWeeks, 'prev', this.getLastDayPrevMonth - (this.dayWeeks - 1))
			const CURR_DAYS = generateDays(this.getCurrLastDayMonth, 'curr', 1)
			const NEXT_DAYS = generateDays(this.totalDays - (PREV_DAYS.length + CURR_DAYS.length), 'next', 1)
			console.log({PREV_DAYS, CURR_DAYS, NEXT_DAYS})

			this.calendarDays = [...PREV_DAYS, ...CURR_DAYS, ...NEXT_DAYS]

			if (this.selectedDate?.date) {
				const {
					selectedYear,
					selectedMonth,
					type,
					day,
					i
				} = this.selectedDate

				console.warn({
					currMonth: this.currMonth,
					selectedMonth,
					currYea: this.currYear,
					selectedYear,
				})

				// if (selectedMonth === this.currMonth && selectedYear === this.currYear) {
				// 	this.$set(this.calendarDays[i], 'selected', true)
				// }

				if (selectedMonth === this.currMonth && selectedYear === this.currYear) {
					this.$set(this.calendarDays[i], 'selected', true)
				} else if ((type === 'prev' || type === 'next') && (selectedMonth - 1 === this.currMonth || selectedMonth + 1 === this.currMonth)) {
					const ind = this.calendarDays.findIndex(c => c.type === 'curr' && c.day === day)

					if (ind !== -1) {
						this.$set(this.calendarDays[ind], 'selected', true)
					}
				} else if (type === 'curr') {
					if (selectedMonth - 1 === this.currMonth) {
						const ind = this.calendarDays.findIndex(c => c.type === 'next' && c.day === day)
						
						if (ind !== -1) {
							this.$set(this.calendarDays[ind], 'selected', true)
						}
					} else if (selectedMonth + 1 === this.currMonth) {
						const ind = this.calendarDays.findIndex(c => c.type === 'prev' && c.day === day)
						
						if (ind !== -1) {
							this.$set(this.calendarDays[ind], 'selected', true)
						}
					}
				}
			} else {
				const {
					day,
					month,
					year
				} = this.initDate
				const currIndex = this.calendarDays.findIndex(c => c.type === 'curr' && c.day === day)

				if (month === this.currMonth && year === this.currYear) {
					this.$set(this.calendarDays[currIndex], 'selected', true)
				}
			}
		},
		// selectDay(type, i, day) {
		// 	if (type === 'curr') {
		// 		this.calendarDays.forEach(c => {
		// 			if (c.selected !== undefined) {
		// 				this.$delete(c, 'selected')
		// 			}
		// 		})

		// 		this.$set(this.calendarDays[i], 'selected', true)
		// 		this.selectedDate = {
		// 			index: i,
		// 			selectedYear: this.currYear,
		// 			selectedMonth: this.currMonth,
		// 			date: new Date(`${this.currYear}-${this.currMonth}-${day}`)
		// 		}

		// 		this.$emit('input', this.selectedDate.date)
		// 	}
		// },
		selectDay(type, i, day) {
			this.currDay = day

			this.selectedDate = {
				i,
				day,
				type,
				selectedYear: this.currYear,
				selectedMonth: this.currMonth,
				date: new Date(`${this.currYear}-${this.currMonth}-${day}`)
			}

			if (type === 'curr') {
				this.calendarDays.forEach(c => {
					if (c.selected !== undefined) {
						this.$delete(c, 'selected')
					}
				})
	
				this.$set(this.calendarDays[i], 'selected', true)
			} else if (this.isActiveOutside) {
				console.log('outside click', { type, i, day })
				if (type === 'prev') {
					this.calculateMonth(-1)
				} else if (type === 'next') {
					this.calculateMonth(1)
				}
			}

			this.$emit('input', this.selectedDate.date)
		}
	},
	watch: {
		date: {
			immediate: true,
			handler(dt) {
				console.log('watch: dt', dt)
				this.currDay = dt.getDate()
				this.currMonth = dt.getMonth() + 1
				this.currYear = dt.getFullYear()
				this.initDate = Object.freeze({
					day: this.currDay,
					month: this.currMonth,
					year: this.currYear
				})

				this.createCalendar()
			}
		}
	}
}
</script>

<style lang="scss">
	.v-date-picker-container {
		margin: auto;
		user-select: none;
		background-color: #fff;
		padding: 24px;
		border-radius: 12px;
		box-shadow: 0px 12px 32px -4px rgba(26, 32, 44, .08),
						0px 0px 12px -3px rgba(26, 32, 44, .04);

		&__v-date-picker-header {
			margin-bottom: 20px;
		}
	}
	.v-date-picker-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.v-date-picker-body {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-content: space-around;
	}
	.v-date-btn {
		cursor: pointer;
	}
	.v-date-picker-title {
		font-weight: 600;
		color: #1f1f33;
	}
</style>