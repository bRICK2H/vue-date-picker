<template>
	<div class="v-date-picker-container wrapper__v-date-picker-container">

		<!-- HEADER -->
		<div class="v-date-picker-header v-date-picker-container__v-date-picker-header">
			<div :style="setStyleHeaderBtnBox"
				class="v-date-picker-btn-box"
				@click="switchDate('prev', getCurrTemplate)"
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
					{{ switchedDate.year }}
				</span>
			</div>
			<div :style="setStyleHeaderBtnBox"
				class="v-date-picker-btn-box"
				@click="switchDate('next', getCurrTemplate)"
			>
				<span class="v-date-picker-btn v-date-picker-next" :style="setStyleHeaderBtn"></span>
			</div>
		</div>
		
		<!-- DAYS TEMPLATE -->

		<VDays v-if="template['days']"
			:daysWeek="daysWeek"
			:size="cellSize"
			:init="initialDate"
			:selected="selectedDate"
			:switched="switchedDate"
			:is_outside_active="isOutsideActive"
			@select-day="selectDay"
			@get-outside-days="days => outsideDays = days"
		>

		</VDays>

		<!-- MONTH TEMPLATE -->
		<VMonths v-if="template['months']"
			:months="months"
			:size="cellSize"
			:init="initialDate"
			:switch="{ year: currYear, month: currMonth }"
			@switch-month="switchMonth"
		>
			<template v-slot="month">
				<slot v-bind="month"/>
			</template>
		</VMonths>

		<!-- YEARS TEMPLATE -->
		<div v-if="template['years']">
			<VYear
				@select-year="selecteYear"
			/>
		</div>

	</div>
</template>

<script>
// import VDay from './v-day.vue'
// import VDayWeek from './v-day-week.vue'

import VDays from './days/v-days'
import VMonths from './month/v-months'
import VYear from './v-year.vue'
// import { generateDays } from '../utility'

export default {
	name: 'VDatePicker',
	components: {
		// VDay,
		// VDayWeek,
		VDays,
		VMonths,
		VYear
	},
	props: {
		value: null,
		cellSize: {
			type: Number,
			default: 36
		},
		isOutsideActive: {
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
		switchedDate: {},
		outsideDays: {},

		amountMonth: 12,
		
		currYear: null,
		currMonth: null,
	}),
	computed: {
		getCurrMonth() {
			const { month } = this.switchedDate
			return this.months[month]
		},
		getCurrTemplate() {
			return Object.entries(this.template)
				.find(curr => {
					const [, value] = curr

					return value
				})[0]
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
		switchDate(otype, ttype) {
			switch (ttype) {
				case 'days': {
					const { year, month } = this.outsideDays[otype]
					this.setDate('switchedDate', { year, month })

					/**
					 * 1. Вроде все работает - ДНИ, еще раз проверить, посмотреть и улучшить подходы для дней
					 * 2. Проверить месяцы
					 * 3. Реализовать переключение шаблонов
					 * 4. Реализовать годы
					 */
				}
					
					break;
			
				case 'years':
				case 'months': {
					this.switchedDate.year += count
				}

					break;
			}

		},
		selectDay({ year, month, day, type }) {
			this.setDate('selectedDate', { year, month, day })
			this.$emit('input', new Date(`${year}-${month}-${day}`))

			if (type !== 'curr') {
				this.setDate('switchedDate', { year, month })
			}
		},
		switchMonth({ id, year }) {
			this.changeTemplate('days')
			console.log({id, year})
			this.currYear = year
			this.currMonth = id
			// this.switchDate(+id - this.currMonth, 'days')
			// this.switchDate(+month - this.currMonth, 'days')
		},
		selecteYear() {
			console.log('selecteYear')
		},
		openYears() {
			console.log(this.currYear)
			this.changeTemplate('years')
			console.log('openYears')
		},
		setDate(name, date) {
			for(let key in date) {
				if (key !== null) {
					this.$set(this[name], key, date[key])
				}
			}
		},
		changeTemplate(type) {
			for(const curr in this.template) {
				this.template[curr] = curr === type
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

				const day = dt.getDate()
				const month = dt.getMonth() + 1
				const year = dt.getFullYear()

				this.setDate('selectedDate', { year, month, day })
				this.setDate('initialDate', { year, month, day })
				this.setDate('switchedDate', { year, month })
			}
		},
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
	// .v-date-picker-body {
	// 	display: flex;
	// 	flex-wrap: wrap;
	// 	justify-content: space-around;
	// 	align-content: space-around;
	// }
	.v-date-picker-btn-box {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;

		&:hover .v-date-picker-btn {
			opacity: .6;
			transform: scale(1.2);
		}
	}
	.v-date-picker-btn {
		
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