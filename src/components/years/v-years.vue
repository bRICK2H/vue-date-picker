<template>
	<div class="v-year-container"
		:style="setStyleContainerYear"
	>
	
		<VYearItem v-for="year of detailYears"
			:size="size"
			:option="year"
			:key="year.name"
			:interactiveStyles="interactiveStyles"
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
		'year',
		'initiated',
		'switchable',
		'interactiveStyles'
	],
	data: () => ({
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
	watch: {
		switchable: {
			deep: true,
			handler() {
				// this.detailYears = this.createYear()
			}
		},
	},
	created() {
		const curr = new Date().getFullYear()
		const prev = curr - 4

		this.detailYears = Array(9).fill(null)
			.map((c, i) => {
				const year = prev + i
				if (year < curr) {
					return { type: 'prev', year }
				} else if (year > curr) {
					return { type: 'next', year }   
				} else {
					return { type: 'curr', year, isCurrent: true }
				}
			})
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