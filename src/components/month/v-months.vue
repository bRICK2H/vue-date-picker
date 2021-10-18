<template>
	<div class="v-month-container"
		:style="setStyleContainerMonth"
	>
	
		<VMonthItem v-for="month of detailMonths"
			:key="month.name"
			:month="month"
			:size="size"
			@switch-month="$emit('switch-month', {id: month.id, year: month.year })"
		>
			<slot v-bind="month" />
		</VMonthItem>

	</div>
</template>

<script>
import VMonthItem from './v-month-item'

export default {
	name: 'VMonths',
	components: { VMonthItem },
	props: [
		'switch',
		'month',
		'init',
		'size'
	],
	data: () => ({
		entryYear: null,
		detailMonths: []
	}),
	computed: {
		setStyleContainerMonth() {
			return {
				width: `${((this.size * 7 + this.size + 7) / 3) * 3}px`,
				height: `${((this.size * 7 + this.size + 7) / 3) * 3}px`	
			}
		}
	},
	methods: {
		createMonths() {
			const entry_year = this.entryYear
			const { month: init_month_id, year: init_year } = this.init
			const { month: switch_month_id, year: switch_year } = this.switch

			return Object.entries(this.months)
				.map(([id, name]) => {
					return {
						id: +id,
						name: name,
						year: switch_year,
						is_outside: switch_year !== init_year,
						is_current: +id === init_month_id && switch_year === init_year,
						is_switched: +id === switch_month_id && switch_year === entry_year,
					}
				})
		}
	},
	watch: {
		switch() {
			this.detailMonths = this.createMonths()
		}
	},
	created() {
		const { year } = this.switch

		this.entryYear = year
		this.detailMonths = this.createMonths()
	}
}
</script>

<style lang="scss">
	.v-month-container {
		display:flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: center;
	}
</style>