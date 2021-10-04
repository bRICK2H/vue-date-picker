<template>
	<div class="v-date-picker-container">

		<div class="v-date-picker">
			<span v-for="({ type, day }, i) of calendarDays"
				:key="i"
				class="day-item"
				:style="type !== 'curr' ? { background: '#999' } : { background: '#fff' }"
			>
				{{ day }}
			</span>
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
export default {
	name: 'VDatePicker',
	props: {
		date: {
			type: Date,
			default: new Date
		}
	},
	data: () => ({
		days: {
			1: 'Понедельник',
			2: 'Вторник',
			3: 'Среда',
			4: 'Четверг',
			5: 'Пятница',
			6: 'Суббота',
			7: 'Воскресенье'
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
		lastDayWeek: 7,
		currMonth: null,
		currYear: null,
	}),
	computed: {
		getCurrMonth() {
			return this.months[this.currMonth]
		},
		getCurrFirstDayWeekId() {
			const FIRST_DAY = new Date(`${this.currYear}-${this.currMonth}-1`).getDay()
			return FIRST_DAY === 0 ? this.lastDayWeek : FIRST_DAY
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
	.v-date-picker-container {
		// width: 300px;
		// height: calc(300px - (36px + 4px));
		width: calc(36px * 8.3);
		height: calc(36px * 7);
		margin: auto;
		user-select: none;
	}

	.v-date-picker {
		width: 100%;
		height: 100%;
		border: 1px solid #000;
		display: flex;
		justify-content: space-between;
		align-content: space-between;
		flex-wrap: wrap;
	}
	.day-item {
		// max-width: 36px;
		height: 36px;
		flex: 0 0 calc((100% - 36px) / 7);
		border: 1px solid #000;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.buttons {
		display: flex;
		justify-content: space-between;
	}
</style>