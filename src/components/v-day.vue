<template>
	<div class="v-day-container"
		:style="setStyleCell"
		:class="[setClassCell, setClassActiveCell, setClassHoverOutsideCell]"
		@click="selectDay"
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
		isActiveOutside: {
			type: Boolean,
			required: true
		}
	},
	computed: {
		setStyleCell() {
			return {
				flex: `0 1 calc((100% - ${this.cellSize}px) / 7)`,
				height: `calc((100% - ${this.cellSize}px) / 7)`,
				fontSize: `${(this.cellSize / 2.5)}px`,
			}
		},
		setClassCell() {
			return `v-day-container--${this.type}`
		},
		setClassActiveCell() {
			return this.selected
				? `v-day-container--active`
				: null
		},
		setClassHoverOutsideCell() {
			return this.type !== 'curr' && this.isActiveOutside
				? `v-day-container--hover-outside`
				: null
		}
	},
	methods: {
		selectDay() {
			if (this.type === 'curr' || this.isActiveOutside) {
				this.$emit('select-day')
			}
		}
	}
}
</script>

<style lang="scss">
	.v-day-container {
		position: relative;
		border-radius: 50%;
		border: 3px solid transparent;
		transition: .2s;

		&--prev,
		&--next {
			opacity: .2;
		}
		&--curr {
			cursor: pointer;
			background-color: #fff;

			&:hover {
				border: 3px solid rgba(31, 31, 51, .1);
			}
		}
		&--active {
			font-weight: 700;
			color: #fff;
			background-color: #76768c;
		}
		&--hover-outside {
			opacity: .4;
			cursor: pointer;

			&:hover {
				border: 3px solid rgba(31, 31, 51, .3);
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