<template>
	<div class="v-calendar-container">
		<VDatePicker
			v-for="(dt, i) of date"
			:key="`calendar:${i}`"
			:date="dt"
			:cellSize="cellSize"
			:isMarked="isMarked"
			:range="range"
			:isOutsideDays="isOutsideDays"
			@input="selectDate"
			@over-day="overDate"
		/>
	</div>
</template>

<script>
import VDatePicker from './v-date-picker.vue'

export default {
	name: 'VCalendarApp',
	components: {
		VDatePicker
	},
	props: {
		value: null,
		cellSize: {
			type: Number,
			default: 36
		},
		isOutsideDays: {
			type: Boolean,
			default: false
		},
		isMarked: {
			type: Boolean,
			default: true
		}
	},
	data: () => ({
		date: null,
		selectedRange: [],
		hoverRange: [],
		range: {
			selected: [],
			hover: []
		}
	}),
	methods: {
		selectDate(date) {
			if (this.range.selected.length === 2) {
				this.range.selected = []
			}

			this.range.selected.push(date)
			this.range.hover = [...this.range.selected]
		},
		overDate(date) {
			const { selected, hover } = this.range
			if (selected.length > 0 && selected.length !== 2) {
				const { year, month, day } = date
				hover.splice(1, 1, new Date(`${year}-${month}-${day}`))
			}
		}

		/**
		 * 1. Для range выделить начало и конец даты
		 * 2. Вы деление range - поправить стили/вёрстку
		 * 2.2 При первом клике в range и сразу при втором который меньше перного обнулять значения стилей
		 * 3. Сделать дополнительный header с переключение календаря
		 * 4. Иницилизация 2-го календаря, при переключении на текущий месяц не выделяет текущий день
		 */
	},
	watch: {
		value: {
			immediate: true,
			handler(dt_value) {
				const new_date = new Date
				let date = null
				console.log('dt_value', Array.isArray(dt_value))

				if (Array.isArray(dt_value)) {
					const [fdt, sdt] = dt_value
					date = []

					if (dt_value.length > 1) {
						this.isRange = true
						if (fdt instanceof Date) {
							date.push(fdt)
						} else {
							date.push(new_date) 
						}

						if (sdt instanceof Date) {
							sdt.setMonth(sdt.getMonth() + 1)
							date.push(sdt)
						} else {
							date.push(new_date)
						}
						console.warn('array has 2')
					} else {
						if (fdt && fdt instanceof Date) {
							date = dt_value
						} else {
							date = [new_date]
						}
					}
				} else {
					this.isRange = false
					date = !dt_value || !(dt_value instanceof Date)
					? [new Date]
					: [dt_value]
				}

				this.date = date
			}
		},
	}
}
</script>

<style lang="scss">
	.v-calendar-container {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>