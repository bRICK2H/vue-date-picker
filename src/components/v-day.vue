<template>
	<span class="v-calendar-day"
		:style="SET_STYLE_CELL"
	>

		<slot>
			{{ day }}
		</slot>

	</span>
</template>

<script>
export default {
	name: 'VDay',
	props: {
		day: {
			type: Number,
			required: true
		},
		type: {
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
				height: `calc((100% - ${this.cellSize}px) / 7)`,
				background: this.type !== 'curr' ? '#999' : '#fff',
				fontSize: `${(this.cellSize / 2)}px`,
			}
		}
	}
}
</script>

<style lang="scss">
	.v-calendar-day {
		// border: 1px solid #000;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
</style>