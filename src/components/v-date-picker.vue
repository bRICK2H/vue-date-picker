<template>
	<div class="v-date-picker-container wrapper__v-date-picker-container">

		<div class="v-date-picker-header v-date-picker-container__v-date-picker-header">
			<div :style="setStyleHeaderBtnBox"
				class="v-date-picker-btn-box"
				@click="switchDate(-1, getCurrTemplate)"
			>
				<span class="v-date-picker-btn v-date-picker-prev" :style="setStyleHeaderBtn"></span>
			</div>
			<div :style="setStyleTitle" class="v-date-picker-box-title">
				<span v-show="template['days']"
					class="v-date-picker-month-title"
					@click="changeTemplate('months')"
				>
					{{ getCurrMonth }},
				</span>
				<span class="v-date-picker-year-title"
					@click="openYears"
				>
					{{ currYear }}
				</span>
			</div>
			<div :style="setStyleHeaderBtnBox"
				class="v-date-picker-btn-box"
				@click="switchDate(1, getCurrTemplate)"
			>
				<span class="v-date-picker-btn v-date-picker-next" :style="setStyleHeaderBtn"></span>
			</div>
		</div>
		
		<div v-if="template['days']"
			class="v-date-picker-body"
			:style="setStyleCalendarContainer"
		>
			<VDayWeek v-for="(dw, i) of daysWeek"
				:key="`${dw}:${i}`"
				:dayWeek="dw"
				:cellSize="cellSize"
			/>

			<VDay
				v-for="({
					type,
					year,
					month,
					day,
					dt_selected = false,
					dt_current = false
				}, i) of calendarDays"
				:key="`${day}:${i}`"
				:year="year"
				:month="month"
				:day="day"
				:type="type"
				:cellSize="cellSize"
				:dt_selected="dt_selected"
				:dt_current="dt_current"
				:dt_outside_active="dt_outside_active"
				@select-day="selectDay(i, type, day, month, year)"
			>
				<slot v-bind="{ type, day, month, year, dt_selected, dt_current }" />
			</VDay>
		</div>

		<div v-if="template['months']"
			style="display:flex; flex-wrap: wrap; justify-content: space-around; align-items: center;"
			:style="{
				width: `${((cellSize * 7 + this.cellSize + 7) / 3) * 3}px`,
				height: `${(this.cellSize * 7 + this.cellSize + 7) / 3 * 3}px`	
			}"
		>
			<VMonth v-for="(month, key, i) of months"
				:key="key"
				:cellSize="cellSize"
				:month="month"
				:monthId="+key"
				:selectedDate="selectedDate"
				:currMonth="currMonth"
				:currYear="currYear"
				:initialDate="initialDate"
				@select-month="selectMonth(key)"
			>
				<slot v-bind="{ month, key, i }" />
			</VMonth>
		</div>

	</div>
</template>

<script>
import VDay from './v-day.vue'
import VDayWeek from './v-day-week.vue'
import VMonth from './v-month.vue'
import { generateDays } from '../utility'

export default {
	name: 'VDatePicker',
	components: {
		VDay,
		VDayWeek,
		VMonth
	},
	props: {
		value: null,
		cellSize: {
			type: Number,
			default: 36
		},
		dt_outside_active: {
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
		
		template: {
			days: true,
			months: false,
			years: false
		},
		
		initialDate: {},
		selectedDate: {},
		calendarDays: [],

		amountDays: 42,
		amountMonth: 12,
		amountDayWeeks: 7,
		
		currYear: null,
		currMonth: null,
		currDay: null,
	}),
	computed: {
		getCurrMonth() {
			return this.months[this.currMonth]
		},
		getCurrFirstDayWeekId() {
			const FIRST_DAY = new Date(`${this.currYear}-${this.currMonth}-1`).getDay()
			return FIRST_DAY === 0 ? this.amountDayWeeks : FIRST_DAY
		},
		getCurrLastDayMonth() {
			return new Date(new Date(`${this.currYear}-${this.getNextMonth}-1`) - 1).getDate()
		},
		getPrevMonth() {
			return this.currMonth === 1
				? this.amountMonth
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
			return this.currMonth === this.amountMonth
				? 1
				: this.currMonth + 1
		},
		getNextYear() {
			return this.currMonth === this.amountMonth
				? this.currYear + 1
				: this.currYear
		},
		getCurrTemplate() {
			return Object.entries(this.template)
				.find(curr => {
					const [, value] = curr

					return value
				})[0]
		},

		setStyleCalendarContainer() {
			return {
				width: `${(this.cellSize * 7) + this.cellSize + 7}px`,
				height: `${(this.cellSize * 7) + this.cellSize + 7}px`,
			}
		},
		setStyleTitle() {
			return { fontSize: `${this.cellSize / 2.25}px` }
		},
		setStyleHeaderBtn() {
			return { width: `calc(${(this.cellSize / 2) - 3}px)` }
		},
		setStyleHeaderBtnBox() {
			return { width: `${this.cellSize / 2}px`, height: `${this.cellSize / 1.5}px` }
		},
	},
	methods: {
		switchDate(count, stype) {
			switch (stype) {
				case 'days': {
					this.currMonth += count

					if (this.currMonth > this.amountMonth) {
						this.currMonth = 1
						this.currYear += 1
					} else if (this.currMonth < 1) {
						this.currMonth = this.amountMonth
						this.currYear -= 1
					}

					this.createCalendar()
				}
					
					break;
			
				case 'months': {
					this.currYear += count
				}

					break;
			}

		},
		createCalendar() {
			const { year: i_year, month: i_month, day: i_day } = this.initialDate
			const { year: s_year, month: s_month, day: s_day } = this.selectedDate
			const PREV_DAYS = this.getDays('prev')
			const CURR_DAYS = this.getDays('curr')
			const NEXT_DAYS = this.getDays('next', PREV_DAYS, CURR_DAYS)
			this.calendarDays = [...PREV_DAYS, ...CURR_DAYS, ...NEXT_DAYS]

			this.calendarDays.forEach((c, ci) => {
				if (c.month === s_month && c.year === s_year && c.day === s_day) {
					this.$set(this.calendarDays[ci], 'dt_selected', true)
				}
				
				if (c.month === i_month && c.year === i_year && c.day === i_day) {
					this.$set(this.calendarDays[ci], 'dt_current', true)
				}
			})
		},
		selectDay(i, type, day, month, year) {
			this.currDay = day
			this.currMonth = month
			this.currYear = year
			this.setSelectedDate(year, month, day)

			if (type === 'curr') {
				this.calendarDays.forEach((c, ci) => {
					this.$set(this.calendarDays[ci], 'dt_selected', false)
				})
	
				this.$set(this.calendarDays[i], 'dt_selected', true)
			} else if (this.dt_outside_active) {
				this.createCalendar()
			}

			this.$emit('input', new Date(`${year}-${month}-${day}`))
		},
		selectMonth(month) {
			this.changeTemplate('days')
			this.switchDate(+month - this.currMonth, 'days')
		},
		setSelectedDate(y, m, d) {
			this.$set(this.selectedDate, 'year', y)
			this.$set(this.selectedDate, 'month', m)
			this.$set(this.selectedDate, 'day', d)
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
								this.amountDayWeeks,
								this.getLastDayPrevMonth - (this.amountDayWeeks - 1),
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
						this.amountDays - (prevDays.length + currDays.length),
						1,
						this.getNextMonth,
						this.getNextYear
					)
				}
			}
		},
		changeTemplate(type) {
			for(const curr in this.template) {
				this.template[curr] = false

				if (curr === type) {
					this.template[type] = true
				}
			}
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(dt_value) {
				// Далее добавить условие на массив, если массив то выводим 2 даты, так же в зависимости от мода
				const dt = !dt_value || !(dt_value instanceof Date)
					? new Date()
					: dt_value 

				this.currDay = dt.getDate()
				this.currMonth = dt.getMonth() + 1
				this.currYear = dt.getFullYear()

				if (dt_value && dt_value instanceof Date) {
					this.setSelectedDate(this.currYear, this.currMonth, this.currDay)
				}

				this.initialDate = { year: this.currYear, month: this.currMonth, day: this.currDay, }
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
	.v-date-picker-btn-box {
		display: flex;
		justify-content: center;
		align-items: center;

		&:hover .v-date-picker-btn {
			opacity: .6;
			transform: scale(1.2);
		}
	}
	.v-date-picker-btn {
		cursor: pointer;
		position: relative;
		transition: .2s;
	}
	.v-date-picker-prev,
	.v-date-picker-next {
		width: 100%;
		height: 3px;

		&::before, &::after {
			content: '';
			width: 100%;
			height: 3px;
			border-radius: 3px;
			background: #1f1f33;
			position: absolute;
		}
	}
	.v-date-picker-prev {
		&::before {
			top: 1px;
			left: 0;
			transform-origin: left;
			transform: rotate(-45deg);
		}
		&::after {
			bottom: 1px;
			left: 0;
			transform-origin: left;
			transform: rotate(45deg);
		}
	}
	.v-date-picker-next {
		&::before {
			top: 1px;
			right: 0;
			transform-origin: right;
			transform: rotate(45deg);
		}
		&::after {
			bottom: 1px;
			right: 0;
			transform-origin: right;
			transform: rotate(-45deg);
		}
	}
	.v-date-picker-box-title {
		font-weight: 600;
		color: #1f1f33;
	}
	.v-date-picker-year-title {
		display: inline-block;
		min-width: 50px;
		text-align: center;
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