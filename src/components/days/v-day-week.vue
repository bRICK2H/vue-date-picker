<template>
	<span class="v-day-week"
		:style="setStyleDayWeek"
	>
		{{ dayWeek }}
	</span>
</template>

<script>
export default {
	name: 'VDayWeek',
	props: [
		'size',
		'dayWeek'
	],
	computed: {
		setStyleDayWeek() {
			return {
				fontSize: `${(this.size / 3)}px`,
				flex: `0 0 calc((100% - ${this.size}px) / 7)`,
				height: `calc((100% - ${this.size}px) / 7)`,
			}
		}
	}
}
</script>

<style lang="scss">
	.v-day-week {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		font-weight: 700;
		color: #a2a2b9;
	}
</style>