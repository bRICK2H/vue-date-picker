<template>
	<div class="v-year-container"
		:style="setStyleContainerYear"
	>
	
		<VYearItem v-for="year of years"
			:size="size"
			:option="year"
			:key="year.name"
			:isMarked="isMarked"
			@switch-year="$emit('switch-year', year)"
		>
			<slot v-bind="year" />
		</VYearItem>

	</div>
</template>

<script>
import VYearItem from './v-year-item'

export default {
	name: 'VYears',
	components: { VYearItem },
	props: [
		'size',
		'isMarked',
		'initiated',
		'switchable',
	],
	data: () => ({
		years: [],
		entryYear: null,
		isLoad: false
	}),
	computed: {
		setStyleContainerYear() {
			return {
				width: `${((this.size * 7 + this.size + 7) / 3) * 3}px`,
				height: `${((this.size * 7 + this.size + 7) / 3) * 3}px`	
			}
		}
	},
	methods: {
		createYear() {
			const { year: sw_year } = this.switchable
			const { year: init_year } = this.initiated
			const diff = init_year - sw_year
			const indexRange = Math.ceil(diff / 9)
			const start = sw_year - ((9 * indexRange) - diff)

			return Array(9).fill(null)
				.map((c, i) => {
					const year = start + i

					return {
						year,
						isCurrent: year === init_year,
						isSwitched: year === this.entryYear
					}
				})
		}
	},
	watch: {
		switchable: {
			deep: true,
			immediate: true,
			handler() {
				if (!this.isLoad) {
					const { year } = this.switchable
					
					this.entryYear = year
					this.isLoad = true
				}
				
				this.years = this.createYear()

				const range = this.years.map(({ year }) => year)
				this.$emit('get-years-header', `${range[0]} - ${Math.max(...range)}`)
			}
		},
	},
}
</script>

<style lang="scss">
	.v-year-container {
		display:flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: center;
	}
</style>