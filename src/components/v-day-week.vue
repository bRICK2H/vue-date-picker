<template>
	<span class="v-calendar-day-week"
		:style="SET_STYLE_CELL"
	>
		{{ dayWeek }}
	</span>
</template>

<script>
export default {
	name: 'VDayWeek',
	props: {
		dayWeek: {
			type: String,
			required: true
		},
		cellSize: {
			type: Number,
			required: true
		},
	},
	computed: {
		SET_STYLE_CELL() {
			return {
				flex: `0 0 calc((100% - ${this.cellSize}px) / 7)`,
				height: `${this.cellSize}px`,
			}
		}
	}
}
</script>

<style lang="scss">
	.v-calendar-day-week {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
</style>