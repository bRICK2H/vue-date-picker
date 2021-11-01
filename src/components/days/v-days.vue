<template>
	<div class="v-days-container"
		:style="setStyleDaysContainer"
	>
		<VDayWeek v-for="(dw, i) of daysWeek"
			:key="`${i}:${dw}`"
			:dayWeek="dw"
			:size="size"
		/>

		<VDay
			v-for="day of days"
			:key="`${day.month}:${day.day}`"
			:size="size"
			:option="day"
			:isMarked="isMarked"
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
		'size',
		'daysWeek',
		'initiated',
		'selectable',
		'switchable',
		'isOutsideDays',
		'isMarked'
	],
	data: () => ({
		days: [],
		amountDays: 42,
		amountMonth: 12,
		amountDayWeeks: 7,
	}),
	computed: {
		getCurrFirstDayWeekId() {
			const { year, month } = this.switchable
			const FIRST_DAY = new Date(`${year}-${month}-1`).getDay()
			return FIRST_DAY === 0 ? this.amountDayWeeks : FIRST_DAY
		},
		getLastDayPrevMonth() {
			const { year, month } = this.switchable
			return new Date(new Date(`${year}-${month}-1`) - 1).getDate()
		},
		getCurrLastDayMonth() {
			const { year } = this.switchable
			return new Date(new Date(`${year}-${this.getNextMonth}-1`) - 1).getDate()
		},
		getNextMonth() {
			const { month } = this.switchable
			return month === this.amountMonth
				? 1
				: month + 1
		},
		getPrevMonth() {
			const { month } = this.switchable
			return month === 1
				? this.amountMonth
				: month - 1
		},
		getPrevYear() {
			const { year, month } = this.switchable
			return month === 1
				? year - 1
				: year
		},
		getNextYear() {
			const { year, month } = this.switchable
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
			const PREV_DAYS = this.getDays('prev')
			const CURR_DAYS = this.getDays('curr')
			const NEXT_DAYS = this.getDays('next', PREV_DAYS, CURR_DAYS)

			this.$emit('get-outside-days', {
				prev: this.isOutsideDays
					? PREV_DAYS[PREV_DAYS.length - 1]
					: {
						month: this.getPrevMonth,
						year: this.getPrevYear,
					},
				next: NEXT_DAYS[0]
			})
			this.days = [...PREV_DAYS, ...CURR_DAYS, ...NEXT_DAYS]

			console.log('v: ', PREV_DAYS[PREV_DAYS.length - 1], PREV_DAYS)
		},
		getDays(type, prevDays = 0, currDays = 0) {
			const extra = {
				initiated: this.initiated,
				selectable: this.selectable,
			}

			switch (type) {
				case 'prev': {
					const PREV_AMOUNT_DAYS = this.getCurrFirstDayWeekId - 1

					console.log(PREV_AMOUNT_DAYS)
	
					// return PREV_AMOUNT_DAYS > 0
					// 	? generateDays({
					// 			type,
					// 			days: PREV_AMOUNT_DAYS,
					// 			counter: this.getLastDayPrevMonth - (PREV_AMOUNT_DAYS - 1),
					// 			month: this.getPrevMonth,
					// 			year: this.getPrevYear,
					// 			isOutsideDays: this.isOutsideDays,
					// 		}, extra)
					// 	: generateDays({
					// 			type,
					// 			days: this.amountDayWeeks,
					// 			counter: this.getLastDayPrevMonth - (this.amountDayWeeks - 1),
					// 			month: this.getPrevMonth,
					// 			year: this.getPrevYear,
					// 			isOutsideDays: this.isOutsideDays,
					// 		}, extra)
					// }
					return PREV_AMOUNT_DAYS > 0
						? generateDays({
								type,
								days: PREV_AMOUNT_DAYS,
								counter: this.getLastDayPrevMonth - (PREV_AMOUNT_DAYS - 1),
								month: this.getPrevMonth,
								year: this.getPrevYear,
								isOutsideDays: this.isOutsideDays,
							}, extra)
						: this.isOutsideDays
							? generateDays({
								type,
								days: this.amountDayWeeks,
								counter: this.getLastDayPrevMonth - (this.amountDayWeeks - 1),
								month: this.getPrevMonth,
								year: this.getPrevYear,
								isOutsideDays: this.isOutsideDays,
							}, extra)
							: []
					}
	
				case 'curr': {
					const { year, month } = this.switchable
					return generateDays({
						type,
						days: this.getCurrLastDayMonth,
						counter: 1,
						month,
						year,
						isOutsideDays: null,
					}, extra)
				}
	
				case 'next': {
					return generateDays({
						type,
						days: this.amountDays - (prevDays.length + currDays.length),
						counter: 1,
						month: this.getNextMonth,
						year: this.getNextYear,
						isOutsideDays: this.isOutsideDays,
					}, extra)
				}
			}
		},
	},
	watch: {
		selectable: {
			deep: true,
			immediate: true,
			handler(value) {
				console.log('selectable', value)
				this.createDays()
			}
		},
		switchable: {
			deep: true,
			handler(value) {
				console.log('switchable', value)
				this.createDays()
			}
		},
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