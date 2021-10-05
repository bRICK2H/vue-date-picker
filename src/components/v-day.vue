<template>
	<div class="v-calendar-item"
		:style="SET_STYLE_CELL"
	>

		<slot>
			{{ day }}
		</slot>

	</div>
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
				height: `${this.cellSize}px`,
				background: this.type !== 'curr' ? '#999' : '#fff'
			}
		}
	}
}
</script>

<style lang="scss">
	.v-calendar-item {
		border: 1px solid #000;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
</style>