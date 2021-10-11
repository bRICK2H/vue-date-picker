<template>
	<div class="v-date-picker-container wrapper__v-date-picker-container">

		<div class="v-date-picker-header v-date-picker-container__v-date-picker-header">
			<span class="v-date-picker-btn v-date-picker-prev"
				:style="setStyleHeaderBtn"
				@click="calculateMonth(-1)"
			></span>
			<div :style="setStyleTitle" class="v-date-picker-box-title">
				<span class="v-date-picker-month-title"
					@click="openMonths"
				>
					{{ getCurrMonth }},
				</span>
				<span class="v-date-picker-year-title"
					@click="openYears"
				>
					{{ currYear }}
				</span>
			</div>
			<span class="v-date-picker-btn v-date-picker-next"
				:style="setStyleHeaderBtn"
				@click="calculateMonth(1)"
			></span>
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
				v-for="({ type, day, month, year, selected = null }, i) of calendarDays"
				:key="`${day}:${i}`"
				:type="type"
				:day="day"
				:selected="selected"
				:cellSize="cellSize"
				:isActiveOutside="isActiveOutside"
				@select-day="selectDay(i, type, day, month, year)"
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
			return new Date(new Date(`${this.currYear}-${this.getNextMonth}-1`) - 1).getDate()
		},
		getPrevMonth() {
			return this.currMonth === 1
				? this.lastMonth
				: this.currMonth - 1
		},
		getLastDayPrevMonth() {
			return new Date(new Date(`${this.currYear}-${this.currMonth}-1`) - 1).getDate()
		},
		getPrevYear() {
			return this.currMonth === 1
				? this.currYear - 1
				: this.currYear
		},
		getNextMonth() {
			return this.currMonth === this.lastMonth
				? 1
				: this.currMonth + 1
		},
		getNextYear() {
			return this.currMonth === this.lastMonth
				? this.currYear + 1
				: this.currYear
		},

		setStyleCalendarContainer() {
			return {
				width: `${(this.cellSize * 7) + this.cellSize + 7}px`,
				height: `${(this.cellSize * 7) + this.cellSize + 7}px`,
			}
		},
		setStyleTitle() {
			return { fontSize: `${this.cellSize / 2}px` }
		},
		setStyleHeaderBtn() {
			return { width: `calc(${(this.cellSize / 2) - 3}px)`, height: `calc(${Math.ceil(this.cellSize / 3)}px )` }
		},
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
			const { year, month, day } = this.selectedDate
			const PREV_DAYS = this.getDays('prev')
			const CURR_DAYS = this.getDays('curr')
			const NEXT_DAYS = this.getDays('next', PREV_DAYS, CURR_DAYS)
			this.calendarDays = [...PREV_DAYS, ...CURR_DAYS, ...NEXT_DAYS]

			const INDEX_DATE = this.calendarDays.findIndex(c => {
				return c.month === month && c.year === year && c.day === day
			})
			
			if (INDEX_DATE !== -1) {
				this.$set(this.calendarDays[INDEX_DATE], 'selected', true)
			}
		},
		selectDay(i, type, day, month, year) {
			this.currDay = day
			this.currMonth = month
			this.currYear = year
			this.setSelectedDate(year, month, day)

			if (type === 'curr') {
				this.calendarDays.forEach(c => {
					if (c.selected !== undefined) {
						this.$delete(c, 'selected')
					}
				})
	
				this.$set(this.calendarDays[i], 'selected', true)

			} else if (this.isActiveOutside) {
				this.createCalendar()
			}

			this.$emit('input', new Date(`${year}-${month}-${day}`))
		},
		setSelectedDate(y, m, d) {
			this.$set(this.selectedDate, 'year', y)
			this.$set(this.selectedDate, 'month', m)
			this.$set(this.selectedDate, 'day', d)
		},
		openMonths() {
			console.log('openMonths')
		},
		openYears() {
			console.log('openYears')
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
								this.dayWeeks,
								this.getLastDayPrevMonth - (this.dayWeeks - 1),
								this.getPrevMonth,
								this.getPrevYear
							)
					}

				case 'curr': {
					return generateDays(
						type,
						this.getCurrLastDayMonth,
						1,
						this.currMonth,
						this.currYear
					)
				}

				case 'next': {
					return generateDays(
						type,
						this.totalDays - (prevDays.length + currDays.length),
						1,
						this.getNextMonth,
						this.getNextYear
					)
				}
			}
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

				this.setSelectedDate(this.currYear, this.currMonth, this.currDay)
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
			margin: 10px 0 20px;
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
	.v-date-picker-btn {
		cursor: pointer;
		position: relative;
		transition: .2s;

		&:hover {
			opacity: .6;
			transform: scale(1.2);
		}
	}
	.v-date-picker-prev,
	.v-date-picker-next {
		&::before, &::after {
			content: '';
			width: 100%;
			height: 3px;
			border-radius: 2px;
			background: #1f1f33;
			position: absolute;
		}
	}
	.v-date-picker-prev {
		&::before {
			top: 0;
			transform: rotate(-45deg);
		}
		&::after {
			bottom: 0;
			left: 0;
			transform: rotate(45deg);
		}
	}
	.v-date-picker-next {
		&::before {
			top: 0;
			transform: rotate(45deg);
		}
		&::after {
			bottom: 0;
			left: 0;
			transform: rotate(-45deg);
		}
	}
	.v-date-picker-box-title {
		font-weight: 600;
		color: #1f1f33;
	}
	.v-date-picker-month-title,
	.v-date-picker-year-title {
		transition: .2s;
		cursor: pointer;
	}
	.v-date-picker-month-title,
	.v-date-picker-year-title {

		&:hover {
			opacity: .6;
		}
	}
</style>