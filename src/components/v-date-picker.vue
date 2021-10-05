<template>
	<div class="v-date-picker-wrapper">

		<div class="v-date-picker-container"
			:style="SET_STYLE_CALENDAR_CONTAINER"
		>
			<VDay
				v-for="({ type, day }, i) of calendarDays"
				:key="i"
				:type="type"
				:day="day"
				:cellSize="cellSize"
			>
				<slot name="item"
					v-bind="{ type, day, i }"
				/>
			</VDay>
		</div>

		<div class="buttons">
			<button @click="calculateMonth(-1)">left</button>
			<div>
				<p>prevMonth: {{ months[getPrevMonthId] }} / {{ getLastDayPrevMonth }} </p>
				<p>currMonth: {{ getCurrMonth }} / {{ getLastDayCurrMonth }} / {{ getCurrFirstDayWeekId }} </p>
				<p>curr year: {{ currYear }}</p>
			</div>
			<button @click="calculateMonth(1)">right</button>
		</div>

	</div>
</template>

<script>
import VDay from './v-day.vue'

export default {
	name: 'VDatePicker',
	components: {
		VDay
	},
	props: {
		date: {
			type: Date,
			default: new Date
		},
		cellSize: {
			type: Number,
			default: 36
		}
	},
	data: () => ({
		days: {
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
		currMonth: null,
		currYear: null,
	}),
	computed: {
		getCurrMonth() {
			return this.months[this.currMonth]
		},
		getCurrFirstDayWeekId() {
			const FIRST_DAY = new Date(`${this.currYear}-${this.currMonth}-1`).getDay()
			return FIRST_DAY === 0 ? this.dayWeeks : FIRST_DAY
		},
		getNextMonthId() {
			return this.currMonth + 1 > this.lastMonth ? 1 : this.currMonth + 1
		},
		getPrevMonthId() {
			return this.currMonth - 1 === 0 ? this.lastMonth : this.currMonth - 1
		},
		getLastDayCurrMonth() {
			return new Date(new Date(`${this.currYear}-${this.getNextMonthId}-1`) - 1).getDate()
		},
		getLastDayPrevMonth() {
			return new Date(new Date(`${this.currYear}-${this.currMonth}-1`) - 1).getDate()
		},

		SET_STYLE_CALENDAR_CONTAINER() {
			return {
				width: `${(this.cellSize * 7) + 7 * 7}px`,
				height: `${(this.cellSize * 6) + 6 * 6}px`,
			}
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
			const GENERATE_DAYS = (days, type, counter) => {
				return new Array(days)
					.fill(null)
					.map((c, i) => ({ type, day: i + counter }))
			}
			const PREV_DAYS = PREV_AMOUNT_DAYS > 0
				? GENERATE_DAYS(PREV_AMOUNT_DAYS, 'prev', this.getLastDayPrevMonth - (PREV_AMOUNT_DAYS - 1))
				: []
			const CURR_DAYS = GENERATE_DAYS(this.getLastDayCurrMonth, 'curr', 1)
			const NEXT_DAYS = GENERATE_DAYS(this.totalDays - (PREV_DAYS.length + CURR_DAYS.length), 'next', 1)
			console.log({PREV_DAYS, CURR_DAYS, NEXT_DAYS})

			this.calendarDays = [...PREV_DAYS, ...CURR_DAYS, ...NEXT_DAYS]
		}
	},
	watch: {
		date: {
			immediate: true,
			handler(dt) {
				console.log(dt)
				this.currMonth = dt.getMonth() + 1
				this.currYear = dt.getFullYear()

				this.createCalendar()
			}
		}
	}
}
</script>

<style lang="scss">
	.v-date-picker-wrapper {
		margin: auto;
		user-select: none;
	}
	.v-date-picker-container {
		width: 100%;
		height: 100%;
		border: 1px solid #000;
		display: flex;
		justify-content: space-between;
		align-content: space-between;
		flex-wrap: wrap;
	}
	.buttons {
		display: flex;
		justify-content: space-between;
	}
</style>