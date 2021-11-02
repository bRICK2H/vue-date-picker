<template>
	<div class="v-year-container"
		:style="setStyleContainerYear"
	>
	
		<VYearItem v-for="year of detailYears"
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
		'initiated',
		'switchable',
		'isMarked'
	],
	data: () => ({
		entryYear: null,
		detailYears: []
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
			console.log('sw_year: ', sw_year)

			let y = init_year - sw_year
			let c = Math.ceil(y / 9)
			const start = sw_year - (9 * c - y)

			return Array(9).fill(null)
				.map((c, i) => {
					const year = start + i
					const isCurrent = year === init_year
					const isSwitched = year === this.entryYear

					
					if (year < sw_year) {
						return { type: 'prev', year, isCurrent, isSwitched }
					} else if (year > sw_year) {
						return { type: 'next', year, isCurrent, isSwitched }
					} else {
						return { type: 'curr', year, isCurrent, isSwitched }
					}
				})
		}
		// createYear() {
		// 	// const curr = new Date().getFullYear()
		// 	const { year: sw_year } = this.switchable
		// 	const { year: init_year } = this.initiated
		// 	console.log('sw_year: ', sw_year)

		// 	let x = sw_year < init_year ? 

		// 	return Array(9).fill(null)
		// 		.map((c, i) => {
		// 			console.log(i)
		// 			const year = sw_year + i
		// 			const isCurrent = year === init_year
		// 			const isSwitched = year === this.entryYear
		// 			console.log(year, sw_year)
					
		// 			if (year < sw_year) {
		// 				return { type: 'prev', year, isCurrent, isSwitched }
		// 			} else if (year > sw_year) {
		// 				return { type: 'next', year, isCurrent, isSwitched }
		// 			} else {
		// 				return { type: 'curr', year, isCurrent, isSwitched }
		// 			}
		// 		})
		// }
	},
	watch: {
		switchable: {
			deep: true,
			handler() {
				this.detailYears = this.createYear()
				console.log(this.detailYears)
			}
		},
	},
	created() {
		const { year } = this.switchable

		this.entryYear = year
		this.detailYears = this.createYear()
		console.log(this.detailYears)
	}
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