<template>
	<div class="v-day-container"
		:style="setStyleCell"
		:class="[setClassCell, setClassActiveCell]"
		@click="$emit('select-day')"
	>

		<slot>
			<span class="v-day-item">
				{{ day }}
			</span>
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
		selected: {
			type: Boolean,
			default: null
		},
		cellSize: {
			type: Number,
			required: true
		},
	},
	computed: {
		setStyleCell() {
			return {
				flex: `0 0 calc((100% - ${this.cellSize}px) / 7)`,
				height: `calc((100% - ${this.cellSize}px) / 7)`,
				fontSize: `${(this.cellSize / 2.5)}px`,
			}
		},
		setClassCell() {
			return `v-day-container--${this.type}`
		},
		setClassActiveCell() {
			return this.selected ? `v-day-container--active` : null
		}
	}
}
</script>

<style lang="scss">
	.v-day-container {
		position: relative;
		transition: .2s;

		&--prev,
		&--next {
			opacity: .3;
		}
		&--curr {
			cursor: pointer;
			border-radius: 50%;
			border: 3px solid transparent;
			background-color: #fff;

			&:hover {
				border: 3px solid rgba(31, 31, 51, .1);
			}
		}
		&--active {
			font-weight: 700;
			color: #fff;
			background-color: #76768c;

			&:hover {
				border: 3px solid rgba(31, 31, 51, .4);
			}
		}
	}
	.v-day-container,
	.v-day-item {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.v-day-item {
		width: 100%;
		height: 100%;
	}
</style>