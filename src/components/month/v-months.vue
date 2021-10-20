<template>
	<div class="v-month-container"
		:style="setStyleContainerMonth"
	>
	
		<VMonthItem v-for="month of detailMonths"
			:key="month.name"
			:option="month"
			:size="size"
			@switch-month="$emit('switch-month', month)"
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
		'size',
		'months',
		'initiated',
		'switchable',
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
			const { month: init_month_id, year: init_year } = this.initiated
			const { month: switch_month_id, year: switch_year } = this.switchable

			return Object.entries(this.months)
				.map(([month, name]) => {
					return {
						name: name,
						month: +month,
						year: switch_year,
						isOutside: switch_year !== init_year,
						isCurrent: +month === init_month_id && switch_year === init_year,
						isSwitched: +month === switch_month_id && switch_year === entry_year,
					}
				})
		}
	},
	watch: {
		switchable: {
			deep: true,
			handler() {
				this.detailMonths = this.createMonths()
			}
		}
	},
	created() {
		const { year } = this.switchable

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